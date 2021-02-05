export const validateReport = (data: any): Boolean => {
	const required = ['type', 'reported_by', 'reported_post_id', 'reported_user'];

	for (const requirement of required) {
		if (data[requirement] === undefined) {
			return false;
		}
	}

	return true;
}