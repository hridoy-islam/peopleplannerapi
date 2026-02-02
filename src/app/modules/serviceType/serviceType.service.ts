import httpStatus from "http-status";

import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { ServiceTypeSearchableFields } from "./serviceType.constant";
import { ServiceType } from "./serviceType.model";
import { TServiceType } from "./serviceType.interface";

const getServiceTypeFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ServiceType.find(), query)
    .search(ServiceTypeSearchableFields)
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

// const getSingleNoticeFromDB = async (id: string) => {
//   const result = await ServiceType.findById(id);
//   return result;
// };

const createServiceTypeIntoDB = async (payload: TServiceType) => {
  try {
    const result = await ServiceType.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createNoticeIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Notice"
    );
  }
};

const updateServiceTypeIntoDB = async (
  id: string,
  payload: Partial<TServiceType>
) => {
  const serviceType = await ServiceType.findById(id);

  if (!serviceType) {
    throw new AppError(httpStatus.NOT_FOUND, "Notice not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await ServiceType.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const ServiceTypeServices = {
  createServiceTypeIntoDB,
  getServiceTypeFromDB,
  updateServiceTypeIntoDB,
};
