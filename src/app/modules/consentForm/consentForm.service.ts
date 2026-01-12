import httpStatus from "http-status";

import { ConsentForm } from "./consentForm.model";
import { TConsentForm } from "./consentForm.interface";
import { ConsentFormSearchableFields } from "./consentForm.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

const getAllConsentFormFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ConsentForm.find(), query)
    .search(ConsentFormSearchableFields)
    .filter(query)
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleConsentFormFromDB = async (id: string) => {
  const result = await ConsentForm.findById(id);
  return result;
};

const createConsentFormIntoDB = async (payload: TConsentForm) => {
  try {
    const result = await ConsentForm.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createConsentFormIntoDB:", error);

    // Throw the original error or wrap it with additional context
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create ConsentForm"
    );
  }
};

const updateConsentFormIntoDB = async (
  id: string,
  payload: Partial<TConsentForm>
) => {
  const consentForm = await ConsentForm.findById(id);

  if (!consentForm) {
    throw new AppError(httpStatus.NOT_FOUND, "ConsentForm not found");
  }


  // Update only the selected user
  const result = await ConsentForm.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


const deleteConsentFormIntoDB = async (
  id: string,
) => {
  const consentForm = await ConsentForm.findById(id);

  if (!consentForm) {
    throw new AppError(httpStatus.NOT_FOUND, "ConsentForm not found");
  }


  const result = await ConsentForm.findByIdAndDelete(id);

  return result;
};


export const ConsentFormServices = {
  getAllConsentFormFromDB,
  getSingleConsentFormFromDB,
  updateConsentFormIntoDB,
  createConsentFormIntoDB,
  deleteConsentFormIntoDB
};
