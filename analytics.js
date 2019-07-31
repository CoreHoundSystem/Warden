function sendEventToAnalytics(x,y,z) {
	gtag('event',y, {
		'event_category': x,
		'event_label': z
	});
}
