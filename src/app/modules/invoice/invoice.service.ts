import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import moment from "moment";
import { Invoice } from "./invoice.model";
import { TInvoice } from "./invoice.interface";
import { Schedule } from "../schedule/schedule.model";
import { Types } from "mongoose";
import { User } from "../user/user.model"; // Ensure User model is imported

// --- Helper Functions ---

const timeToMinutes = (timeStr: string) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

// --- Core Calculation Logic ---

const calculateInvoiceData = async (
  serviceUserId: string,
  companyId: string,
  fromDate: Date,
  toDate: Date
) => {
  const fromDateStr = moment(fromDate).format("YYYY-MM-DD");
  const toDateStr = moment(toDate).format("YYYY-MM-DD");

  // Query Schedule for the Service User (Client)
  const scheduleRecords = await Schedule.find({
    serviceUser: serviceUserId, // Changed from 'employee' to 'serviceUser' for Invoices
    companyId: companyId,
    startDate: { $gte: fromDateStr, $lte: toDateStr },
    completeSchedule: true, // Only bill for completed schedules
  }).lean();

  // CHANGE: Return null instead of throwing error if no records found
  if (!scheduleRecords || scheduleRecords.length === 0) {
    return null;
  }

  let totalAmount = 0;
  let totalHour = 0;
  const attendanceList = [];

  for (const record of scheduleRecords) {
    // --- Time Logic: Calculate Duration ---
    let hoursWorked = 0;

    if (record.startTime && record.endTime) {
      const startMins = timeToMinutes(record.startTime);
      let endMins = timeToMinutes(record.endTime);

      // Handle overnight shifts
      if (endMins < startMins) {
        endMins += 24 * 60;
      }

      const diffMinutes = endMins - startMins;
      hoursWorked = diffMinutes / 60;
    } else if (record.duration) {
      hoursWorked = parseFloat(record.duration) || 0;
    }

    
    const rate = record.invoiceRate || 0; 
    
    const dailyTotal = hoursWorked * Number(rate);

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
      payRate: record.payRate || 0,
      invoiceRate: rate,
    });
  }

  return {
    totalHour: Math.round(totalHour * 60), // Store as minutes
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    attendanceList,
  };
};

// --- Service Methods ---

const getInvoiceFromDB = async (query: Record<string, unknown>) => {
  const { month, year, page = 1, limit = 10, search, ...otherQueryParams } = query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  if (otherQueryParams.companyId) {
    otherQueryParams.companyId = new Types.ObjectId(otherQueryParams.companyId as string);
  }

  // Changed userId to serviceUserId to match Schema
  if (otherQueryParams.serviceUserId) {
    otherQueryParams.serviceUserId = new Types.ObjectId(otherQueryParams.serviceUserId as string);
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
        localField: "serviceUserId", // Updated to match Schema
        foreignField: "_id",
        as: "serviceUser",
      },
    },
    { $unwind: "$serviceUser" },
    // Removed Department/Designation lookups as Service Users (Clients) might not have them, 
    // or you can keep them if your Service Users have these fields. 
    // Keeping basic user info mostly.
  ];

  if (searchRegex) {
    aggregationPipeline.push({
      $match: {
        $or: [
          { "serviceUser.firstName": searchRegex },
          { "serviceUser.lastName": searchRegex },
          { "serviceUser.email": searchRegex },
        ],
      },
    });
  }

  // Count Total
  const totalResult = await Invoice.aggregate([
    ...aggregationPipeline,
    { $count: "total" },
  ]);
  const total = totalResult[0]?.total || 0;

  // Fetch Data
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
        serviceUserId: { // Returned as nested object
          _id: "$serviceUser._id",
          firstName: "$serviceUser.firstName",
          lastName: "$serviceUser.lastName",
          email: "$serviceUser.email",
          phone: "$serviceUser.phone",
          address: "$serviceUser.address",
        },
      },
    }
  );

  const result = await Invoice.aggregate(aggregationPipeline);

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

const getSingleInvoiceFromDB = async (id: string) => {
  const result = await Invoice.findById(id)
    .populate("serviceUserId") // Updated to match Schema
    .populate([
      {
        path: "attendanceList.scheduleId",
        select: "serviceUser startTime endTime",
        populate: {
          path: "serviceUser employee",
          select: "firstName lastName",
        },
      },
      
    ]);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Invoice not found");
  }

  return result;
};

const createInvoiceIntoDB = async (payload: {
  serviceUserIds: string[]; // Changed from userIds to serviceUserIds
  companyId: string;
  fromDate: string | Date;
  toDate: string | Date;
  note?: string;
}) => {
  const createdInvoices = [];
  const skippedCount = 0;

  if (
    !payload.serviceUserIds ||
    !Array.isArray(payload.serviceUserIds) ||
    payload.serviceUserIds.length === 0
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "serviceUserIds array is required");
  }

  let targetIds: string[] = [];

  // --- 1. Handle "All" Option ---
  if (payload.serviceUserIds.includes("all")) {
    // Fetch all Service Users for this company
    // Assuming 'serviceUser' is the role key. Adjust query if role is named differently.
    const allServiceUsers = await User.find({ 
      companyId: payload.companyId, 
      role: "serviceUser" // Filter strictly by role
    }).select("_id");
    
    targetIds = allServiceUsers.map((u) => u._id.toString());
  } else {
    targetIds = payload.serviceUserIds;
  }

  for (const sUserId of targetIds) {
    try {
      // --- 2. Check Existing (Skip if exists) ---
      const existingInvoice = await Invoice.findOne({
        serviceUserId: sUserId,
        companyId: payload.companyId,
        $or: [
          { fromDate: { $gte: payload.fromDate, $lte: payload.toDate } },
          { toDate: { $gte: payload.fromDate, $lte: payload.toDate } },
        ],
      });

      if (existingInvoice) {
        // Skip silently
        continue; 
      }

      // --- 3. Perform Calculations ---
      const calculations = await calculateInvoiceData(
        sUserId,
        payload.companyId,
        new Date(payload.fromDate),
        new Date(payload.toDate)
      );

      // --- 4. Check Data (Skip if no attendance) ---
      if (!calculations) {
        // Skip silently if no completed schedules found
        continue;
      }

      // --- 5. Create Invoice Record ---
      const result = await Invoice.create({
        serviceUserId: sUserId,
        companyId: payload.companyId,
        fromDate: payload.fromDate,
        toDate: payload.toDate,
        note: payload.note,
        status: "pending",
        ...calculations,
      });

      createdInvoices.push(result);
    } catch (error: any) {
      // Optional: Log error but continue processing other users
      console.error(`Error creating invoice for ${sUserId}:`, error);
    }
  }

  // If we processed everything but created nothing (either all existed or no data)
  // We generally just return success with count 0, or you can throw if strictly required.
  // Returning object allows frontend to know what happened.
  
  return {
    successCount: createdInvoices.length,
    createdInvoices,
  };
};

const regenerateInvoiceById = async (id: string) => {
  const existingInvoice = await Invoice.findById(id);

  if (!existingInvoice) {
    throw new AppError(httpStatus.NOT_FOUND, "Invoice record not found");
  }

  // Recalculate
  const calculations = await calculateInvoiceData(
    existingInvoice.serviceUserId.toString(),
    existingInvoice.companyId.toString(),
    existingInvoice.fromDate,
    existingInvoice.toDate
  );

  // If regeneration results in no data, you might want to set amounts to 0 or handle explicitly
  const updateData = calculations || {
    totalHour: 0,
    totalAmount: 0,
    attendanceList: []
  };

  const updatedInvoice = await Invoice.findByIdAndUpdate(
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

  return updatedInvoice;
};

const updateInvoiceIntoDB = async (id: string, payload: Partial<TInvoice>) => {
  const invoice = await Invoice.findById(id);
  if (!invoice) {
    throw new AppError(httpStatus.NOT_FOUND, "Invoice not found");
  }
  const result = await Invoice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const InvoiceServices = {
  getInvoiceFromDB,
  getSingleInvoiceFromDB,
  createInvoiceIntoDB,
  updateInvoiceIntoDB,
  regenerateInvoiceById,
};