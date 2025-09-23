import httpStatus from "http-status";

import { Funder } from "./funder.model";
import { TFunder } from "./funder.interface";
import { FunderSearchableFields } from "./funder.constant";
import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";

const getAllFunderFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Funder.find(), query)
    .search(FunderSearchableFields)
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

const getSingleFunderFromDB = async (id: string) => {
  const result = await Funder.findById(id);
  return result;
};


const createFunderIntoDB = async (payload: TFunder) => {
    try {
      
      const result = await Funder.create(payload);
      return result;
    } catch (error: any) {
      console.error("Error in createFunderIntoDB:", error);
  
      // Throw the original error or wrap it with additional context
      if (error instanceof AppError) {
        throw error;
      }
  
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to create Funder");
    }
  };


const updateFunderIntoDB = async (id: string, payload: Partial<TFunder>) => {
  const funder = await Funder.findById(id);

  if (!funder) {
    throw new AppError(httpStatus.NOT_FOUND, "Funder not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await Funder.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};




export const FunderServices = {
    getAllFunderFromDB,
    getSingleFunderFromDB,
    updateFunderIntoDB,
    createFunderIntoDB
  
};



  