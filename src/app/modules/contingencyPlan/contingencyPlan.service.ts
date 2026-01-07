import httpStatus from "http-status";

import { ContingencyPlan } from "./contingencyPlan.model";
import { TContingencyPlan } from "./contingencyPlan.interface";
import { ContingencyPlanSearchableFields } from "./contingencyPlan.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllContingencyPlanFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ContingencyPlan.find(), query)
    .search(ContingencyPlanSearchableFields)
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

const getSingleContingencyPlanFromDB = async (id: string) => {
  const result = await ContingencyPlan.findById(id);
  return result;
};

const createContingencyPlanIntoDB = async (payload: TContingencyPlan) => {
  try {
    const result = await ContingencyPlan.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createContingencyPlanIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create ContingencyPlan"
    );
  }
};

const updateContingencyPlanIntoDB = async (
  id: string,
  payload: Partial<TContingencyPlan>
) => {
  const contingencyPlan = await ContingencyPlan.findById(id);

  if (!contingencyPlan) {
    throw new AppError(httpStatus.NOT_FOUND, "ContingencyPlan not found");
  }

  // Update only the selected user
  const result = await ContingencyPlan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const ContingencyPlanServices = {
  getAllContingencyPlanFromDB,
  getSingleContingencyPlanFromDB,
  updateContingencyPlanIntoDB,
  createContingencyPlanIntoDB,
};
