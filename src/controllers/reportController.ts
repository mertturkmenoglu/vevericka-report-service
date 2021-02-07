import { response } from '../responses/response';
import { reportTypes } from '../data/reportTypes';
import { Request, Response } from 'express';
import { validateReport } from '../validation/validateReport';
import { error } from '../responses/error';
import Report from '../models/Report';
import { message } from '../responses/message';
import { constants} from "../data/ApplicationConstants";

const getReportTypes = async (req: Request, res: Response) => {
	let lang = req.query.lang;

	if (!lang || typeof lang !== 'string' || !Object.keys(reportTypes).includes(lang)) {
		lang = constants.default_lang_key;
	} else {
		lang = lang as string;
	}

	return res.status(200).json(response(reportTypes[lang]))
}

const createReport = async (req: Request, res: Response) => {
	const isValid = validateReport(req.body);

	if (!isValid) {
		return res.status(400).json(error(req.__('create_report.errors.invalid_req_body'), 400))
	}

	const { type, reported_by, reported_post_id, reported_user, reported_by_comment } = req.body;
	const comment = (reported_by_comment === undefined || reported_by_comment === null) ? null : reported_by_comment;

	const report = new Report({
		type,
		reported_by,
		reported_post_id,
		reported_user,
		reported_by_comment: comment
	});

	try {
		await report.save();
		return res.status(201).json(message(req.__('create_report.reported')));
	} catch (err) {
		console.error(err);
		return res.status(500).json(error(req.__('create_report.errors.report_failed'), 500));
	}
}

export {
	getReportTypes,
	createReport
}