var systemRulesIndex = 0;
var systemRules = new Array();

/*
  Draws the UI elements necessary to create the rules
*/

function generateRules() {
    var d = document.getElementById("mainDivRules");

    for ( var key in inputDivs ) {
       d.appendChild(document.createTextNode(inputDivs[key].varName));
    }

    for ( var key in outputDivs ) {
      d.appendChild(document.createTextNode(outputDivs[key].varName));
    }
}

function addNewRule () {


}