var systemRulesIndex = 0;
var systemRules = new Array();

var connectiveColumns = new Array();

$(document).ready(function() {
	$('#myRuleModal').on('hidden', function () {
	    clearPopovers();
	    clearRuleErrors();
	});
});

function checkVarsForRules () {

	var d = document.getElementById("errorRowRule");
	var errorMessage;

	var inputLength = 0;
	for ( var key in inputDivs ) {
       inputLength++;
    }

	var outputLength = 0;
	for ( var key in outputDivs ) {
       outputLength++;
    }

	var errorOccured;
	
	if ( inputLength < 1 ) {
		errorMessage = "You do not have enough input variables to construct a rule"
		errorOccured = true;
	} else if ( outputLength < 1 ) {
		errorMessage = "You do not have enough output variables to construct a rule"
		errorOccured = true;
	} else if ( getTotalMfCount(true) < 1 ) {
		errorMessage = "You do not have enough input membership functions to construct a rule"
		errorOccured = true;
	} else if ( getTotalMfCount(false) < 1 ) {
		errorMessage = "You do not have enough output membership functions to construct a rule"
		errorOccured = true;
	}

	if ( errorOccured ) {
		errorMessage = "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button>" + errorMessage + "</div>";
		d.innerHTML = errorMessage;
	} else {
		$('#myRuleModal').modal('show');	
		generateRuleUI();
	}	
}



/*
  Draws the UI elements necessary to create the rules
*/

function generateRuleUI() {
    var d = document.getElementById("ruleModalDiv");
	while ( d.hasChildNodes() ) {
			d.removeChild( d.firstChild );       
	}    

    var table = document.createElement("table");
    var tableHeadings = document.createElement("tr");
	var tableCol = document.createElement("td");

	tableCol.appendChild(document.createTextNode("IF"));
	tableHeadings.appendChild(tableCol);

    for ( var key in inputDivs ) {
      	var tableCol = document.createElement("td");
      	tableCol.appendChild(document.createTextNode(inputDivs[key].varName  + " is"));
      	tableHeadings.appendChild(tableCol)
      	tableHeadings.appendChild(document.createElement("td"));
    }

    for ( var key in outputDivs ) {
     	var tableCol = document.createElement("td");
      	tableCol.appendChild(document.createTextNode(outputDivs[key].varName  + " is"));
      	tableHeadings.appendChild(tableCol)
      	tableHeadings.appendChild(document.createElement("td"));
    }
    
	table.appendChild(tableHeadings);

	var tableRow = document.createElement("tr");
	tableRow.appendChild(document.createElement("td"));
    for ( var key in inputDivs ) {
    	var tableCol = document.createElement("td");
    	var sel = document.createElement("select")
    	sel.className = "thinSelectBox";
    	var opt = null;

    	for ( var key2 in inputDivs[key].memFuncs )  {
    		opt = document.createElement("option");
    		opt.value = "inputOption_" + inputDivs[key].memFuncs[key2].funName;
    		opt.innerHTML = inputDivs[key].memFuncs[key2].funName;
    		sel.appendChild(opt);
    	}

    	tableCol.appendChild(sel);
    	tableRow.appendChild(tableCol);
    	var tableColConnective = document.createElement("td");
    	if ( isLastKey(key,inputDivs) ) { 
    		tableColConnective.appendChild(document.createTextNode("THEN"));
    	} else {
    		tableColConnective.appendChild(document.createTextNode(getConnective()));
    		connectiveColumns.push(tableColConnective);
    	}
    	tableRow.appendChild(tableColConnective);
    }

    for ( var key in outputDivs ) {
    	var tableCol = document.createElement("td");
    	var sel = document.createElement("select");
    	sel.className = "thinSelectBox";
    	for ( var key2 in outputDivs[key].memFuncs )  {
    		opt = document.createElement("option");
    		opt.value = "outputOption_" + outputDivs[key].memFuncs[key2].funName;
    		opt.innerHTML = outputDivs[key].memFuncs[key2].funName;
    		sel.appendChild(opt);
    	}

    	tableCol.appendChild(sel);
      	tableRow.appendChild(tableCol)    		
    }

    table.appendChild(tableRow);
    d.appendChild(table);

}




function getConnective () {
	return ($('input[name=connective]:checked').val());
}

function isLastKey ( lkey, arr ) {
	var lastKey;
	for ( var key in arr ) {
		lastKey = key;
	}
	return ( lastKey === lkey );
}

/*
	Creates a list detailing all the rules of the system
*/

function printRules () {

	/*


		needs to have edit/delete buttons


	*/

	var d = document.getElementById("mainDivRule");

	while ( d.hasChildNodes() ) {
		while ( d.childNodes.length >= 1 ) {
			d.removeChild( d.firstChild );       
		} 
	}

	var list = document.createElement("ul");
	d.appendChild(list);

	for ( var key in systemRules ) {
		var listItem = document.createElement("li");
		// put rule info here
		listItem.appendChild(document.createTextNode("IF"));
		list.appendChild(listItem);
	}
}

/*
	Adds a new rule to the system
*/
function addNewRule () {
	if ( validRuleWeight() ) {
		/*
		Get all the shit from IO
		*/
		
		// Add the new rule, and display
		systemRules.push(new systemRule(0,0,0,0))	
		printRules();

	    // Hide modal
	    $('#myRuleModal').modal('hide');
	} 
}

/*
	Change an existing rule in the system
*/
function editrule () {
}

/*
	Delete a rule in the system
*/
function deleteRule () {


}

function clearRuleErrors () {
	document.getElementById("ruleCreatorErrorsDiv").innerHTML = "";
}

function updateWeight ( ) {
	document.getElementById("weight_val").value = document.getElementById("weight_val_selector").value;
}

function validRuleWeight () {
	var val = document.getElementById("weight_val").value;
	if ( val > 1 || val < 0 ) {   
		var errorMessage = "Weight must be between 0 and 1"; 
		document.getElementById("ruleCreatorErrorsDiv").innerHTML = 
		"<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button>" + errorMessage  +"</div>";

		document.getElementById("weight_val").value = 0.5;
		document.getElementById("weight_val_selector").value = 0.5;		
		return false;
	}	
	return true;
}


function resetWeight () {
	document.getElementById("weight_val").value = 0.5;
	document.getElementById("weight_val_selector").value = 0.5;	
}


