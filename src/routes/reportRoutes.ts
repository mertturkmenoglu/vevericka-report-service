import express from 'express';
import { getReportTypes, createReport, getAllReports } from '../controllers/reportController';
import { getReportTypesRateLimit, createReportRateLimit } from '../middlewares/rateLimit';
import { isAdmin } from "../middlewares/admin";

const router = express.Router();

router.get('/report_types', getReportTypesRateLimit, getReportTypes);
router.post('/', createReportRateLimit, createReport);

// Admin routes
router.post('/all_reports', isAdmin, getAllReports);

export { router as reportRoutes };