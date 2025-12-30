import httpStatus from "http-status";

import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { TReport } from "./report.interface";
import { ReportSearchableFields } from "./report.constant";
import {Report} from "./report.model"

const getAllReportFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Report.find(), query)
    .search(ReportSearchableFields)
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

const getSingleReportFromDB = async (id: string) => {
  const result = await Report.findById(id);
  return result;
};

const createReportIntoDB = async (payload: TReport) => {
  try {
    const result = await Report.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createReportIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Report"
    );
  }
};

const updateReportIntoDB = async (id: string, payload: Partial<TReport>) => {
  const notice = await Report.findById(id);

  if (!notice) {
    throw new AppError(httpStatus.NOT_FOUND, "Report not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await Report.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteReportFromDB = async (id: string) => {
  const report = await Report.findById(id);

  if (!report) {
    throw new AppError(httpStatus.NOT_FOUND, "Report not found");
  }

  await Report.findByIdAndDelete(id);

  return { message: "Report deleted successfully" };
};

export const ReportServices = {
  getAllReportFromDB,
  getSingleReportFromDB,
  updateReportIntoDB,
  createReportIntoDB,
  deleteReportFromDB,
};
