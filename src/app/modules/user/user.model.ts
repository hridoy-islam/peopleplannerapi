import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";
import { UserStatus } from "./user.constant";

const RightToWorkSchema = new Schema({
  hasExpiry: {
    type: Boolean,
  },
  expiryDate: {
    type: Date,
  },
});

const PayrollSchema = new Schema({
  payrollNumber: {
    type: String,
  },
  paymentMethod: {
    type: String,
    
  },
});

const EqualityInformationSchema = new Schema({
  nationality: {
    type: String,
  },
  religion: {
    type: String,
  },
  hasDisability: {
    type: Boolean,
  },
  disabilityDetails: {
    type: String,
  },
});

const AddressSchema = new Schema({
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  postCode: { type: String },
  country: { type: String }
});

const BeneficiarySchema = new Schema({
  fullName: { type: String },
  relationship: { type: String },
  email: { type: String },
  mobile: { type: String },
  sameAddress: { type: Boolean, default: false },
  address: {
    type: AddressSchema,
    
  }
});


// Emergency Contact Schema
const EmergencyContactSchema = new Schema(
  {
    emergencyContactName: { type: String },
    relationship: { type: String },
    address: { type: String },
    cityOrTown: { type: String },
    country: { type: String },
    postCode: { type: String },
    note: { type: String },
    phone: { type: String },
    mobile: { type: String },
    email: { type: String },
    emailRota: { type: Boolean, default: false },
    sendInvoice: { type: Boolean, default: false },
  }
);

// Critical Info Schema
const CriticalInfoSchema = new Schema(
  {
    date: { type: Date },
    type: { type: String }, // can be dropdown later
    details: { type: String },
  }
);

// Primary Branch Schema
const PrimaryBranchSchema = new Schema(
  {
    fromDate: { type: Date },
    branch: { type: String },
    area: { type: String },
    note: { type: String },
  }
);

// Notes Schema
const NotesSchema = new Schema(
  {
    date: { type: Date },
    type: { type: String },
    note: { type: String },
  }
  
);

const trainingSchema = new Schema(
  {
    trainingId: {
      type: Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    status: {
      type: String,
    },
    assignedDate: {
      type: Date,
    },
    expireDate: {
      type: Date,
     
    },
    completedAt:{
      type: Date,
    },
    certificate:{
      type: String,
    }
  }
 
);

const userSchema = new Schema<TUser, UserModel>(
  {
    // Basic user info
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ["user", "admin", "serviceUser", "staff"],
      default: "user",
    },
    image: { type: String },
    status: { type: String, enum: UserStatus, default: "active" },
    isDeleted: { type: Boolean, default: false },
    authorized: { type: Boolean, default: false },

    // Relations
    company: { type: Schema.Types.ObjectId, ref: "User" },
    colleagues: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // Auth
    googleUid: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    refreshToken: { type: String, select: false },

    // Finance
    accountNo: { type: String },
    sortCode: { type: String },
    beneficiary: { type: BeneficiarySchema },
    detailedBeneficiary: { type: BeneficiarySchema },

    // Service-user specific
    title: { type: String },
    firstName: { type: String },
    middleInitial: { type: String },
    lastName: { type: String },
    preferredName: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    ethnicOrigin: { type: String },
    religion: { type: String },
    serviceUserType: { type: String },

    // Address & Location
    address: { type: String },
    city: { type: String },
    country: { type: String },
    postCode: { type: String },
    stateOrProvince: { type: String },
    cityOrTown: { type: String },

    // Contact Information
    phone: { type: String },
    fax: { type: String },
    mobile: { type: String },
    otherPhone: { type: String },
    homePhone: { type: String },
    website: { type: String },

    // Employment / Service Details
    startDate: { type: Date },
    lastDutyDate: { type: Date },
    statusLabel: { type: String }, // dropdown
    servicePriority: { type: String }, // dropdown
    serviceLocationExId: { type: String },
    timesheetSignature: { type: Boolean },
    timesheetSignatureNote: { type: String },

    // Employee model fields
    nationalInsuranceNumber: { type: String },
    nhsNumber: { type: String },
    applicationDate: { type: Date },
    availableFromDate: { type: Date },
    availableFrom: { type: Date },
    employmentType: { type: String },
    position: { type: String },
    source: { type: String },
    branch: { type: String },
    area: { type: String },
    startDateEmployee: { type: Date },
    wtrDocumentUrl: { type: String },
    isFullTime: { type: Boolean },
    carTravelAllowance: { type: Boolean },
    recruitmentEmploymentType: {
      type: String,
      enum: ["full-time", "part-time", "contractor", "temporary", "intern"],
    },
    recruitmentId: { type: Schema.Types.ObjectId, ref: "Recruitment" },
    applicantId: { type: Schema.Types.ObjectId, ref: "Applicant" },

    // Equality & adjustments
    hasDisability: { type: Boolean },
    disabilityDetails: { type: String },
    needsReasonableAdjustment: { type: Boolean },
    reasonableAdjustmentDetails: { type: String },
    equalityInformation: { type: EqualityInformationSchema },

    // Payroll & compliance
    rightToWork: { type: RightToWorkSchema },
    payroll: { type: PayrollSchema },

    // Embedded Arrays
    emergencyContacts: [EmergencyContactSchema],
    criticalInfo: [CriticalInfoSchema],
    primaryBranch: [PrimaryBranchSchema],
    notes: [NotesSchema],

    // Misc
    departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
    training: [{ type: trainingSchema }],
    designationId: { type: Schema.Types.ObjectId, ref: "Designation" },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this; // doc
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);