var server = "";
var uIP = "";

var logonToken, floatRE=/[0-9]+\.[0-9]+/, tokenRE=/"logonToken" type="string">(.+?)</;

function serverIP(ip)
{
	uIP = ip;
	server = "http://";
	server = server+ip+':6405';
	login(usr.value,pw.value);
}

function login(username,password) 
{
	console.log("Logging on to "+server);
	$.ajax({url: server + '/biprws/logon/long', type: 'POST', contentType: 'application/xml',
		dataType: 'xml',
		crossDomain: true,
		data: 	'<attrs xmlns="http://www.sap.com/rws/bip"><attr name="cms" type="string">localhost</attr>' +
				'<attr name="userName" type="string">'+username+'</attr><attr name="password" type="string">'+password+'</attr>' +
				'<attr name="auth" type="string" possibilities="secEnterprise,secLDAP,secWinAD">secEnterprise</attr></attrs>',
		complete: function(xhr, status) {
			if (status != 'error' && xhr.responseText) {
				logonToken = "\""+tokenRE.exec(xhr.responseText)[1].replace(/&amp;/g,'&')+"\"";
				console.log("Logon token: "+logonToken);
				window.alert("You have successfully logged into the server");
				changeLogIn(uIP,username);
			}
		},
		error: 		function(xhr, textStatus, errorThrown)	{ console.log("Error connecting to BOE server");	},
		success: 	function(xhr, textStatus, errorThrown)	{ console.log("Successfully logged on to BOE server");},
		beforeSend: function(xhr)							{ xhr.setRequestHeader("Access-Control-Allow-Origin", "*");}	
	});
}

function getDocs(){
	$('.treeView').mask("Loading...");
	$.ajax({url: server + '/biprws/raylight/v1/documents/', type: 'get',
		complete: function(xhr) {
			docObject = $.parseXML(xhr.responseText);
			parseDoc(docObject);
		},
		beforeSend: function(xhr) { 
			xhr.setRequestHeader('Accept', 'application/xml');
			xhr.setRequestHeader('X-SAP-LogonToken', logonToken);
			console.log("Requesting a complete list of documents");
		}
	});
}

function getReps(id){
	var docId = id;
	$.ajax({url: server + '/biprws/raylight/v1/documents/'+id+'/reports', type: 'get',
		complete: function(xhr) {
			repObject = $.parseXML(xhr.responseText);
			parseRep(repObject, id);
			},
		beforeSend: function(xhr) { 
			xhr.setRequestHeader('Accept', 'application/xml');
			xhr.setRequestHeader('X-SAP-LogonToken', logonToken);
			console.log("Requesting a complete list of documents");
		}
		});
	}

function exportRep(docId,repId,box,dName)
{
	var x = docId;
	var y = repId;
	console.log("Exporting");
	$(box).mask("Loading...");
	
	$.ajax({url: server + '/biprws/raylight/v1/documents/'+x+'/reports/'+y, type: 'get',
	complete: function(xhr) {
		parseData(xhr.responseText,box,dName);
		},
	beforeSend: function(xhr) { 
		xhr.setRequestHeader('Accept', 'text/xml');
		xhr.setRequestHeader('X-SAP-LogonToken', logonToken);
	}
	});
}
	
function exportCrystalRep(repId,box)
{
	console.log("Exporting");
	$(box).mask("Loading...");

	$.ajax({url: server + '/biprws/infostore/'+repId+'/rpt/export?mime_type=application/xml', type: 'get',
	complete: function(xhr) {
		parseCrystalData(xhr.responseText,box);
		},
	beforeSend: function(xhr) { 
		xhr.setRequestHeader('Accept','application/xml');
		xhr.setRequestHeader('X-SAP-LogonToken', logonToken);
	}
	});
}

function getParameters(docId,repId,box)
{
	$.ajax({url: server + '/biprws/raylight/v1/documents/' +docId+ '/parameters', type:'get',
	complete: function(xhr){
		parseParam(xhr.responseText,docId,repId,box)
		},
	beforeSend: function(xhr) { 
		xhr.setRequestHeader('Accept','application/xml');
		xhr.setRequestHeader('X-SAP-LogonToken', logonToken);
	}
});
}

function refreshReport(prompt,docId,repId,box)
{
	$(box).mask("Loading...");
	$.ajax({url: server + '/biprws/raylight/v1/documents/' + docId + '/parameters/', 
	type:'put',
	contentType:'application/xml',
	dataType:'xml',
	data:	'<parameters><parameter type="prompt"><id>0</id><answer type="text"><values><value>'+prompt+'</value></values></answer></parameter></parameters>',
	complete: function(xhr){
		exportRep(docId,repId,box);
		},
	beforeSend: function(xhr) { 
		xhr.setRequestHeader('Accept', 'application/xml');
		xhr.setRequestHeader('X-SAP-LogonToken', logonToken);
	}
	});	
}

function scheduleReport()
{
	$.ajax({url: server + '/biprws/raylight/v1/documents/'+docId+'/schedules/', type:'post',
	dataType:'xml',
	data:	'<schedule><name>'+sName+'</name><format type="' + format + ' /><destination><' + destination + '/></destination><' + freq + ' retriesAllowed="' + retries + '" retryIntervalInSeconds="' + intervals + '"><startdate>' + sDate + 'T' + sTime + '.000+02:00</startdate><enddate>' + eDate + 'T' + eTime + '.000+02:00</enddate></' + freq + '></schedule>',
	complete: function(xhr){
		window.alert("You have successfully scheduled your report");
		},
	});
}
