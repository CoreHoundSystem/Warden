function newAccount(email) {
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')"};
	getFileList('gapi.client.drive.files.list',obj,'searchAccount');
}

function getFileList(gapiClient,obj,respFunction) {
	window[gapiClient](obj).then(function(response) {
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
		getFileList('gapi.client.drive.files.list',obj,'confirmSolo');
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

function isolateTrueWarden(parentIDs) {
	trueParent='';
	pIDs=[];
	for(var i=0;i<parentIDs.length;i++) {
		console.log(parentIDs[i].id);
		pIDs.push(parentIDs[i].id);
	}
	obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",'fields':'*'};
	gapi.client.drive.files.list(obj).then(function(response) {
		console.log(obj);
		console.log(response);
		parents=response.result.files;
		for(var i=0;i<parents.length;i++) {
			console.log(parents[i].parents);
			if(pIDs.indexOf(parents[i].parents[0])!=-1) {
				console.log("MATCH!!");
			}
		}
	},
	function(err) { 
		console.error("Execute error",err);
	});
	

}
