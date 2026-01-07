import httpStatus from "http-status";

import { ImportantPerson } from "./importantPerson.model";
import { TImportantPerson } from "./importantPerson.interface";
import { ImportantPersonSearchableFields } from "./importantPerson.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllImportantPersonFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ImportantPerson.find(), query)
    .search(ImportantPersonSearchableFields)
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

const getSingleImportantPersonFromDB = async (id: string) => {
  const result = await ImportantPerson.findById(id);
  return result;
};

const createImportantPersonIntoDB = async (payload: TImportantPerson) => {
  try {
    const result = await ImportantPerson.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createImportantPersonIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create ImportantPerson"
    );
  }
};

const updateImportantPersonIntoDB = async (id: string, payload: Partial<TImportantPerson>) => {
  const importantPerson = await ImportantPerson.findById(id);

  if (!importantPerson) {
    throw new AppError(httpStatus.NOT_FOUND, "ImportantPerson not found");
  }

  // Update only the selected user
  const result = await ImportantPerson.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const ImportantPersonServices = {
  getAllImportantPersonFromDB,
  getSingleImportantPersonFromDB,
  updateImportantPersonIntoDB,
  createImportantPersonIntoDB,
};
