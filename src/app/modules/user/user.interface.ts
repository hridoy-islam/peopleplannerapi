/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface RightToWork {
  hasExpiry?: boolean;
  expiryDate?: Date;
}

export interface Payroll {
  payrollNumber?: string;
  paymentMethod?: "bank-transfer" | "cheque" | "cash";
}

export interface EqualityInformation {
  nationality?: string;
  religion?: string;
  hasDisability?: boolean;
  disabilityDetails?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postCode?: string;
  country?: string;
}

export interface BeneficiaryDetails {
  fullName?: string;
  relationship?: string;
  email?: string;
  mobile?: string;
  sameAddress?: boolean;
  address?: Address;
}


export interface EmergencyContact {
  emergencyContactName: string;
  relationship: string;
  address: string;
  cityOrTown: string;
  country: string;
  postCode: string;
  note: string;
  phone: string;
  mobile: string;
  email: string;
  emailRota: boolean;
  sendInvoice: boolean;
}

export interface CriticalInfo {
  date: string;
  type: string | null;
  details: string;
}

export interface PrimaryBranch {
  fromDate: string;
  branch: string;
  area: string;
  note: string;
}

export interface NoteItem {
  date: string;
  type: string;
  note: string;
}

export interface TUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role?: "user" | "admin" | "serviceUser" | "staff";
  status?: "block" | "active";
  isDeleted?: boolean;
  authorized?: boolean;

  // Authentication & account
  googleUid?: string;
  otp?: string;
  otpExpires?: Date | null;
  refreshToken?: string;

  // Personal details
  serviceUserType: string;
  title?: string;
  firstName?: string;
  middleInitial?: string;
  initial:string;
  mobilePhone:string;
  contractHours:string;
  otherPhone:string;
  source: string;
  lastName?: string;
  preferredName?: string;
  dateOfBirth?: Date | string;
  gender?: string;
  maritalStatus?: string;
  ethnicOrigin?: string;
  religion?: string;
  nationality?: string;
  preferredLanguage?: string;

  // Documents & identifiers
  passportNo?: string;
  passportExpiry?: Date;
  nationalInsuranceNumber?: string;
  nhsNumber?: string;

  // Address & location
  address?: string;
  city?: string;
  postCode?: string;
  country?: string;
  stateOrProvince?: string;
  cityOrTown?: string;

  // Contact information
  phone?: string;
  fax?: string;
  homePhone:string;
  mobile?: string;
  other?: string;
  phoneNumber?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  emailAlt?: string;
  website?: string;

  // Employment / service details
  startDate?: Date | string;
  lastDutyDate?: Date | string;
  servicePriority?: string;
  serviceLocationExId?: string;
  statusLabel?: string;

  // Payroll & finance
  accountNo?: string;
  sortCode?: string;
  beneficiary?: string;
  payroll?: Payroll;
  detailedBeneficiary?: BeneficiaryDetails;

  // Company & relations
  company?: Types.ObjectId;
  colleagues?: Types.ObjectId[];
  departmentId?: Types.ObjectId;
  training?: any[];
  designationId?: Types.ObjectId;

  // Employment application data
  startDateEmployee:Date;
  vacancyId?: Types.ObjectId;
  recruitmentId?: Types.ObjectId;
  applicantId?: Types.ObjectId;
  applicationDate?: Date;
  availableFromDate?: Date;
  availableFrom?: Date;
  employmentType?: string;
  recruitmentEmploymentType?: "full-time" | "part-time" | "contractor" | "temporary" | "intern";
  position?: string;
  branch?: string;
  area?: string;
  isFullTime?: boolean;
  carTravelAllowance?: boolean;

  // Legal & compliance
  rightToWork?: RightToWork;
  wtrDocumentUrl?: string;

  // Extra fields from schema
  timesheetSignature?: boolean;
  timesheetSignatureNote?: string;

  // Equality & adjustments
  disability?: string;
  ethnicity?: string;
  hasDisability?: boolean;
  disabilityDetails?: string;
  needsReasonableAdjustment?: boolean;
  reasonableAdjustmentDetails?: string;
  equalityInformation?: EqualityInformation;

  // Media
  image?: string;
  profilePictureUrl?: string;

  // Miscellaneous
  name?: string;

  // Complex nested arrays
  emergencyContacts?: EmergencyContact[];
  criticalInfo?: CriticalInfo[];
  primaryBranch?: PrimaryBranch[];
  notes?: NoteItem[];
}
export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  // isJWTIssuedBeforePasswordChanged(
  //   passwordChangedTimestamp: Date,
  //   jwtIssuedTimestamp: number,
  // ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;