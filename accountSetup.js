function newAccount(email) {
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')"};
	getFileList(obj,'searchAccount');
}

function getFileList(obj,respFunction) {
	gapi.client.drive.files.list(obj).then(function(response) {
		window[respFunction(response)];
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

function searchAccount(response) {
	if(response.result.files.length===0) {
		console.log("Create new account in this drive.");
	}
	if(response.result.files.length===1) {
		console.log("Account may exist, lets look some more...");
		/*resourceData='';
		gapi.client.drive.files.list({
			q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",
			resource:resourceData;*/
		}).then(function(response) {
			
		}
	}
	if(response.result.files.length>1) {
		console.log("Hmmm.... now what?");
	}
}
