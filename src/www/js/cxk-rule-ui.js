var systemRulesIndex = 0;
var systemRules = new Array();

/*
  Draws the UI elements necessary to create the rules
*/

function generateRules() {
    var d = document.getElementById("mainDivRule");

    for ( var key in inputDivs ) {
       d.appendChild(document.createTextNode(inputDivs[key].varName));
    }

    for ( var key in outputDivs ) {
      d.appendChild(document.createTextNode(outputDivs[key].varName));
    }
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
		listItem.appendChild(document.createTextNode("test"));
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