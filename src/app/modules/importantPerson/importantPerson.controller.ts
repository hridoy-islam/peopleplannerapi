import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ImportantPersonServices } from "./importantPerson.service";


const getAllImportantPerson: RequestHandler = catchAsync(async (req, res) => {
  const result = await ImportantPersonServices.getAllImportantPersonFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ImportantPersons retrived succesfully",
    data: result,
  });
});
const getSingleImportantPerson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ImportantPersonServices.getSingleImportantPersonFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ImportantPerson is retrieved succesfully",
    data: result,
  });
});

const updateImportantPerson = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ImportantPersonServices.updateImportantPersonIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ImportantPerson is updated succesfully",
    data: result,
  });
});

const createImportantPerson = catchAsync(async (req, res) => {
  
  const result = await ImportantPersonServices.createImportantPersonIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ImportantPerson Created succesfully",
    data: result,
  });
});



export const ImportantPersonControllers = {
    getAllImportantPerson,
    getSingleImportantPerson,
    updateImportantPerson,
    createImportantPerson
};

