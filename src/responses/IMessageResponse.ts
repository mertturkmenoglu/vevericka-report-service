import IResponse from './IResponse';

export default interface IMessageResponse extends IResponse {
	data: { message: string }
}