import express from 'express';
import { getReportTypes, createReport } from '../controllers/reportController';
import { getReportTypesRateLimit, createReportRateLimit } from '../middlewares/rateLimit';

const router = express.Router();

router.get('/report_types', getReportTypesRateLimit, getReportTypes);
router.post('/', createReportRateLimit, createReport);

export { router as reportRoutes };