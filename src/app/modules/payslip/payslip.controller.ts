import { RequestHandler } from "express";
;
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PayslipServices } from "./payslip.service";

const getAllPayslip: RequestHandler = catchAsync(async (req, res) => {
  const result = await PayslipServices.getPayslipFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payslips retrived succesfully",
    data: result,
  });
});

const getSinglePayslip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PayslipServices.getSinglePayslipFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payslip is retrieved succesfully",
    data: result,
  });
});
const regeneratePayslip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PayslipServices.regeneratePayslipById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payslip is regenerate succesfully",
    data: result,
  });
});

const updatePayslip = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PayslipServices.updatePayslipIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payslip is updated succesfully",
    data: result,
  });
});




const createPayslip = catchAsync(async (req, res) => {
  
  const result = await PayslipServices.createPayslipIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payslip Created succesfully",
    data: result,
  });
});

export const PayslipControllers = {
    createPayslip,
    getAllPayslip,
    getSinglePayslip,
    updatePayslip,
    regeneratePayslip
};

