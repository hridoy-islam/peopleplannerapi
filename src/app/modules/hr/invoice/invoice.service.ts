import httpStatus from "http-status";

import { Invoice } from "./invoice.model";
import { TInvoice } from "./invoice.interface";
import { InvoiceSearchableFields } from "./invoice.constant";
import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { User } from "../../user/user.model";
import moment from "moment";
import { Attendance } from "../attendance/attendance.model";
import { Types } from "mongoose";
import { Leave } from "../leave/leave.model";

const getAllInvoiceFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Invoice.find(), query)
    .search(InvoiceSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  let result = await userQuery.modelQuery;

  return { meta, result };
};
const getSingleInvoiceFromDB = async (id: string) => {
  const result = await Invoice.findById(id);
  return result;
};

const createInvoiceIntoDB = async (payload: TInvoice) => {
  try {
    const result = await Invoice.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createInvoiceIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create Invoice"
    );
  }
};

const updateInvoiceIntoDB = async (id: string, payload: Partial<TInvoice>) => {
  const invoice = await Invoice.findById(id);

  if (!invoice) {
    throw new AppError(httpStatus.NOT_FOUND, "Invoice not found");
  }

  // Update only the selected user
  const result = await Invoice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const InvoiceServices = {
  getAllInvoiceFromDB,
  getSingleInvoiceFromDB,
  updateInvoiceIntoDB,
  createInvoiceIntoDB,
};
