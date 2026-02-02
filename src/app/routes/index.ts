import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.router";
import { NoticeRoutes } from "../modules/hr/notice/notice.router";
import { DepartmentRoutes } from "../modules/hr/department/department.router";
import { EmailRoutes } from "../modules/hr/email-setup/email-setup.router";
import { VacancyRoutes } from "../modules/hr/vacancy/vacancy.router";
import { ApplicantRoutes } from "../modules/hr/applicant/applicant.router";
import { RecruitmentRoutes } from "../modules/hr/recruitment/recruitment.router";
import { TrainingRoutes } from "../modules/hr/training/training.router";
import { DesignationRoutes } from "../modules/hr/designation/designation.router";
import { ShiftRoutes } from "../modules/hr/shift/shift.router";
import { EmployeeRateRoutes } from "../modules/hr/employeeRate/employeeRate.router";
import { FunderRoutes } from "../modules/hr/funder/funder.router";
import { ScheduleRoutes } from "../modules/schedule/schedule.router";
import { LeaveRoutes } from "../modules/hr/leave/leave.router";
import { BankHolidayRoutes } from "../modules/hr/bank-holiday/bank-holiday.router";
import { PendingHiringRoutes } from "../modules/hr/pending-hiring/pendingHiring.router";
import { RightToWorkRoutes } from "../modules/hr/rightToWork/rightToWork.router";
import { ReportRoutes } from "../modules/hr/report/report.router";
import { DeviceRoutes } from "../modules/hr/devices/device.router";
import { RequestDocumentRoutes } from "../modules/hr/request-document/requestDocument.router";
import { UploadDocumentRoutes } from "../modules/documents/documents.route";
import { NeedRoutes } from "../modules/needs/needs.router";
import { AboutMeLogRoutes } from "../modules/aboutMeLog/aboutMeLog.router";
import { ImportantPersonRoutes } from "../modules/importantPerson/importantPerson.router";
import { ContingencyPlanRoutes } from "../modules/contingencyPlan/contingencyPlan.router";
import { ServiceUserDocumentRoutes } from "../modules/serviceUserDocuments/serviceUserDocument.router";
import { StatementRoutes } from "../modules/statements/statement.router";
import { ConsentFormRoutes } from "../modules/consentForm/consentForm.router";
import { SubscriptionPlanRoutes } from "../modules/subscriptionPlan/subscriptionPlan.router";
import { CompanyReportRoutes } from "../modules/companyReport/companyReport.router";
import { AttendanceRoutes } from "../modules/attendance/attendance.router";
import { CSVRouter } from "../modules/csv/csv.route";
import { VisitTypeRoutes } from "../modules/visitType/visitType.router";
import { ServiceUserScheduleRoutes } from "../modules/serviceUserSchedule/serviceUserSchedule.router";
import { ServiceTypeRoutes } from "../modules/serviceType/serviceType.router";
import { PayslipRoutes } from "../modules/payslip/payslip.router";
import { InvoiceRoutes } from "../modules/invoice/invoice.router";
const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/hr/notice",
    route: NoticeRoutes,
  },
  {
    path: "/hr/department",
    route: DepartmentRoutes,
  },
  {
    path: "/hr/email-setup",
    route: EmailRoutes,
  },
  {
    path: "/hr/attendance",
    route: AttendanceRoutes,
  },
  {
    path: "/hr/vacancy",
    route: VacancyRoutes,
  },

  {
    path: "/hr/applicant",
    route: ApplicantRoutes,
  },
  {
    path: "/hr/pending-hiring",
    route: PendingHiringRoutes,
  },
  {
    path: "/hr/recruitment",
    route: RecruitmentRoutes,
  },
  {
    path: "/hr/training",
    route: TrainingRoutes,
  },
  {
    path: "/hr/designation",
    route: DesignationRoutes,
  },
  {
    path: "/hr/shift",
    route: ShiftRoutes,
  },
  {
    path: "/hr/leave",
    route: LeaveRoutes,
  },
  {
    path: "/hr/bank-holiday",
    route: BankHolidayRoutes,
  },
  {
    path: "/hr/employeeRate",
    route: EmployeeRateRoutes,
  },
  {
    path: "/hr/right-to-work",
    route: RightToWorkRoutes,
  },
  {
    path: "/hr/request-document",
    route: RequestDocumentRoutes,
  },
  {
    path: "/service-funder",
    route: FunderRoutes,
  },
  {
    path: "/schedules",
    route: ScheduleRoutes,
  },
  {
    path: "/payslips",
    route: PayslipRoutes,
  },
  {
    path: "/invoices",
    route: InvoiceRoutes,
  },
  {
    path: "/reports",
    route: ReportRoutes,
  },

  {
    path: "/devices",
    route: DeviceRoutes,
  },
  {
    path: "/needs",
    route: NeedRoutes,
  },
  {
    path: "/about-me-logs",
    route: AboutMeLogRoutes,
  },
  {
    path: "/important-people",
    route: ImportantPersonRoutes,
  },
  {
    path: "/contingency-plan",
    route: ContingencyPlanRoutes,
  },
  {
    path: "/documents",
    route: UploadDocumentRoutes,
  },
  {
    path: "/serviceUser-documents",
    route: ServiceUserDocumentRoutes,
  },
  {
    path: "/statements",
    route: StatementRoutes,
  },
  {
    path: "/consent-form",
    route: ConsentFormRoutes,
  },
  {
    path: "/subscription-plans",
    route: SubscriptionPlanRoutes,
  },
  {
    path: "/company-report",
    route: CompanyReportRoutes,
  },
   {
    path: "/csv",
    route: CSVRouter,
  },
   {
    path: "/visit-type",
    route: VisitTypeRoutes,
  },

   {
    path: "/service-Type",
    route: ServiceTypeRoutes,
  },
   {
    path: "/serviceuser-schedule",
    route: ServiceUserScheduleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
