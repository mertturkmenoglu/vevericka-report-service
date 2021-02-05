import IResponse from './IResponse';

export const response = <T>(data: T): IResponse => {
	return {
		data
	}
}