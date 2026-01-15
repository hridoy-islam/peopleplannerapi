import { Schema, model, Types } from "mongoose";
import { TFunder } from "./funder.interface";


const TravelDetailSchema = new Schema({
  fromDate: { type: String },
  distance: { type: String },
  type: { type: String },
  reason: { type: String },
  linkedInvoiceRateSheet: { type: String },
});

const AdhocInvoiceSchema = new Schema({
  invoiceStartDate: { type: String },
  invoiceEndDate: { type: String },
  invoiceType: { type: String }, // undefined in form, but string is safer
  invoiceValue: { type: String },
  invoiceSummary: { type: String },
  note: { type: String },
});

const InvoiceSchema = new Schema({
  phone: { type: String },
  fax: { type: String },
  mobile: { type: String },
  other: { type: String },
  email: { type: String },
  website: { type: String },
  deliveryType: { type: String },
  linked: { type: String }, 
  type: { type: String },
  name: { type: String },
  address: { type: String },
  cityTown: { type: String },
  county: { type: String },
  postCode: { type: String },
  customerExternalId: { type: String },
  invoiceRun: { type: String },
  invoiceFormat: { type: String },
  invoiceGrouping: { type: String },
});

const FunderSchema = new Schema(
  {
    // Personal Information
    serviceUser: { type: Types.ObjectId, ref: "User" },
    type: { type: String },
    title: { type: String },
    image: { type: Schema.Types.Mixed },
    firstName: { type: String },
    middleInitial: { type: String },
    lastName: { type: String },
    description: { type: String },
    area: { type: String },
    branch: { type: String },

    // Address & Location
    address: { type: String },
    city: { type: String },
    country: { type: String },
    postCode: { type: String },

    // Contact Information
    phone: { type: String },
    fax: { type: String },
    email: { type: String },
    mobile: { type: String },
    otherPhone: { type: String }, // renamed to match form
    website: { type: String },

    // Employment / Service Details
    startDate: { type: String },
    status: { type: String },
    travelType: { type: String },

    // Invoice Info
    invoice: { type: InvoiceSchema },

    // Purchase Order
    purchaseOrder: { type: Boolean },

    // Travel Details
    travelDetails: [TravelDetailSchema],

    // Adhoc Invoice
    adhocInvoice: [AdhocInvoiceSchema],
  },
  { timestamps: true }
);

export const Funder = model<TFunder>("Funder", FunderSchema);
