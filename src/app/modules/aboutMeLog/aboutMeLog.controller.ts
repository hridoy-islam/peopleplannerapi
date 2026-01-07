import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AboutMeLogServices } from "./aboutMeLog.service";


const getAllAboutMeLog: RequestHandler = catchAsync(async (req, res) => {
  const result = await AboutMeLogServices.getAllAboutMeLogFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutMeLogs retrived succesfully",
    data: result,
  });
});
const getSingleAboutMeLog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AboutMeLogServices.getSingleAboutMeLogFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutMeLog is retrieved succesfully",
    data: result,
  });
});

const updateAboutMeLog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AboutMeLogServices.updateAboutMeLogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutMeLog is updated succesfully",
    data: result,
  });
});

const createAboutMeLog = catchAsync(async (req, res) => {
  
  const result = await AboutMeLogServices.createAboutMeLogIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AboutMeLog Created succesfully",
    data: result,
  });
});



export const AboutMeLogControllers = {
    getAllAboutMeLog,
    getSingleAboutMeLog,
    updateAboutMeLog,
    createAboutMeLog
};

