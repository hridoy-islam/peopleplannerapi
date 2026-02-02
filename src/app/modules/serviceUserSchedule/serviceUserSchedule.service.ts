import httpStatus from "http-status";

import { ServiceUserSchedule } from "./serviceUserSchedule.model";
import { TServiceUserSchedule } from "./serviceUserSchedule.interface";
import { ServiceUserScheduleSearchableFields } from "./serviceUserSchedule.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllServiceUserScheduleFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ServiceUserSchedule.find(), query)
    .search(ServiceUserScheduleSearchableFields)
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

const getSingleServiceUserScheduleFromDB = async (id: string) => {
  const result = await ServiceUserSchedule.findById(id);
  return result;
};

const createServiceUserScheduleIntoDB = async (payload: TServiceUserSchedule) => {
  try {
    const result = await ServiceUserSchedule.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createServiceUserScheduleIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create ServiceUserSchedule"
    );
  }
};

const updateServiceUserScheduleIntoDB = async (
  id: string,
  payload: Partial<TServiceUserSchedule>
) => {
  const serviceUserSchedule = await ServiceUserSchedule.findById(id);

  if (!serviceUserSchedule) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceUserSchedule not found");
  }


  // Update only the selected user
  const result = await ServiceUserSchedule.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const deleteServiceUserScheduleIntoDB = async (
  id: string
) => {
  const serviceUserSchedule = await ServiceUserSchedule.findById(id);

  if (!serviceUserSchedule) {
    throw new AppError(httpStatus.NOT_FOUND, "ServiceUserSchedule not found");
  }


  const result = await ServiceUserSchedule.findByIdAndDelete(id);

  return result;
};


export const ServiceUserScheduleServices = {
  getAllServiceUserScheduleFromDB,
  getSingleServiceUserScheduleFromDB,
  updateServiceUserScheduleIntoDB,
  createServiceUserScheduleIntoDB,
  deleteServiceUserScheduleIntoDB
};
