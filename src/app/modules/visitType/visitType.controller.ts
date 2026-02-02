import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VisitTypeServices } from "./visitType.service";

const getAllVisitType: RequestHandler = catchAsync(async (req, res) => {
  const result = await VisitTypeServices.getVisitTypeFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "VisitType retrived succesfully",
    data: result,
  });
});

// const getSingleNotice = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await NoticeServices.getSingleNoticeFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "VisitType is retrieved succesfully",
//     data: result,
//   });
// });

const updateVisitType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VisitTypeServices.updateVisitTypeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "VisitType is updated succesfully",
    data: result,
  });
});

const createVisitType = catchAsync(async (req, res) => {
  
  const result = await VisitTypeServices.createVisitTypeIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "VisitType Created succesfully",
    data: result,
  });
});



export const VisitTypeControllers = {
    getAllVisitType,
    createVisitType,
    updateVisitType
    
};

