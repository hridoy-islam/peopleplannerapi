import { Types } from "mongoose";

export interface TDesignation {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  companyId:any;
  permissions: {
    [module: string]: {
      canView: boolean;
      canCreate: boolean;
      canEdit: boolean;
      canDelete: boolean;
    };
  };
}
