import IResponse from './IResponse';

export default interface IErrorResponse extends IResponse {
	data: {
		error: {
			message: string,
			status_code: number
		}
	}
}