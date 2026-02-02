import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceUserScheduleServices } from "./serviceUserSchedule.service";


const getAllServiceUserSchedule: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceUserScheduleServices.getAllServiceUserScheduleFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceUserSchedules retrived succesfully",
    data: result,
  });
});
const getSingleServiceUserSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceUserScheduleServices.getSingleServiceUserScheduleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceUserSchedule is retrieved succesfully",
    data: result,
  });
});

const updateServiceUserSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceUserScheduleServices.updateServiceUserScheduleIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceUserSchedule is updated succesfully",
    data: result,
  });
});

const createServiceUserSchedule = catchAsync(async (req, res) => {
  
  const result = await ServiceUserScheduleServices.createServiceUserScheduleIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceUserSchedule Created succesfully",
    data: result,
  });
});

const deleteSingleServiceUserSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceUserScheduleServices.deleteServiceUserScheduleIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceUserSchedule is deleted succesfully",
    data: result,
  });
});



export const ServiceUserScheduleControllers = {
    getAllServiceUserSchedule,
    getSingleServiceUserSchedule,
    updateServiceUserSchedule,
    createServiceUserSchedule,
    deleteSingleServiceUserSchedule
};

