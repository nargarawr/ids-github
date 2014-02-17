/*
  cxk-io-ui.js
  Deals with loading and saving of files to the system
  Author: Craig Knott

  Functions:
  	strcmp ( str1, str2 );
    importFile (  );
    exportFile ( filetype );
*/


var globalFile;

/**
	Compares the two given strings

	@param {string}, first string
	@param {string}, second string
	@return {int}, 0 if equal
*/
function strcmp ( str1, str2 ) {
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

function importFile (  ) {

}

function createMFisFile () {
	var d = document.getElementById("mainDivExport");
	clearNode(d);
}

Node.prototype.appendText = function (string) {
	
	this.appendChild(document.createTextNode(string));
} 

Node.prototype.appendText = function (string, shouldBreak) {
	this.appendChild(document.createTextNode(string));
	if ( shouldBreak ) {
		this.appendChild(document.createElement("br"));	
	}
} 	

function createUFisFile () {

	


	



}

function createOJsnFile () {
	var d = document.getElementById("mainDivExport");
	clearNode(d);
}


function exportFile( filetype ){
	var d = document.getElementById("mainDivExport");
	clearNode(d);

	if ( strcmp("mfis", filetype ) == 0 ){

	} else if ( strcmp("ufis", filetype ) == 0 ){
		d.appendText("[System]", true)
		d.appendText("Name='" + ($("#fisName").val()) + "'", true);
		d.appendText("Type='" + ($("#fisType").val()).toLowerCase() + "'", true);
		d.appendText("Version=1.0", true);
		d.appendText("NumInputs=" + inputDivs.length, true);
		d.appendText("NumOutputs=" + outputDivs.length, true);
		d.appendText("NumRules=" + systemRules.length, true);
		d.appendText("AndMethod='" + ($("#fisAnd").val()).toLowerCase() + "'", true);
		d.appendText("OrMethod='" + ($("#fisOr").val()).toLowerCase() + "'", true);
		d.appendText("ImpMethod='" + ($("#fisImp").val()).toLowerCase() + "'", true);
		d.appendText("AggMethod='" + ($("#fisAgg").val()).toLowerCase() + "'", true);
		d.appendText("DefuzzMethod='" + ($("#fisDfz").val()).toLowerCase() + "'", true);
		d.appendText("", true);

		var i = 1;
		for ( var key in inputDivs ) {
			inputDivs[key].printVar(d, i, "ufis");
			d.appendText("", true);
			i++;
		}

		i = 1;
		for ( var key in outputDivs ) {
			outputDivs[key].printVar(d, i, "ufis");
			d.appendText("", true);
			i++;
		}

	} else if ( strcmp("ojsn", filetype ) == 0 ){

	}
}