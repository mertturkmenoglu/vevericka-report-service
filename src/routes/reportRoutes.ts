import express from 'express';
import { getReportTypes, createReport } from '../controllers/reportController';

const router = express.Router();

router.get('/report_types', getReportTypes);
router.post('/', createReport);

export { router as reportRoutes };