import httpStatus from "http-status";

import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { PendingHiring } from "./pendingHiring.model";
import { PendingHiringSearchableFields } from "./pendingHiring.constant";
import { TPendingHiring } from "./pendingHiring.interface";
import { User } from "../../user/user.model";

const getAllPendingHiringFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(PendingHiring.find(), query)
    .search(PendingHiringSearchableFields)
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

const getSinglePendingHiringFromDB = async (id: string) => {
  const result = await PendingHiring.findById(id);
  return result;
};

const createPendingHiringIntoDB = async (
  payload: TPendingHiring,
  token: string
) => {
  // Check token first
  if (token !== process.env.VITE_TOKEN) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }

  try {
    const result = await PendingHiring.create(payload);
    return result;
  } catch (error: any) {
    console.error("Error in createPendingHiringIntoDB:", error);

    // Throw the original AppError if it exists
    if (error instanceof AppError) {
      throw error;
    }

    // Wrap other errors
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Failed to create PendingHiring"
    );
  }
};

const updatePendingHiringIntoDB = async (
  id: string,
  payload: Partial<TPendingHiring>
) => {
  const pendingHiring = await PendingHiring.findById(id).select("+password");
  if (!pendingHiring) {
    throw new AppError(httpStatus.NOT_FOUND, "Pending hiring record not found");
  }

  const result = await PendingHiring.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select("+password"); 

  if (payload.status === "approved" && pendingHiring.status !== "approved") {
    const { email } = result;

    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      console.warn(`User with email ${email} already exists.`);
      throw new AppError(
        httpStatus.CONFLICT,
        `User with email ${email} already exists.`
      );
    } else {
      try {
        // Step 3b: Prepare user data for insertion
        const userData = result.toObject();
        delete userData._id;
        delete userData.__v;

        userData.role = "staff"; // role for auth
        userData.status = "active"; // user account status

        // Ensure timestamps
        userData.createdAt = new Date();
        userData.updatedAt = new Date();

        // Step 3c: Insert into Users collection
        await User.collection.insertOne(userData);

        // console.log(`✅ User created with role "staff" and password included: ${email}`);
      } catch (error: any) {
        console.error(
          "❌ Failed to create user with plain password:",
          error?.message || error
        );
        throw new AppError(
          httpStatus.INTERNAL_SERVER_ERROR,
          `Failed to create user with email ${email}`
        );
      }
    }
  }

  return result;
};

export const PendingHiringServices = {
  getAllPendingHiringFromDB,
  getSinglePendingHiringFromDB,
  updatePendingHiringIntoDB,
  createPendingHiringIntoDB,
};
