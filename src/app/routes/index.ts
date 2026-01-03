import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.router";
import { NoticeRoutes } from "../modules/hr/notice/notice.router";
import { DepartmentRoutes } from "../modules/hr/department/department.router";
import { EmailRoutes } from "../modules/hr/email-setup/email-setup.router";
import { AttendanceRoutes } from "../modules/hr/attendance/attendance.router";
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
import { PayrollRoutes } from "../modules/hr/payroll/payroll.router";
import { InvoiceRoutes } from "../modules/hr/invoice/invoice.router";
import {ReportRoutes} from "../modules/hr/report/report.router"
import { DeviceRoutes } from "../modules/hr/devices/device.router";
import { RequestDocumentRoutes } from "../modules/hr/request-document/requestDocument.router";
import { UploadDocumentRoutes } from "../modules/documents/documents.route";
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
    path: "/payrolls",
    route: PayrollRoutes,
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
    path: "/documents",
    route: UploadDocumentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
