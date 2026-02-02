import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import moment from "moment";
import { Payslip } from "./payslip.model";
import { TPayslip } from "./payslip.interface";
import { Schedule } from "../schedule/schedule.model";
import { Types } from "mongoose";
import { User } from "../user/user.model";

// --- Helper Functions ---

const timeToMinutes = (timeStr: string) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// --- Core Calculation Logic ---

const calculatePayslipData = async (
  userId: string,
  companyId: string,
  fromDate: Date,
  toDate: Date
) => {
  const fromDateStr = moment(fromDate).format("YYYY-MM-DD");
  const toDateStr = moment(toDate).format("YYYY-MM-DD");

  const scheduleRecords = await Schedule.find({
    employee: userId,
    companyId: companyId,
    startDate: { $gte: fromDateStr, $lte: toDateStr },
    completeSchedule: true,
  }).lean();

  if (!scheduleRecords || scheduleRecords.length === 0) {
    return null;
  }

  let totalAmount = 0;
  let totalHour = 0;
  const attendanceList = [];

  for (const record of scheduleRecords) {
    let hoursWorked = 0;

    if (record.startTime && record.endTime) {
      const startMins = timeToMinutes(record.startTime);
      let endMins = timeToMinutes(record.endTime);

      if (endMins < startMins) {
        endMins += 24 * 60;
      }

      const diffMinutes = endMins - startMins;
      hoursWorked = diffMinutes / 60;
    } else if (record.duration) {
      hoursWorked = parseFloat(record.duration) || 0;
    }

    const payRate = record.payRate || 0;
    const invoiceRate = record.invoiceRate || 0;

    const dailyTotal = hoursWorked * Number(payRate);

    totalHour += hoursWorked;
    totalAmount += dailyTotal;

    attendanceList.push({
      employementRateId: record.employeeRateId,
      shiftId: record.employeeShiftId,
      scheduleId: record._id,
      startDate: record.startDate,
      startTime: record.startTime,
      endDate: record.endDate,
      endTime: record.endTime,
      payRate: payRate,
      invoiceRate: invoiceRate,
    });
  }

  return {
    totalHour: Math.round(totalHour * 60),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    attendanceList,
  };
};

// --- Service Methods ---

const getPayslipFromDB = async (query: Record<string, unknown>) => {
  const { month, year, page = 1, limit = 10, search, ...otherQueryParams } = query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  if (otherQueryParams.companyId) {
    otherQueryParams.companyId = new Types.ObjectId(otherQueryParams.companyId as string);
  }

  if (otherQueryParams.userId) {
    otherQueryParams.userId = new Types.ObjectId(otherQueryParams.userId as string);
  }

  const matchStage: any = { ...otherQueryParams };

  if (month && year) {
    const startOfMonth = moment(`${year}-${month}-01`).startOf("month").toDate();
    const endOfMonth = moment(`${year}-${month}-01`).endOf("month").toDate();
    matchStage.$or = [
      { fromDate: { $gte: startOfMonth, $lte: endOfMonth } },
      { toDate: { $gte: startOfMonth, $lte: endOfMonth } },
      { fromDate: { $lte: startOfMonth }, toDate: { $gte: endOfMonth } },
    ];
  }

  const searchRegex = search ? new RegExp(search as string, "i") : null;

  const aggregationPipeline: any[] = [
    { $match: matchStage },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "departments",
        localField: "user.departmentId",
        foreignField: "_id",
        as: "user.departmentId",
      },
    },
    {
      $unwind: {
        path: "$user.departmentId",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "designations",
        localField: "user.designationId",
        foreignField: "_id",
        as: "user.designationId",
      },
    },
    {
      $unwind: {
        path: "$user.designationId",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  if (searchRegex) {
    aggregationPipeline.push({
      $match: {
        $or: [
          { "user.firstName": searchRegex },
          { "user.lastName": searchRegex },
          { "user.employeeId": searchRegex },
          { "user.email": searchRegex },
        ],
      },
    });
  }

  const totalResult = await Payslip.aggregate([
    ...aggregationPipeline,
    { $count: "total" },
  ]);
  const total = totalResult[0]?.total || 0;

  aggregationPipeline.push(
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limitNumber },
    {
      $project: {
        fromDate: 1,
        toDate: 1,
        status: 1,
        totalHour: 1,
        totalAmount: 1,
        attendanceList: 1,
        createdAt: 1,
        userId: {
          _id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          email: "$user.email",
          phone: "$user.phone",
          employeeId: "$user.employeeId",
          designationId: { title: "$user.designationId.title" },
          departmentId: {
            departmentName: "$user.departmentId.departmentName",
          },
        },
      },
    }
  );

  const result = await Payslip.aggregate(aggregationPipeline);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
    },
    result,
  };
};

const getSinglePayslipFromDB = async (id: string) => {
  const result = await Payslip.findById(id)
    .populate("userId")
    .populate([
      {
        path: "attendanceList.scheduleId",
        select: "serviceUser startTime endTime",
        populate: {
          path: "serviceUser",
          select: "firstName lastName",
        },
      },
      {
        path: "attendanceList.employementRateId",
        populate: {
          path: "shiftId",
          select: "name startTime endTime"
        }
      },
    ]);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Payslip not found");
  }

  return result;
};

const createPayslipIntoDB = async (payload: {
  userIds: string[];
  companyId: string;
  fromDate: string | Date;
  toDate: string | Date;
  note?: string;
}) => {
  const createdPayslips = [];
  const errors = [];

  if (
    !payload.userIds ||
    !Array.isArray(payload.userIds) ||
    payload.userIds.length === 0
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "userIds array is required");
  }

  let targetUserIds: string[] = [];

  // --- 1. Handle "All" Option ---
  if (payload.userIds.includes("all")) {
    // UPDATED: Filter by role 'staff'
    const allEmployees = await User.find({ 
      companyId: payload.companyId,
      role: "staff" 
    }).select("_id");
    
    targetUserIds = allEmployees.map((u) => u._id.toString());
  } else {
    targetUserIds = payload.userIds;
  }

  for (const userId of targetUserIds) {
    try {
      const existingPayslip = await Payslip.findOne({
        userId: userId,
        companyId: payload.companyId,
        $or: [
          { fromDate: { $gte: payload.fromDate, $lte: payload.toDate } },
          { toDate: { $gte: payload.fromDate, $lte: payload.toDate } },
        ],
      });

      if (existingPayslip) {
        continue; 
      }

      const calculations = await calculatePayslipData(
        userId,
        payload.companyId,
        new Date(payload.fromDate),
        new Date(payload.toDate)
      );

      if (!calculations) {
        continue;
      }

      const result = await Payslip.create({
        userId,
        companyId: payload.companyId,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        note: payload.note,
        status: "pending",
        ...calculations,
      });

      createdPayslips.push(result);
    } catch (error: any) {
      errors.push({
        userId,
        message: error.message || "Failed to calculate Payslip",
      });
    }
  }

  if (createdPayslips.length === 0 && errors.length > 0 && !payload.userIds.includes("all")) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Failed to create Payslips. Details: ${errors
        .map((e) => e.message)
        .join(", ")}`
    );
  }

  return {
    successCount: createdPayslips.length,
    errorCount: errors.length,
    createdPayslips,
    errors,
  };
};

const regeneratePayslipById = async (id: string) => {
  const existingPayslip = await Payslip.findById(id);

  if (!existingPayslip) {
    throw new AppError(httpStatus.NOT_FOUND, "Payslip record not found");
  }

  const calculations = await calculatePayslipData(
    existingPayslip.userId.toString(),
    existingPayslip.companyId.toString(),
    existingPayslip.fromDate,
    existingPayslip.toDate
  );

  const updateData = calculations || {
      totalHour: 0,
      totalAmount: 0,
      attendanceList: []
  };

  const updatedPayslip = await Payslip.findByIdAndUpdate(
    id,
    {
      totalHour: updateData.totalHour,
      totalAmount: updateData.totalAmount,
      attendanceList: updateData.attendanceList,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedPayslip;
};

const updatePayslipIntoDB = async (id: string, payload: Partial<TPayslip>) => {
  const payslip = await Payslip.findById(id);
  if (!payslip) {
    throw new AppError(httpStatus.NOT_FOUND, "Payslip not found");
  }
  const result = await Payslip.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const PayslipServices = {
  getPayslipFromDB,
  getSinglePayslipFromDB,
  createPayslipIntoDB,
  updatePayslipIntoDB,
  regeneratePayslipById,
};