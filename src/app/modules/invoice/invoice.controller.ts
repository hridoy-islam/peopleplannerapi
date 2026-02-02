import { RequestHandler } from "express";
;
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { InvoiceServices } from "./invoice.service";

const getAllInvoice: RequestHandler = catchAsync(async (req, res) => {
  const result = await InvoiceServices.getInvoiceFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Invoices retrived succesfully",
    data: result,
  });
});

const getSingleInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.getSingleInvoiceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Invoice is retrieved succesfully",
    data: result,
  });
});
const regenerateInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.regenerateInvoiceById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Invoice is regenerate succesfully",
    data: result,
  });
});

const updateInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.updateInvoiceIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Invoice is updated succesfully",
    data: result,
  });
});




const createInvoice = catchAsync(async (req, res) => {
  
  const result = await InvoiceServices.createInvoiceIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Invoice Created succesfully",
    data: result,
  });
});

export const InvoiceControllers = {
    createInvoice,
    getAllInvoice,
    getSingleInvoice,
    updateInvoice,
    regenerateInvoice
};

