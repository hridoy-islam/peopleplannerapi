import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { Schedule } from "./schedule.model";
import { ScheduleSearchableFields } from "./schedule.constant";
import { TSchedule } from "./schedule.interface";
import moment from "moment";
import { ServiceUserSchedule } from "../serviceUserSchedule/serviceUserSchedule.model";

/**
 * OPTIMIZED CONFLICT CHECK
 * 1. Ignores schedules where completeSchedule is true.
 * 2. Uses simplified overlap logic: (NewStart < ExistingEnd) and (NewEnd > ExistingStart).
 */
const checkScheduleConflict = async (
  employeeId: string,
  dateStr: string,
  startTime: string,
  endTime: string,
  excludeScheduleId?: string
): Promise<boolean> => {
  const query: any = {
    employee: employeeId,
    startDate: dateStr,
    completeSchedule: { $ne: true }, // Ignore completed schedules
    $and: [
      { startTime: { $lt: endTime } }, // New Start < Existing End
      { endTime: { $gt: startTime } }, // New End > Existing Start
    ],
  };

  if (excludeScheduleId) {
    query._id = { $ne: excludeScheduleId };
  }

  const conflict = await Schedule.findOne(query).select("_id"); // Select only _id for speed
  return !!conflict;
};

const getAllScheduleFromDB = async (query: Record<string, unknown>) => {
  const modifiedQuery = { ...query };

  // Remove the 'date' field from query if it exists
  if (modifiedQuery.date) delete modifiedQuery.date;

  // --- Date Logic (Same as before) ---
  const isToday =
    query.today === true ||
    query.today === "true" ||
    query.today === "1" ||
    query.today === 1;

  if (isToday) {
    const todayStr = moment().format("YYYY-MM-DD");
    modifiedQuery.startDate = todayStr;
    delete modifiedQuery.today;
  } else if (
    (query.startDate && query.endDate) ||
    (query.fromDate && query.toDate)
  ) {
    const startRaw = (query.startDate || query.fromDate) as string;
    const endRaw = (query.endDate || query.toDate) as string;
    const startStr = moment(startRaw).format("YYYY-MM-DD");
    const endStr = moment(endRaw).format("YYYY-MM-DD");
    modifiedQuery.startDate = { $gte: startStr, $lte: endStr };
    delete modifiedQuery.endDate;
    delete modifiedQuery.fromDate;
    delete modifiedQuery.toDate;
  } else if (query.fromDate && !query.toDate) {
    const targetStr = moment(query.fromDate as string).format("YYYY-MM-DD");
    modifiedQuery.startDate = targetStr;
    modifiedQuery.endDate = targetStr; // Optional logic based on your requirement
    delete modifiedQuery.fromDate;
  } else if (query.dateFilter) {
    const targetStr = moment(query.dateFilter as string).format("YYYY-MM-DD");
    modifiedQuery.startDate = targetStr;
    delete modifiedQuery.dateFilter;
  } else if (query.date) {
    const selectedDate = moment(query.date as string);
    const endStr = selectedDate.format("YYYY-MM-DD");
    const startStr = selectedDate.subtract(6, "days").format("YYYY-MM-DD");
    modifiedQuery.startDate = { $gte: startStr, $lte: endStr };
  }

  // 1. Fetch Data
  const userQuery = new QueryBuilder(
    Schedule.find()
      .populate({ path: "serviceUser", select: "firstName lastName email title" })
      .populate({ path: "serviceFunder", select: "firstName lastName email title" })
      .populate({ path: "employee", select: "firstName lastName email title" })
      .populate({ path: "serviceType", select: "title" })
      .lean(), // Use lean() for faster read performance since we modify result manually
    modifiedQuery
  )
    .search(ScheduleSearchableFields)
    .filter(modifiedQuery)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = (await userQuery.modelQuery) as any[];

  // 2. OPTIMIZED DUPLICATE CHECKING
  if (result.length > 0) {
    // Extract scope to minimize DB scan
    const datesToCheck = [...new Set(result.map((item) => item.startDate))];
    const employeesToCheck = [
      ...new Set(
        result
          .map((item) => item.employee?._id || item.employee)
          .filter((id) => id) // Remove nulls/undefined
      ),
    ];

    if (employeesToCheck.length > 0) {
      // Aggregation to find duplicates ONLY within the fetched scope
      const duplicateAggregation = await Schedule.aggregate([
        {
          $match: {
            startDate: { $in: datesToCheck },
            employee: { $in: employeesToCheck },
            completeSchedule: { $ne: true }, // Ignore completed
          },
        },
        {
          $group: {
            _id: {
              employee: "$employee",
              startDate: "$startDate",
              startTime: "$startTime",
              endTime: "$endTime",
            },
            ids: { $push: "$_id" },
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 }, // Only return actual duplicates
          },
        },
      ]);

      // Create a Set of ALL IDs that are part of a duplicate group
      const duplicateIdSet = new Set<string>();
      duplicateAggregation.forEach((group) => {
        group.ids.forEach((id: any) => duplicateIdSet.add(id.toString()));
      });

      const bulkOps: any[] = [];

      // 3. Sync Logic: Update DB only if status CHANGED
      result.forEach((doc) => {
        const idStr = doc._id.toString();
        const isNowDuplicate = duplicateIdSet.has(idStr);
        const wasDuplicate = doc.isDuplicate; // From DB

        // Update the in-memory object for immediate UI response
        doc.isDuplicate = isNowDuplicate;

        // If status changed, queue a DB update
        if (isNowDuplicate !== wasDuplicate) {
          bulkOps.push({
            updateOne: {
              filter: { _id: doc._id },
              update: { $set: { isDuplicate: isNowDuplicate } },
            },
          });
        }
      });

      // Execute optimized bulk write (Fire and forget to not block response, or await if critical)
      if (bulkOps.length > 0) {
        await Schedule.bulkWrite(bulkOps);
      }
    }
  }

  return { meta, result };
};

const getAllUpcomingScheduleFromDB = async (query: Record<string, unknown>) => {
  const modifiedQuery = { ...query };

  if (query.date) {
    const referenceDate = query.date ? query.date : new Date();
    const startStr = moment(referenceDate).add(1, "days").format("YYYY-MM-DD");
    const endStr = moment(referenceDate).add(8, "days").format("YYYY-MM-DD");

    modifiedQuery.startDate = { $gte: startStr, $lte: endStr };
    delete modifiedQuery.date;
  }

  const userQuery = new QueryBuilder(
    Schedule.find()
      .populate({ path: "serviceUser", select: "firstName lastName email title" })
      .populate({ path: "serviceFunder", select: "firstName lastName email title" })
      .populate({ path: "employee", select: "firstName lastName email title" }),
    modifiedQuery
  )
    .search(ScheduleSearchableFields)
    .filter(modifiedQuery)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return { meta, result };
};

const getSingleScheduleFromDB = async (id: string) => {
  const result = await Schedule.findById(id);
  return result;
};

const createScheduleIntoDB = async (payload: TSchedule) => {
  try {
    // --- 1. CONFLICT CHECK ---
    if (
      payload.employee &&
      payload.startDate &&
      payload.startTime &&
      payload.endTime
    ) {
      const hasConflict = await checkScheduleConflict(
        String(payload.employee),
        payload.startDate,
        payload.startTime,
        payload.endTime
      );
      payload.isDuplicate = hasConflict;
    }

    // --- 2. CREATE SCHEDULE ---
    const result = await Schedule.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createScheduleIntoDB:", error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Schedule"
    );
  }
};

const createBulkScheduleIntoDB = async (payload: any) => {
  const { fromDate, toDate, companyId, serviceUserIds } = payload;

  if (!fromDate || !toDate || !companyId || !serviceUserIds) {
    throw new AppError(httpStatus.BAD_REQUEST, "Missing required fields");
  }

  const startDate = moment(fromDate).startOf("day");
  const endDate = moment(toDate).startOf("day");

  if (endDate.isBefore(startDate)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End date cannot be before start date"
    );
  }

  // 2. Fetch Service User Schedule Templates
  let query: any = {};
  if (
    Array.isArray(serviceUserIds) &&
    serviceUserIds.length > 0 &&
    serviceUserIds[0] !== "all"
  ) {
    query.serviceUserId = { $in: serviceUserIds };
  } else if (serviceUserIds === "all") {
    query = {};
  }

  const templates = await ServiceUserSchedule.find(query);

  if (!templates || templates.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No Service User Schedules found for the selection."
    );
  }

  const schedulesToInsert: any[] = [];
  const currentDate = startDate.clone();

  // 3. Loop through Dates -> Templates -> Visits
  while (currentDate.isSameOrBefore(endDate, "day")) {
    const dayName = currentDate.format("dddd");
    const dateStr = currentDate.format("YYYY-MM-DD");

    for (const template of templates) {
      const dailyConfig = template.schedule.find((s: any) => s.day === dayName);

      if (dailyConfig && dailyConfig.visits && dailyConfig.visits.length > 0) {
        for (const visit of dailyConfig.visits) {
          if (!visit.startTime || !visit.endTime) continue;

          // DateTime Calculations
          const startDateTime = moment(
            `${dateStr} ${visit.startTime}`,
            "YYYY-MM-DD HH:mm"
          );
          const endDateTime = moment(
            `${dateStr} ${visit.endTime}`,
            "YYYY-MM-DD HH:mm"
          );

          let finalEndDateStr = dateStr;

          // Cross-midnight check
          if (endDateTime.isBefore(startDateTime)) {
            endDateTime.add(1, "day");
            finalEndDateStr = endDateTime.format("YYYY-MM-DD");
          }

          const durationHours = moment
            .duration(endDateTime.diff(startDateTime))
            .asHours();

          let isDuplicate = false;

          // Check Conflict if employee assigned
          if (visit.employeeId) {
            // Re-use optimized function
            const hasConflict = await checkScheduleConflict(
              visit.employeeId.toString(),
              dateStr,
              visit.startTime,
              visit.endTime
            );
            if (hasConflict) isDuplicate = true;
          }

          const newSchedule = {
            startDate: dateStr,
            endDate: finalEndDateStr,
            startTime: visit.startTime,
            endTime: visit.endTime,
            serviceUser: template.serviceUserId,
            employee: visit.employeeId || null,
            shiftId: visit.shiftId || null,
            employeeRateId: visit.employmentRateId || null,
            payRate: visit.payRate || 0,
            invoiceRate: visit.invoiceRate || 0,
            companyId,
            duration: durationHours.toFixed(2),
            completeSchedule: false,
            isDuplicate: isDuplicate,
            status: visit.employeeId ? "Scheduled" : "Unallocated",
            expenses: [],
            tags: [],
            notes: [],
            breaks: [],
            purchaseOrder: false,
          };

          schedulesToInsert.push(newSchedule);
        }
      }
    }
    currentDate.add(1, "day");
  }

  // 4. Bulk Insert
  if (schedulesToInsert.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No schedules generated for the selected date range and users."
    );
  }

  const result = await Schedule.insertMany(schedulesToInsert);

  return {
    success: true,
    count: result.length,
    schedules: result,
    message: `Successfully generated ${result.length} schedule(s)`,
  };
};

const updateScheduleIntoDB = async (
  id: string,
  payload: Partial<TSchedule>
) => {
  const existingSchedule = await Schedule.findById(id);

  if (!existingSchedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found");
  }

  const effectiveEmployee =
    payload.employee !== undefined ? payload.employee : existingSchedule.employee;
  const effectiveDate = payload.startDate || existingSchedule.startDate;
  const effectiveStartTime = payload.startTime || existingSchedule.startTime;
  const effectiveEndTime = payload.endTime || existingSchedule.endTime;

  // --- Check Conflict ---
  if (effectiveEmployee && effectiveDate) {
    const hasConflict = await checkScheduleConflict(
      String(effectiveEmployee),
      String(effectiveDate),
      String(effectiveStartTime),
      String(effectiveEndTime),
      id // Exclude self
    );

    payload.isDuplicate = hasConflict;
  }

  const result = await Schedule.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteScheduleIntoDB = async (id: string) => {
  const schedule = await Schedule.findById(id);
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found");
  }
  const result = await Schedule.findByIdAndDelete(id);
  return result;
};

export const ScheduleServices = {
  getAllScheduleFromDB,
  getSingleScheduleFromDB,
  updateScheduleIntoDB,
  createScheduleIntoDB,
  deleteScheduleIntoDB,
  getAllUpcomingScheduleFromDB,
  createBulkScheduleIntoDB,
};