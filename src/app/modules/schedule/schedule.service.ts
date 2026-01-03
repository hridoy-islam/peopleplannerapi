import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { Schedule } from "./schedule.model";
import { ScheduleSearchableFields } from "./schedule.constant";
import { TSchedule } from "./schedule.interface";

import moment from 'moment';

const getAllScheduleFromDB = async (query: Record<string, unknown>) => {
  const modifiedQuery = { ...query };

  // Case 1: Explicit date range (highest priority)
  if (query.startDate && query.endDate) {
    const startDate = moment(query.startDate as string)
      .startOf('day')
      .toDate();

    const endDate = moment(query.endDate as string)
      .endOf('day')
      .toDate();

    modifiedQuery.date = {
      $gte: startDate,
      $lte: endDate,
    };

    delete modifiedQuery.startDate;
    delete modifiedQuery.endDate;
  }

  // Case 2: Single selected date → previous 6 days
  else if (query.date) {
    const selectedDate = moment(query.date as string);

    const startDate = selectedDate
      .clone()
      .subtract(6, 'days')
      .startOf('day')
      .toDate();

    const endDate = selectedDate
      .clone()
      .endOf('day')
      .toDate();

    modifiedQuery.date = {
      $gte: startDate,
      $lte: endDate,
    };

    delete modifiedQuery.date;
  }

  const userQuery = new QueryBuilder(
    Schedule.find()
      .populate({
        path: 'serviceUser',
        select: 'firstName lastName email title',
      })
      .populate({
        path: 'serviceFunder',
        select: 'firstName lastName email title',
      })
      .populate({
        path: 'employee',
        select: 'firstName lastName email title',
      }),
    modifiedQuery
  )
    .search(ScheduleSearchableFields)
    .filter(modifiedQuery)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};


const getAllUpcomingScheduleFromDB = async (query: Record<string, unknown>) => {
  // 1. Create a copy of the query
  const modifiedQuery = { ...query };

  if (query.date) {
    const referenceDate = query.date ? query.date : new Date();

    // Logic: If input is 2026-01-02, startDate becomes 2026-01-03 00:00:00
    // This successfully excludes "today" and "previous" dates.
    const startDate = moment(referenceDate)
      .add(1, 'days')
      .startOf('day')
      .toDate();

    const endDate = moment(startDate)
      .add(7, 'days')
      .endOf('day')
      .toDate();

    // 2. Overwrite the date field with the range filter
    modifiedQuery.date = {
      $gte: startDate,
      $lte: endDate,
    };
    

  }

  const userQuery = new QueryBuilder(
    Schedule.find()
      .populate({
        path: 'serviceUser',
        select: 'firstName lastName email title',
      })
      .populate({
        path: 'serviceFunder',
        select: 'firstName lastName email title',
      })
      .populate({
        path: 'employee',
        select: 'firstName lastName email title',
      }),
    modifiedQuery
  )
    .search(ScheduleSearchableFields)
    .filter(modifiedQuery)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleScheduleFromDB = async (id: string) => {
  const result = await Schedule.findById(id);
  return result;
};

const createScheduleIntoDB = async (payload: TSchedule) => {
  try {
    const result = await Schedule.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createScheduleIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Schedule"
    );
  }
};

const updateScheduleIntoDB = async (
  id: string,
  payload: Partial<TSchedule>
) => {
  const schedule = await Schedule.findById(id);

  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await Schedule.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteScheduleIntoDB = async (
  id: string,
) => {
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
  getAllUpcomingScheduleFromDB
};
