import httpStatus from "http-status";

import { Notice } from "./notice.model";
import { TNotice } from "./notice.interface";
import { NoticeSearchableFields } from "./notice.constant";
import AppError from "../../../errors/AppError";
import QueryBuilder from "../../../builder/QueryBuilder";
import { User } from "../../user/user.model";

const getAllNoticeFromDB = async (query: Record<string, unknown>) => {
  let user;

  // 1️⃣ SEPARATE userId from the rest of the query filters
  // We use 'filterQuery' for the QueryBuilder to avoid the 'userId' field breaking the search
  const { userId, ...filterQuery } = query;

  // 2️⃣ If userId is provided, fetch user
  if (userId) {
    user = await User.findById(userId)
      .select("_id departmentId designationId")
      .lean();
  }

  // 3️⃣ Build base filter (Who can see what?)
  const noticeFilter: any = {};

  if (user) {
    // Server-side user-specific filtering
    noticeFilter.$or = [
      { noticeSetting: "all" },
      { noticeSetting: "department", department: user.departmentId },
      { noticeSetting: "designation", designation: user.designationId },
      { noticeSetting: "individual", users: user._id },
    ];
  }

  // 4️⃣ Apply QueryBuilder
  // Initialize find with the permission filter we built above
  const baseQuery = Notice.find(noticeFilter)
    .populate("designation", "title")
    .populate("department", "departmentName")
    .populate("users", "title firstName lastName")
    .populate("noticeBy", "title firstName lastName");

  // Pass 'filterQuery' (which does NOT contain userId) to the builder
  const noticeQueryBuilder = new QueryBuilder(baseQuery, filterQuery)
    .search(NoticeSearchableFields)
    .filter(filterQuery) // <--- CRITICAL CHANGE: Using cleaned query object
    .sort()
    .paginate()
    .fields();

  const meta = await noticeQueryBuilder.countTotal();
  const result = await noticeQueryBuilder.modelQuery;

  return {
    meta,
    result,
  };
};



const getSingleNoticeFromDB = async (id: string) => {
  const result = await Notice.findById(id);
  return result;
};


const createNoticeIntoDB = async (payload: TNotice) => {
    try {
      
      const result = await Notice.create(payload);
      return result;
    } catch (error: any) {
      console.error("Error in createNoticeIntoDB:", error);
  
      // Throw the original error or wrap it with additional context
      if (error instanceof AppError) {
        throw error;
      }
  
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Failed to create Notice");
    }
  };


const updateNoticeIntoDB = async (id: string, payload: Partial<TNotice>) => {
  const notice = await Notice.findById(id);

  if (!notice) {
    throw new AppError(httpStatus.NOT_FOUND, "Notice not found");
  }

  // Toggle `isDeleted` status for the selected user only
  // const newStatus = !user.isDeleted;

  // // Check if the user is a company, but only update the selected user
  // if (user.role === "company") {
  //   payload.isDeleted = newStatus;
  // }

  // Update only the selected user
  const result = await Notice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};




export const NoticeServices = {
    getAllNoticeFromDB,
    getSingleNoticeFromDB,
    updateNoticeIntoDB,
    createNoticeIntoDB
  
};



  