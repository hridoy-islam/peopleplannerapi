import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NeedServices } from "./needs.service";


const getAllNeed: RequestHandler = catchAsync(async (req, res) => {
  const result = await NeedServices.getAllNeedFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Needs retrived succesfully",
    data: result,
  });
});
const getSingleNeed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NeedServices.getSingleNeedFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Need is retrieved succesfully",
    data: result,
  });
});

const updateNeed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NeedServices.updateNeedIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Need is updated succesfully",
    data: result,
  });
});

const createNeed = catchAsync(async (req, res) => {
  
  const result = await NeedServices.createNeedIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Need Created succesfully",
    data: result,
  });
});

const deleteSingleNeed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NeedServices.deleteNeedIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Need is deleted succesfully",
    data: result,
  });
});



export const NeedControllers = {
    getAllNeed,
    getSingleNeed,
    updateNeed,
    createNeed,
    deleteSingleNeed
};

