function newAccount(email) {
	window['user']={'email':email};
	console.log(user);
	promiseObject={w:0,u:0,e:0,eS:0};
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','w');
	obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','u');
	obj={q: "name = '" + user.email + "' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','e');
	obj={q: "name = '" + user.email + "' and (mimeType != 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','eS');
}

function getFileList(obj,respFunction,x) {
	gapi.client.drive.files.list(obj).then(function(response) {
		window[respFunction](response,x);
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

function checkAccount(response,x) {
	window[x]=response.result.files;
	promiseObject[x]=1;
	checkPromise();
}

function checkPromise() {
	if(promiseObject.w==1&&promiseObject.u==1&&promiseObject.e==1&&promiseObject.eS==1) {
		console.log("All lists gained.");
		console.log(w);
		console.log(u);
		console.log(e);
		console.log(eS);
		console.log(w.length);
		console.log(u.length);
		console.log(e.length);
		console.log(eS.length);
		verifyAccountStructure();
	}
}

function verifyAccountStructure() {
	if(eS.legnth==1) {
		window['eSKey']=eS[0].id;
		console.log(eS);
		for(var i=0;i<e.length;i++) {
			if(eS[0].parents[0]==e[i].id) {
				window['eKey']=e[i].id;
				console.log(eS,e);
				for(var j=0;j<u.length;j++) {
					if(e[i].parents[0]==u[j].id) {
						window['uKey']=u[j].id;
						console.log(eS,e,u);
						for(var k=0;k<w.length;k++) {
							if(u[j].parents[0]==w[k].id) {
								window['wKey']=w[k].id;
								console.log(eS,e,u,w);
							}
						}
					}
				}
			}
		}
	}
}
