import { RequestHandler } from "express";
;
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ScheduleServices } from "./schedule.service";

const getAllSchedule: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAllScheduleFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule retrived succesfully",
    data: result,
  });
});
const getAllUpcomingSchedule: RequestHandler = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAllUpcomingScheduleFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule retrived succesfully",
    data: result,
  });
});
const getSingleSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.getSingleScheduleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule is retrieved succesfully",
    data: result,
  });
});
const deleteSingleSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.deleteScheduleIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule is deleted succesfully",
    data: result,
  });
});

const updateSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.updateScheduleIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule is updated succesfully",
    data: result,
  });
});

const createSchedule = catchAsync(async (req, res) => {
  
  const result = await ScheduleServices.createScheduleIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Created succesfully",
    data: result,
  });
});
const createBulkSchedule = catchAsync(async (req, res) => {
  
  const result = await ScheduleServices.createBulkScheduleIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Created succesfully",
    data: result,
  });
});



export const ScheduleControllers = {
    getAllSchedule,
    getSingleSchedule,
    updateSchedule,
    createSchedule,
    deleteSingleSchedule,
    getAllUpcomingSchedule,
    createBulkSchedule
};

