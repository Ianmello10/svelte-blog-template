export function formatReadableDate(dateString: string, locale = 'en-US') {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date');
	}

	return new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}
