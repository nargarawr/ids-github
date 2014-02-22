/*
  cxk-graphs.js
  Deals with drawing of graphs with GoogleCharts
  Author: Craig Knott

  Functions:
    checkParameters (inputValues);
 	calcGauVals( inputValues, min, max );
 	calcGauBVals( inputValues, min, max );
	calcTrapVals( inputValues, min, max );
	calcTriVals ( inputValues, min, max );
    drawChart();
    $('#mfTypeSelect').change(function();
*/


/**
  Checks whether all given parameters are numbers and not null

  @param {array[a]}, input values
  @return {boolean}, whether or not all values are valid or not 
*/
function checkParameters ( inputValues ) {
	for ( var key in inputValues ) {
		if ( !isNumber(inputValues[key]) ) {
			return false;
		}
	}
	return true;
}


/**
	Returns the values of the calculated gaussian curve

	@param {array[a]}, the input parameters
	@param {a}, numeric minimum
	@param {a}, numeric maximum
	@return {array[pair(a,b)]}, the plottable results of the function
*/
function calcGauVals( inputValues, min, max ){
	/*
		double[] values = new double[interval + 1];
		double sigma = mf.getParameter(0);
		double mean = mf.getParameter(1);
		double height = mf.getParameter(2);

		int j = 0;
		for (int i = (int) rangeMin; i <= (int) rangeMax; i++, j++) {
			values[j] = (height * Math.exp(-((Math.pow(i - mean, 2) / (2 * (Math.pow(sigma, 2)))))));
		}

		return values;
	*/

	var outputValues = new Array();

	var sigma  = inputValues[0];
	var mean   = inputValues[1]
	var height = inputValues[2]

	for ( var i = parseInt(min); i <= parseInt (max); i++) {
		var v = height * Math.pow(Math.E, ((-1) * ((Math.pow(i - mean, 2))/(2 * Math.pow(sigma, 2)))));
		outputValues.push(new pair(i, v));
	}

	return outputValues;
}

/**
	Returns the values of the calculated gaussian curve

	@param {array[a]}, the input parameters
	@param {a}, numeric minimum
	@param {a}, numeric maximum
	@return {array[pair(a,b)]}, the plottable results of the function
*/
function calcGauBVals( inputValues, min, max ){


}

/**
	Returns the values of the calculated gaussian curve

	@param {array[a]}, the input parameters
	@param {a}, numeric minimum
	@param {a}, numeric maximum
	@return {array[pair(a,b)]}, the plottable results of the function
*/
function calcTrapVals( inputValues, min, max ){


}

/**
	Returns the values of the calculated gaussian curve

	@param {array[a]}, the input parameters
	@param {a}, numeric minimum
	@param {a}, numeric maximum
	@return {array[pair(a,b)]}, the plottable results of the function
*/
function calcTriVals ( inputValues, min, max ){


}

/**
	Draws the relevant chart for the entered membership function
*/
function drawChart(  ) {

	var selectedDiv = getCurrentDiv();
	if(typeof inputDivs[selectedDiv] === 'undefined'){
   		return;
 	}

	var s = document.getElementById ( 'mfTypeSelect' );
	var mfType = s.options[s.selectedIndex].value;
		
	var minRange = inputDivs[selectedDiv].rangeMin;
	var maxRange = inputDivs[selectedDiv].rangeMax;

	if ( mfType == "gaussMF" ) {
		// Check all parameters
		var inputValues = new Array();
		inputValues.push(document.getElementById("inputSigma").value);
		inputValues.push(document.getElementById("inputMean").value);
		inputValues.push(document.getElementById("inputHeight").value);
		if ( !checkParameters(inputValues) ) {
			var  x = document.getElementById("chart_div");
			clearNode(x);
			return;
		}

		var plotPoints = calcGauVals(inputValues, minRange, maxRange);


		var data = new google.visualization.DataTable();
		data.addColumn('number', 'xVal');
		data.addColumn('number', 'Truth');		
		data.addRows(plotPoints.length);
		var i = 0;
		for ( var key in plotPoints ) {
			data.setCell(i, 0, plotPoints[key].leftEl);
			data.setCell(i, 1, plotPoints[key].rightEl);
			i++;
		}
		
		var funName = document.getElementById("inputFunName").value;
    	var options = { title: funName };        

		var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    	chart.draw(data, options);	

    } else if ( mfType == "gaussbMF" ) {
    	// Check all parameters
		var inputValues = new Array();
		inputValues.push(document.getElementById("inputLSigma").value);
		inputValues.push(document.getElementById("inputLMean").value);
		inputValues.push(document.getElementById("inputRSigma").value);
		inputValues.push(document.getElementById("inputRMean").value);
		inputValues.push(document.getElementById("inputHeight").value);
		if ( !checkParameters(inputValues) ) {
			var  x = document.getElementById("chart_div");
			clearNode(x);
			return;
		}

    } else if ( mfType == "triMF" ) {
    	// Check all parameters
		var inputValues = new Array();
        inputValues.push(document.getElementById("inputLeft").value);
        inputValues.push(document.getElementById("inputMean").value);
        inputValues.push(document.getElementById("inputRight").value);
        inputValues.push(document.getElementById("inputHeight").value);
        if ( !checkParameters(inputValues) ) {
			var  x = document.getElementById("chart_div");
			clearNode(x);
			return;
		}

    } else if ( mfType == "trapMF" ) {
    	// Check all parameters
		var inputValues = new Array();
        inputValues.push(document.getElementById("inputLFoot").value);
        inputValues.push(document.getElementById("inputLShoulder").value);
        inputValues.push(document.getElementById("inputRShoulder").value);
        inputValues.push(document.getElementById("inputRFoot").value);
        inputValues.push(document.getElementById("inputHeight").value);
        if ( !checkParameters(inputValues) ) {
			var  x = document.getElementById("chart_div");
			clearNode(x);
			return;
		}

    }

/*
	    var data = google.visualization.arrayToDataTable([
			['Value', 'Truth'],
			[1,1],
			[2,2]
		]);

*/

}

$(function() {
    $('#mfTypeSelect').change(function() {
        drawChart();
    });    
});
