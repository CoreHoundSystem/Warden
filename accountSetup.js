function newAccount(email) {
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')"};
	getFileList(obj,'searchAccount');
}

function getFileList(obj,respFunction) {
	gapi.client.drive.files.list(obj).then(function(response) {
		window[respFunction](response);
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

function searchAccount(response) {
	console.log(response);
	parentIDs=response.result.files;
	console.log(parentIDs);
	if(response.result.files.length===0) {
		console.log("Create new account in this drive.");
	}
	if(response.result.files.length===1) {
		console.log("Account may exist, lets look some more...");
		resourceData='parents:'+parentIDs[0].id;
		obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",
			resourceData};
		getFileList(obj,'confirmSolo');
	}
	if(response.result.files.length>1) {
		console.log("Hmmm.... now what?");
		isolateTrueWarden(parentIDs);
	}
}

function confirmSolo(response) {
	if(response) {
		
	}
	console.log("Only the lonely");
}

function isolateTrueWarden(pID) {
	trueParent='';
	for(var i=0;i<pID.length;i++) {
		console.log(pID[i].id);
		console.log("Account may exist, lets look some more...");
		resourceData='parents:['+pID[i].id+']';
		obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",
			resourceData};
		gapi.client.drive.files.list(obj).then(function(response) {
			console.log(response.result);
		},
		function(err) { 
			console.error("Execute error",err);
		});
	}
}
