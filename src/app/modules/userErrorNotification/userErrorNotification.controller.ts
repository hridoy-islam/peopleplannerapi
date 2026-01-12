import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ConsentFormServices } from "./userErrorNotification.service";


const getAllConsentForm: RequestHandler = catchAsync(async (req, res) => {
  const result = await ConsentFormServices.getAllConsentFormFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConsentForms retrived succesfully",
    data: result,
  });
});
const getSingleConsentForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ConsentFormServices.getSingleConsentFormFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConsentForm is retrieved succesfully",
    data: result,
  });
});

const updateConsentForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ConsentFormServices.updateConsentFormIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConsentForm is updated succesfully",
    data: result,
  });
});

const createConsentForm = catchAsync(async (req, res) => {
  
  const result = await ConsentFormServices.createConsentFormIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConsentForm Created succesfully",
    data: result,
  });
});

const deleteSingleConsentForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ConsentFormServices.deleteConsentFormIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ConsentForm is deleted succesfully",
    data: result,
  });
});



export const ConsentFormControllers = {
    getAllConsentForm,
    getSingleConsentForm,
    updateConsentForm,
    createConsentForm,
    deleteSingleConsentForm
};

