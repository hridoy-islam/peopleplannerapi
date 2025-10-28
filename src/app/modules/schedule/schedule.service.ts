import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { Schedule } from "./schedule.model";
import { ScheduleSearchableFields } from "./schedule.constant";
import { TSchedule } from "./schedule.interface";

const getAllScheduleFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Schedule.find(), query)
    .search(ScheduleSearchableFields)
    .filter(query)
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

export const ScheduleServices = {
  getAllScheduleFromDB,
  getSingleScheduleFromDB,
  updateScheduleIntoDB,
  createScheduleIntoDB,
};
