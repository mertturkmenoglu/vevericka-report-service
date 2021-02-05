import { Document, Model, model, Schema } from 'mongoose';

const ReportSchema = new Schema<ReportDocument, ReportModel>({
	type: {
		type: String,
		required: true
	},
	reported_by: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	reported_post_id: {
		type: String,
		required: true
	},
	reported_user: {
		type: String,
		required: true
	},
	assignee: {
		type: String,
		default: null
	},
	status: {
		type: String,
		default: null
	},
	reported_by_comment: {
		type: String,
		default: null
	},
	assignee_comment: {
		type: String,
		default: null
	}
});

export interface Report {
	type: string
	reported_by: string
	created_at: Date
	reported_post_id: string
	reported_user: string
	assignee?: string
	status?: string
	reported_by_comment?: string
	assignee_comment?: string
}

interface ReportBaseDocument extends Report, Document {

}

export interface ReportDocument extends ReportBaseDocument {

}

export interface ReportModel extends Model<ReportDocument> {

}

export default model<ReportDocument, ReportModel>("Report", ReportSchema);