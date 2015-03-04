var x = [];
var y = [];

var crx = [];
var cr1 = [];
var cr2 = [];
var cr3 = [];
var cr4 = [];

var r = 0;
var k = 0;

$(document).ready(function()
{
	$("#upfile").click(function() {
    $("#file").trigger('click');
	});
});

function changeLogIn(ip,user)
{
	$('#logon').fadeOut(300);
	$('#info').append().text(''+ip+' - '+user+' ');
	$('#loggedOn').fadeIn(300);
}

function changeLogOut()
{
	$('#loggedOn').fadeOut(300);
	$('#logon').fadeIn(300);
}

function createDocTree(dId,name)
{
	$('#treeList').append('<div class="docList" id='+dId+'><img alt="WebI Doc" src="/images/Folder.png">'+name+'</img></div>');
}

function createRepTree(dId,repId,name)
{
	$('#'+dId).append('<div class="repList" id='+repId+'><img class="imgpad" src="images/WebiDocument.png" alt='+repId+'>'+name+'</img></div>');
	$('.treeView').unmask();
	
	$(document).ready(function() {
		$('.repList').draggable({
			helper: 'clone'
		});
		droppable();
	});
}

function droppable(data)
{
	$('.circle').droppable({
		hoverClass:"select",
		drop:function(event,ui){
			if(document.getElementById('setSchedule').checked)
			{
				displaySched();
				return;
			}
			else
			{
				var repId = $(ui.draggable).attr('id');
				var dName = $(ui.draggable).text();
				var docId = $(ui.draggable).parent().attr('id');
				var box = $(this).parent();
				$(ui.draggable).clone().remove();
				$(this).remove();
				
				if(r == 1)
				{
					for(i=0;i<data.length/2;i++)
					{
						x[i]=data[i];
					}
					for(i=data.length/2;i<data.length;i++)
					{
						y[(i-data.length/2)]=parseInt(data[i]);
					}
					r=0;
				}
				
				if(document.getElementById('getParameter').checked)
				{
					getParameters(docId,repId,box);
				}
				else
				{
					if($(ui.draggable).hasClass('cryList'))
					{
						exportCrystalRep(repId,box);
					}
					else if($(ui.draggable).hasClass('repList'))
					{
						exportRep(docId,repId,box,dName);
					}
					else if($(ui.draggable).hasClass('CSVList'))
					{
						engineCSV(x,y,box);
					}
					else if($(ui.draggable).hasClass('customList'))
					{
						if (repId==1)
						{
							engineCSV(crx,cr1,box);
						}
						else if(repId==2)
						{
							engineCSV(crx,cr2,box);
						}
						else if(repId==3)
						{
							engineCSV(crx,cr3,box);
						}
						else if(repId==4)
						{
							engineCSV(crx,cr4,box);
						}
					}
				}
			}
	}});

}

function createCrystalTree(repId,name)
{
	$('#treeList').append('<div class="cryList" id="'+repId+'"><img class="imgpad" src="images/CrystalReportDocument.png" alt="'+repId+'">'+name+'</img></div>');

	$(document).ready(function () {
		$('.cryList').draggable({
			helper: 'clone'
		});
		droppable();
	});
}

function createCSVtree(data)
{
	$('#treeList').append('<div class="CSVList" id="csv"><img class="imgpad" src="images/CSVDocument.png" alt="csv">CSV Data</img></div>');
	
	$(document).ready(function () {
	$('.CSVList').draggable({
		helper: 'clone'
	});
	r=1;
	droppable(data);
	});
}

function createCustomTree()
{	
	$('#treeList').append('<div class="customList" id='+k+'><img class="imgpad" src="images/Custom.png" alt="custom">Custom Report '+k+'</img></div>');
	
	$(document).ready(function () {
	$('.customList').draggable({
		helper: 'clone'
	});
	
	droppable();
	});
}

function displayParam(param,docId,repId,box)
{
	$('#paramLabel').append(param);
	var paramBox = $('.paramPop');
	$(paramBox).fadeIn(300);
	
	var popMargTop = ($(paramBox).height()+24)/2;
	var popMargLeft = ($(paramBox).height()+24)/2;
	
	$(paramBox).css({
		'margin-top':-popMargTop,
		'margin-left':-popMargLeft
	});
	
	$('.submit').click(function(){
		var pValue = $('#paramValue').val();
		$(paramBox).fadeOut(300);
		$('#paramLabel').empty();
		refreshReport(pValue,docId,repId,box);
		$('.submit').unbind().click();
	});
}

function displaySched()
{
	var schedBox = $('.schedulePop');
	$(schedBox).fadeIn(300);
	
	var popMargTop = ($(schedBox).height()+24)/2;
	var popMargLeft = ($(schedBox).height()+24)/2;
	
	$('.submit1').click(function(){
		window.alert("Your schedule has successfully been submitted");
		$(schedBox).fadeOut(300);
		});
}

function createTable(xData,yData,box)
{
	var id = $(box).attr('id');
	
	var data = new google.visualization.DataTable();
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var table = new google.visualization.Table(document.getElementById(id));
	table.draw(data, {showRowNumber: true});
	$(box).unmask();

}

function createBarChart(xData,yData,box,dName)
{
	var id = $(box).attr('id');
	
	var data = new google.visualization.DataTable();
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var options = {
	  title: ''+dName+'',
	  legend: 'none',
	  hAxis: {title:''+xData[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+yData[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById(id));
	chart.draw(data, options);
	$(box).unmask();
}

function createPieChart(xData,yData,box,dName)
{
	var id = $(box).attr('id');
	
	var data = new google.visualization.DataTable();
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var options = {
	  title: ''+dName+'',
	  legend: 'none',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+yData[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.PieChart(document.getElementById(id));
	chart.draw(data, options);
	$(box).unmask()
}

function createGeoChart(xData,yData,box,dName)
{
	var id = $(box).attr('id');
	
	var data = new google.visualization.DataTable();
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var options = {
	  title: ''+dName+'',
	  region: 'CA',
	  resolution: 'provinces'
	};

	var chart = new google.visualization.GeoChart(document.getElementById(id));
	chart.draw(data, options);
	$(box).unmask()

}

function createEqualAnal(xData,yData)
{	
	crx = empty.concat(xData);
	if(k==0)
	{
		cr1 = empty.concat(yData);
	}
	else if(k==1)
	{
		cr2 = empty.concat(yData);
	}
	else if(k==2)
	{
		cr3 = empty.concat(yData);
	}
	else if(k==3)
	{
		cr4 = empty.concat(yData);
	}
	k++;
	
	$('#main_content').append('<div id="analView"></div>');

	var data = new google.visualization.DataTable();
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var options = {
	  title: 'Result',
	  legend: 'none',
	  hAxis: {title:''+xData[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+yData[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('analView'));
	chart.draw(data, options);
}

function createLineAnal(arrayx,array1,array2,array3,array4)
{
	$('#main_content').append('<div id="analView"></div>');
	
	var data = new google.visualization.DataTable();
	
	data.addColumn('string');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('number');
	
	data.addRows(arrayx.length);
	for(i=0;i<arrayx.length;i++)
	{
		data.setValue(i,0,arrayx[i+1]);
		data.setValue(i,1,array1[i+1]);
		data.setValue(i,2,array2[i+1]);
		data.setValue(i,3,array3[i+1]);
		data.setValue(i,4,array4[i+1]);
	}

	var options = {
	  title: 'Compare Mashup',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+array1[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.LineChart(document.getElementById('analView'));
	chart.draw(data, options);
}

function createComboAnal(arrayx,array1,array2,array3,array4)
{
	$('#main_content').append('<div id="analView"></div>');
	
	var data = new google.visualization.DataTable();
	
	data.addColumn('string');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('number');
	
	data.addRows(arrayx.length);
	for(i=0;i<arrayx.length;i++)
	{
		data.setValue(i,0,arrayx[i+1]);
		data.setValue(i,1,array1[i+1]);
		data.setValue(i,2,array2[i+1]);
		data.setValue(i,3,array3[i+1]);
		data.setValue(i,4,array4[i+1]);
	}

	var options = {
	  title: 'Combo Mashup',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+array1[0]+'',  titleTextStyle: {color: 'red'}},
	  seriesType: 'bars'
	};

	var chart = new google.visualization.ComboChart(document.getElementById('analView'));
	chart.draw(data, options);
}

function createExtendAnal(xData,yData)
{
	$('#main_content').append('<div id="analView"></div>');
	
	var data = new google.visualization.DataTable();
	
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var options = {
	  title: 'Extend Mashup',
	  legend: 'none',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+array1[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.LineChart(document.getElementById('analView'));
	chart.draw(data, options);
}

function createAverageAnal(xData,yData)
{
	crx = empty.concat(xData);
	if(k==0)
	{
		cr1 = empty.concat(yData);
	}
	else if(k==1)
	{
		cr2 = empty.concat(yData);
	}
	else if(k==2)
	{
		cr3 = empty.concat(yData);
	}
	else if(k==3)
	{
		cr4 = empty.concat(yData);
	}
	k++;

	$('#main_content').append('<div id="analView"></div>');
	
	var data = new google.visualization.DataTable();
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(xData.length-1);
	for(i=0;i<xData.length-1;i++)
	{
		data.setValue(i,0,xData[i+1]);
		data.setValue(i,1,yData[i+1]);
	}

	var options = {
	  title: 'Average Mashup',
	  legend: 'none',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+array1[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('analView'));
	chart.draw(data, options);
}

function createAnalBubble(ax,a1,a2,a3,a4)
{
	$('#main_content').append('<div id="analView"></div>');
	
	var data = new google.visualization.DataTable();

	data.addColumn('string');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('string');
	data.addColumn('number');
	
	data.addRows(arrayx.length);
	for(i=0;i<arrayx.length;i++)
	{
		data.setValue(i,0,ax[i+1]);
		data.setValue(i,1,a1[i+1]);
		data.setValue(i,2,a2[i+1]);
		data.setValue(i,3,a3[i+1]);
		data.setValue(i,4,a4[i+1]);
	}

	var options = {
	  title: 'Bubble Mashup',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+array1[0]+'',  titleTextStyle: {color: 'red'}},
	  seriesType: 'bars'
	};

	var chart = new google.visualization.BubbleChart(document.getElementById('analView'));
	chart.draw(data, options);
}

function createPercentAnal(ax,a1,a2,a3,a4)
{
	$('#main_content').append('<div id="analView"></div>');
	
	var data = new google.visualization.DataTable();
	
	data.addColumn('string');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('number');
	data.addColumn('number');
	
	data.addRows(arrayx.length);
	for(i=0;i<arrayx.length;i++)
	{
		data.setValue(i,0,ax[i+1]);
		data.setValue(i,1,a1[i+1]);
		data.setValue(i,2,a2[i+1]);
		data.setValue(i,3,a3[i+1]);
		data.setValue(i,4,a4[i+1]);
	}

	var options = {
	  title: 'Percent Mashup',
	  hAxis: {title:''+arrayx[0]+'', titleTextStyle: {color: 'blue'}},
	  vAxis: {title:''+array1[0]+'',  titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('analView'));
	chart.draw(data, options);
}