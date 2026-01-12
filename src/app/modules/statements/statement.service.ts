import httpStatus from "http-status";

import { Statement } from "./statement.model";
import { TStatement } from "./statement.interface";
import { StatementSearchableFields } from "./statement.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllStatementFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Statement.find(), query)
    .search(StatementSearchableFields)
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

const getSingleStatementFromDB = async (id: string) => {
  const result = await Statement.findById(id);
  return result;
};

const createStatementIntoDB = async (payload: TStatement) => {
  try {
    const result = await Statement.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createStatementIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Statement"
    );
  }
};

const updateStatementIntoDB = async (
  id: string,
  payload: Partial<TStatement>
) => {
  const statement = await Statement.findById(id);

  if (!statement) {
    throw new AppError(httpStatus.NOT_FOUND, "Statement not found");
  }


  // Update only the selected user
  const result = await Statement.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const deleteStatementIntoDB = async (
  id: string,
) => {
  const statement = await Statement.findById(id);

  if (!statement) {
    throw new AppError(httpStatus.NOT_FOUND, "Statement not found");
  }


  const result = await Statement.findByIdAndDelete(id);

  return result;
};


export const StatementServices = {
  getAllStatementFromDB,
  getSingleStatementFromDB,
  updateStatementIntoDB,
  createStatementIntoDB,
  deleteStatementIntoDB
};
