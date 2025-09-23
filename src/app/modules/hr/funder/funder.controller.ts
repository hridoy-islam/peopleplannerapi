import { RequestHandler } from "express";
;
import httpStatus from "http-status";

import { FunderServices } from "./funder.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const getAllFunder: RequestHandler = catchAsync(async (req, res) => {
  const result = await FunderServices.getAllFunderFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Funders retrived succesfully",
    data: result,
  });
});
const getSingleFunder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FunderServices.getSingleFunderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Funder is retrieved succesfully",
    data: result,
  });
});

const updateFunder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FunderServices.updateFunderIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Funder is updated succesfully",
    data: result,
  });
});

const createFunder = catchAsync(async (req, res) => {
  
  const result = await FunderServices.createFunderIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Funder Created succesfully",
    data: result,
  });
});



export const FunderControllers = {
    getAllFunder,
    getSingleFunder,
    updateFunder,
    createFunder
};

