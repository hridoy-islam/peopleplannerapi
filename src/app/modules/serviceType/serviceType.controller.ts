import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceTypeServices } from "./serviceType.service";

const getAllServiceType: RequestHandler = catchAsync(async (req, res) => {
  const result = await ServiceTypeServices.getServiceTypeFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceType retrived succesfully",
    data: result,
  });
});

// const getSingleNotice = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await NoticeServices.getSingleNoticeFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "ServiceType is retrieved succesfully",
//     data: result,
//   });
// });

const updateServiceType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceTypeServices.updateServiceTypeIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceType is updated succesfully",
    data: result,
  });
});

const createServiceType = catchAsync(async (req, res) => {
  
  const result = await ServiceTypeServices.createServiceTypeIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ServiceType Created succesfully",
    data: result,
  });
});



export const ServiceTypeControllers = {
    getAllServiceType,
    createServiceType,
    updateServiceType
    
};

