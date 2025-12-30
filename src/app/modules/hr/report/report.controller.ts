import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ReportServices } from "./report.service";


const getAllReport: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReportServices.getAllReportFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reports retrived succesfully",
    data: result,
  });
});
const getSingleReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReportServices.getSingleReportFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report is retrieved succesfully",
    data: result,
  });
});

const updateReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReportServices.updateReportIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report is updated succesfully",
    data: result,
  });
});

const createReport = catchAsync(async (req, res) => {
  
  const result = await ReportServices.createReportIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report Created succesfully",
    data: result,
  });
});

const deleteReport = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReportServices.deleteReportFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Report deleted successfully",
    data: result,
  });
});


export const ReportControllers = {
    getAllReport,
    getSingleReport,
    updateReport,
    createReport,
    deleteReport
};

