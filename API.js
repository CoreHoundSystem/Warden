var CLIENT_ID = '14788876155-26tavl9ut4bmlncej9ce21a3tstrj1ca.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBFvl3ULZmidAM02q-8R_o5bUjWoSne37g';

var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4","https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest","https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest","https://www.googleapis.com/discovery/v1/apis/people/v1/rest","https://www.googleapis.com/discovery/v1/apis/drive/v3/rest","https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
//https://mybusiness.googleapis.com/$discovery/rest?version=v4
var SCOPES = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive https://mail.google.com/ https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/youtube";
//https://www.googleapis.com/auth/business.manage
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
		onSignIn();
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

function onSignIn() {
	/*
	gapi.client.gmail.users.getProfile({
		"userId":"me"
	}).then(function(response) {
		console.log("Email",response.result.emailAddress);
		userObject=response.result;
		console.log(userObject);
		newAccount(userObject.emailAddress);
	},
	function(err) { 
		console.error("Execute error",err);
	});
	*/
	obj={resourceName:'people/me',personFields:'addresses,ageRanges,biographies,birthdays,coverPhotos,emailAddresses,events,genders,imClients,interests,locales,memberships,metadata,names,nicknames,organizations,occupations,phoneNumbers,photos,relations,relationshipStatuses,residences,skills,urls,userDefined'};
	gapi.client.people.people.get(obj).then(function(response) {
		console.log(response);
		newAccount(response);
	},
	function(err) { 
		console.error("Execute error",err);
	})
}
