import httpStatus from "http-status";

import { AboutMeLog } from "./aboutMeLog.model";
import { TAboutMeLog } from "./aboutMeLog.interface";
import { AboutMeLogSearchableFields } from "./aboutMeLog.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllAboutMeLogFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(AboutMeLog.find(), query)
    .search(AboutMeLogSearchableFields)
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

const getSingleAboutMeLogFromDB = async (id: string) => {
  const result = await AboutMeLog.findById(id);
  return result;
};

const createAboutMeLogIntoDB = async (payload: TAboutMeLog) => {
  try {
    const result = await AboutMeLog.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createAboutMeLogIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create AboutMeLog"
    );
  }
};

const updateAboutMeLogIntoDB = async (id: string, payload: Partial<TAboutMeLog>) => {
  const aboutMeLog = await AboutMeLog.findById(id);

  if (!aboutMeLog) {
    throw new AppError(httpStatus.NOT_FOUND, "AboutMeLog not found");
  }

  // Update only the selected user
  const result = await AboutMeLog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const AboutMeLogServices = {
  getAllAboutMeLogFromDB,
  getSingleAboutMeLogFromDB,
  updateAboutMeLogIntoDB,
  createAboutMeLogIntoDB,
};
