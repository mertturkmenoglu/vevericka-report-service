import IErrorResponse from './IErrorResponse';

export const error = (message: string, status_code: number): IErrorResponse => {
	return {
		data: {
			error: {
				message,
				status_code
			}
		}
	}
}