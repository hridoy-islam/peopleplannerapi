import { RequestHandler } from "express";
;
import httpStatus from "http-status";


import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { DeviceServices } from "./device.service";


const getAllDevice: RequestHandler = catchAsync(async (req, res) => {
  const result = await DeviceServices.getAllDeviceFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Devices retrived succesfully",
    data: result,
  });
});
const getSingleDevice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DeviceServices.getSingleDeviceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Device is retrieved succesfully",
    data: result,
  });
});

const updateDevice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DeviceServices.updateDeviceIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Device is updated succesfully",
    data: result,
  });
});

const createDevice = catchAsync(async (req, res) => {
  
  const result = await DeviceServices.createDeviceIntoDB( req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Device Created succesfully",
    data: result,
  });
});

const deleteDevice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DeviceServices.deleteDeviceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Device deleted successfully",
    data: result,
  });
});


export const DeviceControllers = {
    getAllDevice,
    getSingleDevice,
    updateDevice,
    createDevice,
    deleteDevice
};

