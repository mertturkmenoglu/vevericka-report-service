import IMessageResponse from './IMessageResponse';

export const message = (msg: string): IMessageResponse => {
	return {
		data: {
			message: msg
		}
	}
}