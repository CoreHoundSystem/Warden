$(function() {
	console.log("APIs loaded");
})
var CLIENT_ID = '14788876155-26tavl9ut4bmlncej9ce21a3tstrj1ca.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBFvl3ULZmidAM02q-8R_o5bUjWoSne37g';

var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4","https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest","https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest","https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly https://mail.google.com/ https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function initClient() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;	//alter buttons as needed - cosmetic
		signoutButton.onclick = handleSignoutClick;
	}, function(error) {
		appendPre(JSON.stringify(error, null, 2));
	});
}

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';		//handles the appearance of sign in/out buttons
		signoutButton.style.display = 'block';
		//do this on login....
		console.log("Loaded to normal point.");
		
		//listMajors();
	} else {
		authorizeButton.style.display = 'block';
		signoutButton.style.display = 'none';
	}
}

function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}
