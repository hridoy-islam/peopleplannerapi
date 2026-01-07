import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContingencyPlanServices } from "./contingencyPlan.service";


const getAllContingencyPlan: RequestHandler = catchAsync(async (req, res) => {
  const result = await ContingencyPlanServices.getAllContingencyPlanFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContingencyPlans retrived succesfully",
    data: result,
  });
});
const getSingleContingencyPlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContingencyPlanServices.getSingleContingencyPlanFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContingencyPlan is retrieved succesfully",
    data: result,
  });
});

const updateContingencyPlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContingencyPlanServices.updateContingencyPlanIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContingencyPlan is updated succesfully",
    data: result,
  });
});

const createContingencyPlan = catchAsync(async (req, res) => {
  
  const result = await ContingencyPlanServices.createContingencyPlanIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ContingencyPlan Created succesfully",
    data: result,
  });
});



export const ContingencyPlanControllers = {
    getAllContingencyPlan,
    getSingleContingencyPlan,
    updateContingencyPlan,
    createContingencyPlan
};

