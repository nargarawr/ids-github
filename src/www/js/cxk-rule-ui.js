var systemRulesIndex = 0;
var systemRules = new Array();


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
    var tableRow = document.createElement("tr");
	var tableCol = document.createElement("td");

    for ( var key in inputDivs ) {
      	var tableCol = document.createElement("td");
      	tableCol.appendChild(document.createTextNode(inputDivs[key].varName));
      	tableRow.appendChild(tableCol)
    }

    for ( var key in outputDivs ) {
     	var tableCol = document.createElement("td");
      	tableCol.appendChild(document.createTextNode(outputDivs[key].varName));
      	tableRow.appendChild(tableCol)
    }
    
    table.appendChild(tableRow);
    d.appendChild(table);

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

	/*
		Get all the shit from IO
	*/

	systemRules.push(new systemRule(0,0,0,0))	
	printRules();

    // Hide modal
    $('#myRuleModal').modal('hide');
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