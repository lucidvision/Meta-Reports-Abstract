var arrayx = [];
var arrayy = [];
var array1 = [];
var array2 = [];
var array3 = [];
var array4 = [];
var empty = [];
var j=0;
arrayx[0] = "Parameter";

function parseDoc(docObject)
{
	docId = $(docObject).find("id").map(function(){
		return $(this).text();
	}).get();
	
	name = $(docObject).find("name").map(function(){
		return $(this).text();
	}).get();
	
	for(var n=0;n<docId.length;n++)
	{
		createDocTree(docId[n],name[n]);
		getReps(docId[n]);
	}
}

function parseRep(repObject,docId)
{
	var repId = $(repObject).find("id").map(function(){
		return $(this).text();
	}).get();
	
	name = $(repObject).find("name").map(function(){
		return $(this).text();
	}).get();
	
	for(var i=0;i<repId.length;i++)
	{
		createRepTree(docId, repId[i],name[i]);
	}
}

function parseCrystal()
{
	createCrystalTree('7308','Cost Air 2011');
	createCrystalTree('7325','Cost Air');
	createCrystalTree('6429','Cost Earth');
	createCrystalTree('6440','Cost Fire');
	createCrystalTree('6450','Cost Water');
	createCrystalTree('7258','Features');
}

function parseData(response,box,dName)
{
	var x = [];
	var y = [];
	var first = [];
	
	var XML = $.parseXML(response);
	$dataArray = $(XML);
	
	$dataArray.find('td[c=0]').each(function(i)
	{
		x[i] = $(this).find('ct').text();
	});
	
	$dataArray.find('td[c=1]').each(function(i)
	{
		first[i] = $(this).find('ct').text();
	});
	
	$dataArray.find('td[c=1]').each(function(n)
	{
		var clean = $(this).find('ct').text();
		clean = parseInt(clean.replace('$','').replace(/\,/g,''));
		y[n] = clean;
	});
	
	y[0] = first[0];
	
	if(document.getElementById('getParameter').checked)
	{
		arrayx = arrayx.concat(x[1]);
	}
	else
	{
		arrayx = empty.concat(x);
	}
	
	if(j==0)
	{
		array1 = empty.concat(y);
	}
	else if(j==1)
	{
		array2 = empty.concat(y);
		
		if(document.getElementById('add').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]+array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('subtract').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]-array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('multiply').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]*array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('divide').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]/array2[i];
			}
			arrayy = empty.concat(array4);
		}
	}
	else if(j==2)
	{
		array3 = empty.concat(y);
		
		if(document.getElementById('add').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]+array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('subtract').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]-array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('multiply').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]*array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('divide').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]/array3[i];
			}
			arrayy = empty.concat(array1);
		}
	}
	else if(j==3)
	{
		array4 = empty.concat(y);
		
		if(document.getElementById('add').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]+array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('subtract').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]-array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('multiply').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]*array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('divide').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]/array4[i];
			}
			arrayy = empty.concat(array2);
		}
	}
	j++;
	
	if(document.getElementById('chartBar').checked)
	{
		createBarChart(x,y,box,dName);
	}
	else if(document.getElementById('chartPie').checked)
	{
		createPieChart(x,y,box,dName);
	}
	else if(document.getElementById('chartGeo').checked)
	{
		createGeoChart(x,y,box,dName);
	}
	else if(document.getElementById('chartTable').checked)
	{
		createTable(x,y,box);
	}
}

function parseCrystalData(response,box)
{
	var all = [];
	var x = [];
	var y = [];
	
	var XML = $.parseXML(response);
	$dataArray = $(XML);
	
	$dataArray.find('FormattedValue').each(function(i)
	{
		all[i] = $(this).text();
	});
	
	var u=0;
	for(n=0;n<all.length/2;n++)
	{
		x[n+1] = all[u];
		u=u+2;
	}
	
	var w=1;
	for(n=0;n<all.length/2;n++)
	{
		y[n+1] = parseInt(all[w].replace('$','').replace(/\,/g,''));
		w=w+2;
	}
	
	arrayx = empty.concat(x);
	if(j==0)
	{
		array1 = empty.concat(y);
	}
	else if(j==1)
	{
		array2 = empty.concat(y);
		
		if(document.getElementById('add').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]+array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('subtract').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]-array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('multiply').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]*array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('divide').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]/array2[i];
			}
			arrayy = empty.concat(array4);
		}
	}
	else if(j==2)
	{
		array3 = empty.concat(y);
		
		if(document.getElementById('add').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]+array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('subtract').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]-array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('multiply').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]*array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('divide').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]/array3[i];
			}
			arrayy = empty.concat(array1);
		}
	}
	else if(j==3)
	{
		array4 = empty.concat(y);
		
		if(document.getElementById('add').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]+array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('subtract').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]-array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('multiply').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]*array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('divide').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]/array4[i];
			}
			arrayy = empty.concat(array2);
		}
	}
	j++;
	
	if(document.getElementById('chartBar').checked)
	{
		createBarChart(x,y,box);
	}
	else if(document.getElementById('chartPie').checked)
	{
		createPieChart(x,y,box);
	}
	else if(document.getElementById('chartGeo').checked)
	{
		createGeoChart(x,y,box);
	}
	else if(document.getElementById('chartTable').checked)
	{
		createTable(x,y,box);
	}
}

function equal()
{
	createEqualAnal(arrayx,arrayy);
}

function lineAnalData()
{
	createLineAnal(arrayx,array1,array2,array3,array4);
}

function AnalData()
{
	var averageData = [];
	
	if(j==1)
	{
		for (i=1;i<arrayx.length;i++)
		{
			averageData[i] = (array1[i])/1
		}
		createAverageAnal(arrayx,averageData);
	}
	else if(j==2)
	{
		for (i=1;i<arrayx.length;i++)
		{
			averageData[i] = (array1[i]+array2[i])/2
		}
		createAverageAnal(arrayx,averageData);
	}
	else if(j==3)
	{
		for (i=1;i<arrayx.length;i++)
		{
		averageData[i] = (array1[i]+array2[i]+array3[i])/3
		}
		createAverageAnal(arrayx,averageData);
	}
	else if(j==4)
	{
		for (i=1;i<arrayx.length;i++)
		{
			averageData[i] = (array1[i]+array2[i]+array3[i]+array4[i])/4
		}
		createAverageAnal(arrayx,averageData);
	}
}

function extendAnalData()
{
	var extendXArray = [];
	var extendYArray = [];
	extendYArray = array1.concat(array2.splice(1,array2.length)).concat(array3.splice(1,array3.length)).concat(array4.splice(1,array4.length));
	
	if(document.getElementById('getParameter').checked)
	{
		createExtendAnal(arrayx,extendYArray);
	}
	else
	{
		extendXArray = extendXArray.concat(arrayx.splice(0,1)).concat(arrayx).concat(arrayx).concat(arrayx).concat(arrayx);
		createExtendAnal(extendXArray,extendYArray);
	}
}

function comboAnalData()
{
	createComboAnal(arrayx,array1,array2,array3,array4);
}

function analPercent()
{
	var e = [];
	var y = [];
	var z = [];
	
	for(i=0;i<arrayx.length;i++)
	{
		y[i] = (array2[i]-array1[i])/array1[i];
	}
	
	for(i=0;i<arrayx.length;i++)
	{
		z[i] = (array4[i]-array3[i])/array3[i];
	}
	createPercentAnal(arrayx,y,z,e,e);
}

function analBubble()
{
	var cat = ['Entity','Widget','Province','Province','Widget','Widget','Province','Province','Province','Province','Widget'];
	createAnalBubble(arrayx,array1,array2,cat,array3);
}

function startRead()
{ 
	var file = document.getElementById('file').files[0];
	if(file)
	{
		getAsText(file);
	}
}

function getAsText(readFile)
{
	var reader;
	try
	{
    reader = new FileReader();
	}catch(e)
	{
		window.alert("Error: seems File API is not supported on your browser");
		return;
	}  
	reader.readAsText(readFile, "UTF-8");
  
	reader.onload = loaded;
	reader.onerror = errorHandler;
}

function loaded(evt)
{
	var fileString = evt.target.result;
	parseCSV(fileString);
}

function errorHandler(evt)
{
  if(evt.target.error.code == evt.target.error.NOT_READABLE_ERR)
	{
		window.alert("Error Reading File");
	}
}

function parseCSV(data)
{
	csvArray = $.csv.toArray(data);
	createCSVtree(csvArray);
}

function engineCSV(xData,yData,box)
{
	arrayx = empty.concat(xData);
	if(j==0)
	{
		array1 = empty.concat(yData);
	}
	else if(j==1)
	{
		array2 = empty.concat(yData);
		
		if(document.getElementById('add').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]+array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('subtract').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]-array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('multiply').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]*array2[i];
			}
			arrayy = empty.concat(array4);
		}
		else if(document.getElementById('divide').checked)
		{
			for(i=1;i<array1.length;i++)
			{
				array4[i] = array1[i]/array2[i];
			}
			arrayy = empty.concat(array4);
		}
	}
	else if(j==2)
	{
		array3 = empty.concat(yData);
		
		if(document.getElementById('add').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]+array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('subtract').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]-array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('multiply').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]*array3[i];
			}
			arrayy = empty.concat(array1);
		}
		else if(document.getElementById('divide').checked)
		{
			array1.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array1[i] = array4[i]/array3[i];
			}
			arrayy = empty.concat(array1);
		}
	}
	else if(j==3)
	{
		array4 = empty.concat(yData);
		
		if(document.getElementById('add').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]+array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('subtract').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]-array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('multiply').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]*array4[i];
			}
			arrayy = empty.concat(array2);
		}
		else if(document.getElementById('divide').checked)
		{
			array2.length = 0;
			for(i=1;i<array4.length;i++)
			{
				array2[i] = array1[i]/array4[i];
			}
			arrayy = empty.concat(array2);
		}
	}
	j++;

	if(document.getElementById('chartBar').checked)
		{
			createBarChart(xData,yData,box);
		}
		else if(document.getElementById('chartPie').checked)
		{
			createPieChart(xData,yData,box);
		}
		else if(document.getElementById('chartGeo').checked)
		{
			createGeoChart(xData,yData,box);
		}
		else if(document.getElementById('chartTable').checked)
		{
			createTable(xData,yData,box);
		}
}

function parseParam(data,docId,repId,box)
{
	var XML = $.parseXML(data);
	$dataArray = $(XML);
	
	var x = $dataArray.find('name').text();
	displayParam(x,docId,repId,box);
}

function refresh()
{
	$('#analView').remove();
	$('.chart').remove();
	$('.chartView').append('<div class="chart" id="a"><div class="circle" id="1"></div></div><div class="chart" id="b"><div class="circle" id="2"></div></div><div class="chart" id="c"><div class="circle" id="3"></div></div><div class="chart" id="d"><div class="circle" id="4"></div></div>');
	arrayx.length = 0;
	array1.length = 0;
	array2.length = 0;
	array3.length = 0;
	array4.length = 0; 
	empty.length = 0;
	j=0;
	
	droppable();
}

function treeRefresh()
{
	$('.docList').remove();
	$('.repList').remove();
	$('.cryList').remove();
	$('.CSVList').remove();
	$('.customList').remove();
	crx.length = 0;
	cr1.length = 0;
	cr2.length = 0;
	cr3.length = 0;
	cr4.length = 0;
	x.length = 0;
	y.length = 0;
	k=0;
}