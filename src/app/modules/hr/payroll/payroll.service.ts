import httpStatus from "http-status";

import { Payroll } from "./payroll.model";
import { TPayroll } from "./payroll.interface";
import { PayrollSearchableFields } from "./payroll.constant";
import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { User } from "../../user/user.model";
import moment from "moment";
import { Attendance } from "../attendance/attendance.model";
import { Types } from "mongoose";
import { Leave } from "../leave/leave.model";




const getAllPayrollFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Payroll.find(), query)
    .search(PayrollSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  let result = await userQuery.modelQuery;


  return { meta, result };
};
const getSinglePayrollFromDB = async (id: string) => {
  const result = await Payroll.findById(id);
  return result;
};

const createPayrollIntoDB = async (payload: TPayroll) => {
  try {
    const result = await Payroll.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createPayrollIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Payroll"
    );
  }
};

const updatePayrollIntoDB = async (id: string, payload: Partial<TPayroll>) => {
  const payroll = await Payroll.findById(id);

  if (!payroll) {
    throw new AppError(httpStatus.NOT_FOUND, "Payroll not found");
  }

  // Update only the selected user
  const result = await Payroll.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const PayrollServices = {
  getAllPayrollFromDB,
  getSinglePayrollFromDB,
  updatePayrollIntoDB,
  createPayrollIntoDB,
};
