/* eslint-disable no-unused-vars */
import { Types } from "mongoose";

export interface TravelDetail {
  fromDate: string;
  distance: string;
  type: string;
  reason: string;
  linkedInvoiceRateSheet: string;
}

export interface AdhocInvoice {
  invoiceStartDate: string;
  invoiceEndDate: string;
  invoiceType: string;
  invoiceValue: string;
  invoiceSummary: string;
  note: string;
}

export interface Invoice {
  phone?: string;
  fax?: string;
  mobile?: string;
  other?: string;
  email: string;
  website?: string;
  deliveryType: string;
  linked: boolean;
  type: string;
  name: string;
  address: string;
  cityTown: string;
  county?: string;
  postCode: string;
  customerExternalId: string;
  invoiceRun: string;
  invoiceFormat: string;
  invoiceGrouping: string;
}

export interface TFunder {
  // Personal Information
  serviceUser: Types.ObjectId;
  type: string;
  title: string;
  image?: any;
  firstName: string;
  middleInitial?: string;
  lastName: string;
  description: string;
  area: string;
  branch: string;

  // Address & Location
  address: string;
  city: string;
  country: string;
  postCode: string;

  // Contact Information
  phone?: string;
  fax?: string;
  email: string;
  mobile?: string;
  otherPhone?: string; // matches schema
  website?: string;

  // Employment / Service Details
  startDate: string;
  status: string;
  travelType: string;

  // Invoice Info
  invoice: Invoice;

  // Purchase Order
  purchaseOrder: boolean;

  // Travel Details
  travelDetails: TravelDetail[];

  // Adhoc Invoice
  adhocInvoice: AdhocInvoice[];
}
