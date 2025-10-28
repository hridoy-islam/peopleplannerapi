import { RequestHandler } from "express";
;
import httpStatus from "http-status";

import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { PendingHiringServices } from "./pendingHiring.service";

const getAllPendingHiring: RequestHandler = catchAsync(async (req, res) => {
  const result = await PendingHiringServices.getAllPendingHiringFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PendingHiring retrived succesfully",
    data: result,
  });
});
const getSinglePendingHiring = catchAsync(async (req, res) => {

  const { id } = req.params;
  const result = await PendingHiringServices.getSinglePendingHiringFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PendingHiring is retrieved succesfully",
    data: result,
  });
});

const updatePendingHiring = catchAsync(async (req, res) => {
    
  const { id } = req.params;
  const result = await PendingHiringServices.updatePendingHiringIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PendingHiring is updated succesfully",
    data: result,
  });
});

const createPendingHiring = catchAsync(async (req, res) => {
   const token = req.headers['x-company-token'];
if (!token) {
    throw new Error("Tokenis missing in the headers");
  }
  const result = await PendingHiringServices.createPendingHiringIntoDB( req.body,token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "PendingHiring Created succesfully",
    data: result,
  });
});



export const PendingHiringControllers = {
    getAllPendingHiring,
    getSinglePendingHiring,
    updatePendingHiring,
    createPendingHiring
};

