/*
  cxk-rule-ui.js
  Deals with all rule storage and display
  Author: Craig Knott

  Functions:
	$(document).ready(function();
		$('#myRuleModal').on('hidden', function ();
	checkVarsForRules ( );
	generateRuleUI ( );
	getConnective ( );
	isLastKey ( lkey, arr );
	isFirstKey ( lkey, arr );
	printRules ( ); 
	addNewRule ( isEditting ); 
	isNumber ( o );
	editRule ( );
	deleteRule ( );
	clearRuleErrors ( ); 
	updateWeight ( );
	validRuleWeight ( );
	resetRuleCreator ( );
*/

var edittingRule = false;
var edittingId = null;

var systemRulesIndex = 0;
var systemRules = new Array();

var connectiveColumns = new Array();

/**
	Functions to be called when the document has loaded
*/
$(document).ready(function() {
	/**
		Function to hide rule modal
	*/
	$('#myRuleModal').on('hidden', function () {
	    clearPopovers();
	    clearRuleErrors();
	});
});

/**
	Check that we have enough variables and membership functions to construct a rule
*/
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

/**
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

      	tableCol.appendChild(document.createTextNode(" ( "))

      	var cb = document.createElement("input");
    	cb.setAttribute("type", "checkbox");
    	cb.id = inputDivs[key].divId + "_cb";
    	tableCol.appendChild(cb);

    	tableCol.appendChild(document.createTextNode(" Not)"))
    }


    for ( var key in outputDivs ) {
     	var tableCol = document.createElement("td");
      	tableCol.appendChild(document.createTextNode(outputDivs[key].varName  + " is"));
      	tableHeadings.appendChild(tableCol)
      	tableHeadings.appendChild(document.createElement("td"));

      	tableCol.appendChild(document.createTextNode(" ( "))

      	var cb = document.createElement("input");
    	cb.setAttribute("type", "checkbox");
    	cb.id = outputDivs[key].divId + "_cb";
    	tableCol.appendChild(cb);

    	tableCol.appendChild(document.createTextNode(" Not)"))
    }
    
	table.appendChild(tableHeadings);

	var tableRow = document.createElement("tr");
	tableRow.appendChild(document.createElement("td"));
    for ( var key in inputDivs ) {
		var tableCol = document.createElement("td");

    	var sel = document.createElement("select")
    	sel.className = "thinSelectBox";
    	sel.id = "input" + key;
    	var opt = null;

    	for ( var key2 in inputDivs[key].memFuncs )  {
    		opt = document.createElement("option");
    		opt.value = "input" + key + "function" + key2;
    		opt.innerHTML = inputDivs[key].memFuncs[key2].funName;
    		sel.appendChild(opt);
    	}

    	var nullOpt = document.createElement("option");
    	nullOpt.value = "input" + key + "null";
    	nullOpt.innerHTML = "(Not used)";
    	sel.appendChild(nullOpt);

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
    	sel.id = "output" + key;
    	sel.className = "thinSelectBox";
    	for ( var key2 in outputDivs[key].memFuncs )  {
    		opt = document.createElement("option");
    		opt.value = "output" + key + "function" + key2;
    		opt.innerHTML = outputDivs[key].memFuncs[key2].funName;
    		sel.appendChild(opt);
    	}

    	var nullOpt = document.createElement("option");
    	nullOpt.value = "output" + key + "null";
    	nullOpt.innerHTML = "(Not used)";
    	sel.appendChild(nullOpt);

    	tableCol.appendChild(sel);
      	tableRow.appendChild(tableCol) 

    	var tableColConnective = document.createElement("td");
    	if ( !(isLastKey(key,outputDivs)) ) { 
    		tableColConnective.appendChild(document.createTextNode(getConnective()));
    		connectiveColumns.push(tableColConnective);
    	}
    	tableRow.appendChild(tableColConnective);

    }

    table.appendChild(tableRow);
    d.appendChild(table);
}

/**
	Get the currently selected connective
	@return {string}, the value of the selected connective
*/
function getConnective () {

	return ($('input[name=connective]:checked').val());
}

/**
	Checks whether the key specified is the last key in the given array

	@param {string}, the key to look for
	@param {array[a]}, some array to look through
	@return {boolean}, whether the key is the last element or not
*/
function isLastKey ( lkey, arr ) {
	var lastKey;
	for ( var key in arr ) {
		lastKey = key;
	}
	return ( lastKey === lkey );
}

/**
	Checks whether the key specified is the first key in the given array

	@param {string}, the key to look for
	@param {array[a]}, some array to look through
	@return {boolean}, whether the key is the last element or not
*/
function isFirstKey ( lkey, arr ) {
	for ( var key in arr ) {
		return ( key === lkey );
	}
}

/**
	Creates a list detailing all the rules of the system
*/
function printRules () {

	var d = document.getElementById("mainDivRule");

	while ( d.hasChildNodes() ) {
		while ( d.childNodes.length >= 1 ) {
			d.removeChild( d.firstChild );       
		} 
	}

	var table = document.createElement("table");

	for ( var key in systemRules ) {
		var trow = document.createElement("tr");	
		var tcol = document.createElement("td");

		tcol.appendChild(document.createTextNode("IF "));
		for ( var key2 in systemRules[key].inputList ) {
			var x = systemRules[key].inputList[key2];

			var ns ="";
			if (x.negated){
				ns = "NOT";
			} 

			if ( strcmp(x.rightEl,"(Not used)") == 0 ) {
			} else {
				if ( !isFirstKey ( key2, systemRules[key].inputList ) ) {
					tcol.appendChild(document.createTextNode(systemRules[key].connective + " "));
				}
				tcol.appendChild(document.createTextNode(inputDivs[x.leftEl].varName + " IS " + ns + " " + x.rightEl + " "));
			}
			
			if ( (isLastKey (key2, systemRules[key].inputList))) {
				tcol.appendChild(document.createTextNode("THEN "));
			}
		}

		for ( var key2 in systemRules[key].outputList ) {
			var x = systemRules[key].outputList[key2];

			var ns ="";
			if (x.negated){
				ns = "NOT";
			} 

			if ( !isFirstKey ( key2, systemRules[key].outputList ) ) {
				if ( strcmp (x.rightEl, "(Not used)") != 0) { 
					tcol.appendChild(document.createTextNode(systemRules[key].connective + " "));
				}
			}
			
			if ( strcmp(x.rightEl,"(Not used)") == 0 ) {
			} else {
				tcol.appendChild(document.createTextNode(outputDivs[x.leftEl].varName + " IS "  + ns + " " + x.rightEl + " "));
			}
		}

		tcol.appendChild(document.createTextNode("(" + systemRules[key].weight + ")"));			

		var tcol2 = document.createElement("td");
		var editButton = document.createElement("button");
		editButton.className = "btn btn-primary lowMarge";
		editButton.appendChild(document.createTextNode("Edit"));
		var s = "\""+ key +"\"";
		editButton.setAttribute("onclick", "editRule(" + s + ")");
		tcol2.appendChild(editButton);

		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger lowMarge";
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.setAttribute("onclick", "deleteRule(" + s + ")");
		tcol2.appendChild(deleteButton);

		trow.appendChild(tcol);
		trow.appendChild(tcol2);
		table.appendChild(trow);
	}

	d.appendChild(table);
}

/**
	Adds a new rule to the system

	@param {boolean}, whether this is a new rule, or we are editing an old one
*/
function addNewRule ( isEditting ) {
	if ( validRuleWeight() ) {
		var inputs = new Array();
		var outputs = new Array();

		for ( var key in inputDivs ) {
			var x = document.getElementById("input" + key);
			var selected = x.options[x.selectedIndex].text;
			var cbVal = document.getElementById(inputDivs[key].divId + "_cb").checked;			
			var p = new rulePair ( inputDivs[key].divId, selected, cbVal );
			inputs.push(p);		
		}
	
		for ( var key in outputDivs ) {
			var x = document.getElementById("output" + key);
			var selected = x.options[x.selectedIndex].text;
			var cbVal = document.getElementById(outputDivs[key].divId + "_cb").checked;
			var p = new rulePair ( outputDivs[key].divId, selected, cbVal );
			outputs.push(p);		
		}

		var weight = document.getElementById("weight_val").value;
		var conn = getConnective();
		if ( isEditting ) {
			systemRules.splice(edittingId, 1, new systemRule(inputs,outputs,weight,conn));
		} else {
			systemRules.push(new systemRule(inputs,outputs,weight,conn))		
		}
		
		printRules();
		edittingRule = false;
		edittingId = null;
	    $('#myRuleModal').modal('hide');
	}
	printRules();

	for ( var key in inputDivs ) {
    	document.getElementById(inputDivs[key].divId + "_cb").checked=false;
    }
	for ( var key in outputDivs ) {
    	document.getElementById(outputDivs[key].divId + "_cb").checked=false;
    }    
}

/**
	Checks whether the given value is a number or not

	@param {a}, some value to be checked
	@return {boolean}, whether this is a number or not
*/
function isNumber (o) {

  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}

/**
	Change an existing rule in the system

	@param {string}, the id of the rule to be edited
*/
function editRule ( ruleId ) {
	edittingRule = true;
	edittingId = ruleId;

	$('#myRuleModal').modal('show');

	for ( var key in systemRules[ruleId].inputList ) {
		var divId = systemRules[ruleId].inputList[key].leftEl;
		var funcName = systemRules[ruleId].inputList[key].rightEl;
		var x = getFuncNum( divId, funcName, true );
		if ( isNumber(x) ) {
			document.getElementById("input" + divId).value = "input" + divId + "function" + x;			
		} else {
			document.getElementById("input" + divId).value = "input" + divId + x;			
		}
	}
	
 	for ( var key in systemRules[ruleId].outputList ) {
		var divId = systemRules[ruleId].outputList[key].leftEl;
		var funcName = systemRules[ruleId].outputList[key].rightEl;
		var x = getFuncNum( divId, funcName, false );
		if ( isNumber(x) ) {
			document.getElementById("output" + divId).value = "output" + divId + "function" + x;			
		} else {
			document.getElementById("output" + divId).value = "output" + divId + x;			
		}	
	}   

	// Set connective
	if ( systemRules[ruleId].connective === "AND" ) {
		$('#cand').attr('checked','checked');
	} else {
		$('#cor').attr('checked','checked');	
	}

	// Set weight
	$('#weight_val').val(systemRules[ruleId].weight);
	$('#weight_val_selector').val(systemRules[ruleId].weight);

	for ( var key in systemRules[ruleId].inputList ) {
		if ( systemRules[ruleId].inputList[key].negated ) {
			document.getElementById(systemRules[ruleId].inputList[key].leftEl + "_cb").checked=true;	
		}
	}
	for ( var key in systemRules[ruleId].outputList ) {
		if ( systemRules[ruleId].outputList[key].negated ) {
			document.getElementById(systemRules[ruleId].outputList[key].leftEl + "_cb").checked=true;	
		}
	}
 
}

/**
	Delete a rule in the system

	@param {string}, the id of the rule to be deleted	
*/
function deleteRule ( ruleId ) {
	var r = confirm("This will permanently delete this rule, are you sure you wish to continue?")
	if ( r ) {    
		systemRules.splice(ruleId,1);
		printRules();
    }
}

/**
	Remove any displayed errors
*/
function clearRuleErrors () {
	
	document.getElementById("ruleCreatorErrorsDiv").innerHTML = "";
}

/**
	Sets the weight slider value to the entered value
*/
function updateWeight () {

	document.getElementById("weight_val").value = document.getElementById("weight_val_selector").value;
}

/**
	Checks whether the specified rule weight is valid

	@return {boolean}, whether the weight is valid or not
*/
function validRuleWeight () {
	var val = document.getElementById("weight_val").value;
	if ( val > 1 || val < 0 ) {   
		var errorMessage = "Weight must be between 0 and 1"; 
		document.getElementById("ruleCreatorErrorsDiv").innerHTML = 
		"<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button>" + errorMessage  +"</div>";

		document.getElementById("weight_val").value = 1;
		document.getElementById("weight_val_selector").value = 1;		
		return false;
	}	
	return true;
}

/**
	Resets values in the rule creator
*/
function resetRuleCreator () {
	document.getElementById("weight_val").value = 1;
	document.getElementById("weight_val_selector").value = 1;	
}




