import httpStatus from "http-status";

import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { TDevice } from "./device.interface";
import { DeviceSearchableFields } from "./device.constant";
import { Device } from "./device.model";

const getAllDeviceFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Device.find(), query)
    .search(DeviceSearchableFields)
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

const getSingleDeviceFromDB = async (id: string) => {
  const result = await Device.findById(id);
  return result;
};

const createDeviceIntoDB = async (payload: TDevice) => {
  try {
    const result = await Device.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createDeviceIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Device"
    );
  }
};

const updateDeviceIntoDB = async (id: string, payload: Partial<TDevice>) => {
  const notice = await Device.findById(id);

  if (!notice) {
    throw new AppError(httpStatus.NOT_FOUND, "Device not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await Device.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteDeviceFromDB = async (id: string) => {
  const device = await Device.findById(id);

  if (!device) {
    throw new AppError(httpStatus.NOT_FOUND, "Device not found");
  }

  await Device.findByIdAndDelete(id);

  return { message: "Device deleted successfully" };
};

export const DeviceServices = {
  getAllDeviceFromDB,
  getSingleDeviceFromDB,
  updateDeviceIntoDB,
  createDeviceIntoDB,
  deleteDeviceFromDB,
};
