import httpStatus from "http-status";

import { Need } from "./needs.model";
import { TNeed } from "./needs.interface";
import { NeedSearchableFields } from "./needs.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllNeedFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Need.find(), query)
    .search(NeedSearchableFields)
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

const getSingleNeedFromDB = async (id: string) => {
  const result = await Need.findById(id);
  return result;
};

const createNeedIntoDB = async (payload: TNeed) => {
  try {
    const result = await Need.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createNeedIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Need"
    );
  }
};

const updateNeedIntoDB = async (
  id: string,
  payload: Partial<TNeed>
) => {
  const need = await Need.findById(id);

  if (!need) {
    throw new AppError(httpStatus.NOT_FOUND, "Need not found");
  }


  // Update only the selected user
  const result = await Need.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const deleteNeedIntoDB = async (
  id: string
) => {
  const need = await Need.findById(id);

  if (!need) {
    throw new AppError(httpStatus.NOT_FOUND, "Need not found");
  }


  const result = await Need.findByIdAndDelete(id);

  return result;
};


export const NeedServices = {
  getAllNeedFromDB,
  getSingleNeedFromDB,
  updateNeedIntoDB,
  createNeedIntoDB,
  deleteNeedIntoDB
};
