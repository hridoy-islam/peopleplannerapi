import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatementServices } from "./statement.service";


const getAllStatement: RequestHandler = catchAsync(async (req, res) => {
  const result = await StatementServices.getAllStatementFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Statements retrived succesfully",
    data: result,
  });
});
const getSingleStatement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StatementServices.getSingleStatementFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Statement is retrieved succesfully",
    data: result,
  });
});

const updateStatement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StatementServices.updateStatementIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Statement is updated succesfully",
    data: result,
  });
});

const createStatement = catchAsync(async (req, res) => {
  
  const result = await StatementServices.createStatementIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Statement Created succesfully",
    data: result,
  });
});

const deleteSingleStatement = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StatementServices.deleteStatementIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Statement is deleted succesfully",
    data: result,
  });
});



export const StatementControllers = {
    getAllStatement,
    getSingleStatement,
    updateStatement,
    createStatement,
    deleteSingleStatement
};

