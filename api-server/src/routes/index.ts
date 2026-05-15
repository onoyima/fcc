import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import propertiesRouter from "./properties";
import estatesRouter from "./estates";
import tenantsRouter from "./tenants";
import landlordsRouter from "./landlords";
import leasesRouter from "./leases";
import invoicesRouter from "./invoices";
import paymentsRouter from "./payments";
import maintenanceRouter from "./maintenance";
import projectsRouter from "./projects";
import workersRouter from "./workers";
import payrollRouter from "./payroll";
import contractorsRouter from "./contractors";
import notificationsRouter from "./notifications";
import chatsRouter from "./chats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(propertiesRouter);
router.use(estatesRouter);
router.use(tenantsRouter);
router.use(landlordsRouter);
router.use(leasesRouter);
router.use(invoicesRouter);
router.use(paymentsRouter);
router.use(maintenanceRouter);
router.use(projectsRouter);
router.use(workersRouter);
router.use(payrollRouter);
router.use(contractorsRouter);
router.use(notificationsRouter);
router.use(chatsRouter);

export default router;
