export const dateConvertor = (dateString: string): string => {
	const WEEK_DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
	const dayIdx = new Date(dateString).getDay();
	const today = new Date().getDate();
	const day = Number(dateString.slice(8, 11));

	const result = today === day ? "Today" : `${day}: ${WEEK_DAYS_SHORT[dayIdx]}`;

	return result;
}