function newAccount(email) {
	window['USER_ID']=email;
	window['user']={};
	updateObject('email',email,'user');
	console.log(user);
	promiseObject={w:0,u:0,e:0,eS:0};
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,ownedByMe,isAppAuthorized,owners(me,permissionId,emailAddress,displayName))'};	
	getFileList(obj,'checkAccount','w');
	obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,ownedByMe,isAppAuthorized,owners(me,permissionId,emailAddress,displayName))'};	
	getFileList(obj,'checkAccount','u');
	obj={q: "name = '" + user.email + "' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,ownedByMe,isAppAuthorized,owners(me,permissionId,emailAddress,displayName))'};	
	getFileList(obj,'checkAccount','e');
	obj={q: "name = '" + user.email + "' and (mimeType != 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,ownedByMe,isAppAuthorized,owners(me,permissionId,emailAddress,displayName))'};	
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

function updateObject(key,value,object,save) {
	window[object][key]=value;
	if(save==1) {
		console.log(window[object]);
		if(object=='user') {
			obj={spreadsheetId:user.emailSheetKey,range:'A1',majorDimension:'ROWS',values:[[JSON.stringify(user)]],valueInputOption: 'RAW',fields:'*'};
			gapi.client.sheets.spreadsheets.values.update(obj).then(function(response) {
				console.log(response);
			})
		}
	}
}

function checkAccount(response,x) {
	window[x]=response.result.files;
	console.log(window[x]);
	promiseObject[x]=1;
	checkPromise();
}

function checkPromise() {
	if(promiseObject.w==1&&promiseObject.u==1&&promiseObject.e==1&&promiseObject.eS==1) {
		console.log("All lists gained.");
		verifyAccountStructure();
	}
}

function verifyAccountStructure() {
	tree=[];
	displayName=[];
	driveKey=[]
	for(var h=0;h<eS.length;h++) {
		for(var i=0;i<e.length;i++) {
			if(eS[h].parents[0]==e[i].id&&eS[h].trashed==false&&eS[h].ownedByMe==true&&eS[h].owners[0].emailAddress==user.email&&eS[h].isAppAuthorized==true&&e[i].trashed==false&&e[i].ownedByMe==true&&e[i].owners[0].emailAddress==user.email&&e[i].isAppAuthorized==true) {
				window['eSKey']=eS[h].id;
				window['eKey']=e[i].id;
				//console.log(eSKey,eKey);
				for(var j=0;j<u.length;j++) {
					if(e[i].parents[0]==u[j].id&&u[j].trashed==false&&u[j].ownedByMe==true&&u[j].owners[0].emailAddress==user.email&&u[j].isAppAuthorized==true&&e[i].trashed==false&&e[i].ownedByMe==true&&e[i].owners[0].emailAddress==user.email&&e[i].isAppAuthorized==true) {
						window['uKey']=u[j].id;
						//console.log(eSKey,eKey,uKey);
						for(var k=0;k<w.length;k++) {
							if(u[j].parents[0]==w[k].id&&u[j].trashed==false&&u[j].ownedByMe==true&&u[j].owners[0].emailAddress==user.email&&u[j].isAppAuthorized==true&&w[k].trashed==false&&w[k].ownedByMe==true&&w[k].owners[0].emailAddress==user.email&&w[k].isAppAuthorized==true) {
								window['wKey']=w[k].id;
								//console.log(eSKey,eKey,uKey,wKey);
								tree.push(eSKey + ' ' + eKey + ' ' + uKey + ' ' + wKey);
								displayName.push(w[k].owners[0].displayName);
								driveKey.push(w[k].parents[0]);
							}
						}
					}
				}
			}
		}
	}
	console.log(tree);
	//We have a problem if tree.length > 1
	if(tree.length===1) {
		updateObject('wardenFolderKey',wKey,'user');
		updateObject('usersFolderKey',uKey,'user');
		updateObject('emailFolderKey',eKey,'user');
		updateObject('emailSheetKey',eSKey,'user');
		updateObject('displayName',displayName[0],'user');
		updateObject('driveKey',driveKey[0],'user');
		obj={spreadsheetId:user.emailSheetKey,range:'Sheet1!A1'};
		gapi.client.sheets.spreadsheets.values.get(obj).then(function(response) {
			user=JSON.parse(response.result.values[0]);
			getContacts();
		})

		//pull values from email sheet a1 and compare to these values - if there is a match, use pulled values
		//if the pulled values do not match, update relevant values and save values then check subsequent values... as long as they match, great!!!
		//if subsequent values don't match, I don't know what to do...
	}
	if(tree.length===0) {
		console.log("Starting new account!");
		//create first folder
		obj={name:'Warden CRM',mimeType:'application/vnd.google-apps.folder',fields:'id,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName)'};
		gapi.client.drive.files.create(obj).then(function(response) {
			//update user
			updateObject('wardenFolderKey',response.result.id,'user');
			updateObject('driveKey',response.result.parents[0],'user');
			updateObject('displayName',response.result.owners[0].displayName,'user');
			//create second folder
			obj={name:'Users',mimeType:'application/vnd.google-apps.folder',parents:[response.result.id],fields:'id,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName)'};
			gapi.client.drive.files.create(obj).then(function(response) {
				//update user
				updateObject('usersFolderKey',response.result.id,'user');
				//create third folder
				obj={name:user.email,mimeType:'application/vnd.google-apps.folder',parents:[response.result.id],fields:'id,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName)'};
				gapi.client.drive.files.create(obj).then(function(response) {
					//update user
					updateObject('emailFolderKey',response.result.id,'user');
					//create email sheet
					obj={properties: {title: user.email},fields:'spreadsheetId'};
					gapi.client.sheets.spreadsheets.create(obj).then(function(response) {
						//update user
						updateObject('emailSheetKey',response.result.spreadsheetId,'user');
						//move email sheet
						obj={addParents:[user.emailFolderKey],removeParents:[user.driveKey],fileId:response.result.spreadsheetId,fields:''};
						gapi.client.drive.files.update(obj).then(function(response) {
							console.log(response);
							//update sheet
							obj={spreadsheetId:user.emailSheetKey,range:'A1',majorDimension:'ROWS',values:[[JSON.stringify(user)]],valueInputOption: 'RAW',fields:'*'};
							gapi.client.sheets.spreadsheets.values.update(obj).then(function(response) {
								console.log(response);
								//creation complete?
								sendEventToAnalytics('user','new',user.email);
								getContacts();
							})
						})
					})
				})
			})
		})
	}
}

function getContacts() {
	if('contactsSheetKey' in user) {
		obj={spreadsheetId:user.contactsSheetKey,range:'Sheet1!A:A'};
		gapi.client.sheets.spreadsheets.values.get(obj).then(function(response) {
			console.log(response);
			window['storedContacts']=response.result.values
			//JSON.parse(response.result.values)
			queryContacts();
		})
	} else {
		window['storedContacts']=[];
		queryContacts();
	}
}
	
function queryContacts() {
	console.log(storedContacts);
	conObj={resourceName:'people/me',pageSize: 2000,pageToken:'',personFields: 'addresses,ageRanges,biographies,birthdays,coverPhotos,emailAddresses,events,genders,imClients,interests,locales,memberships,metadata,names,nicknames,organizations,occupations,phoneNumbers,photos,relations,relationshipStatuses,residences,skills,urls,userDefined'};   
	if('contactsSyncToken' in user) {
		conObj.syncToken=user.contactsSyncToken;
		pullContacts(conObj);
	} else {
		conObj.requestSyncToken=true;
		if('contactsSheetKey' in user) {
			pullContacts(conObj);
		} else {
			obj={properties: {title: 'Contacts'},fields:'spreadsheetId'};
			gapi.client.sheets.spreadsheets.create(obj).then(function(response) {
				//update user
				updateObject('contactsSheetKey',response.result.spreadsheetId,'user',1);
				//move email sheet
				obj={addParents:[user.emailFolderKey],removeParents:[user.driveKey],fileId:response.result.spreadsheetId,fields:''};
				gapi.client.drive.files.update(obj).then(function(response) {
					console.log(response);
					pullContacts(conObj);
				})
			})
		}
	}
}

function pullContacts(obj) {
	gapi.client.people.people.connections.list(obj).then(function(response) {
		console.log(response);
		organizeContacts(response);
	})
}

function organizeContacts(response) {
	if('connections' in response.result) {
		updateObject('contactsSyncToken',response.result.nextSyncToken,'user',1);
		storedArray=[];			//0
		responseArray=[];		//0
		responseContacts=[];	//0
		tempStoredContacts=[];
		for(var i=0;i<storedContacts.length;i++) {
			tempStoredContacts.push(JSON.parse(storedContacts[i]));
		}
		console.log(tempStoredContacts);
		storedContacts=tempStoredContacts;
		console.log(storedContacts);
		for(var i=0;i<storedContacts.length;i++) {		//2
			if(storedContacts[i]!=null&&storedContacts[i]!='') {
				storedArray.push(storedContacts[i].resourceName)
			}
		}
		for(var i=0;i<response.result.connections.length;i++) {
			responseArray.push(response.result.connections[i].resourceName);
			responseContacts.push(response.result.connections[i]);
		}
		$.merge(storedContacts,responseContacts);
		for(var i=0;i<responseArray.length;i++) {
			if(storedArray.indexOf(responseArray[i])==-1) {
				storedArray.push(responseArray[i]);
			}
		}
		storedArray.sort();
		responseArray.sort();
		console.log(storedArray);
		myContacts=[];
		newContacts=[];
		for(var i=0;i<storedArray.length;i++) {
			thisContact='';
			if(i<storedArray.length) {
				for(var j=0;j<storedContacts.length;j++) {
					if(storedContacts[j].resourceName==storedArray[i]) {
						thisContact=storedContacts[j];
					}
				}
			}
			myContacts.push(thisContact);
			newContacts.push(JSON.stringify(thisContact));
		}
		console.log(newContacts);
		//update contacts sheet
		console.log(user.contactsSheetKey);
		obj={spreadsheetId:user.contactsSheetKey,range:'A:A',majorDimension:'COLUMNS',values:[newContacts],valueInputOption: 'RAW',fields:'*'};
		gapi.client.sheets.spreadsheets.values.update(obj).then(function(response) {
			console.log(response);
		})
	} else {
		console.log("No contact updates!");
	}
}
