/*
  cxk-io-ui.js
  Deals with loading and saving of files to the system
  Author: Craig Knott

  Functions:
  	strcmp ( str1, str2 );
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

/**
	Prints the system in a variety of formats

	@param {string}, the format to print in (mfis, ufis, or ojsn)
*/
function exportFile( filetype ){
	var d = document.getElementById("mainDivExport");
	clearNode(d);

	if ( strcmp("mfis", filetype ) == 0 ){
	} else if ( strcmp("ufis", filetype ) == 0 ){
		// System Parameters
		d.appendText("[System]", true)
		d.appendText("Name='" + ($("#fisName").val()) + "'", true);
		d.appendText("Type='" + ($("#fisType").val()).toLowerCase() + "'", true);
		d.appendText("Version=1.0", true);
		d.appendText("NumInputs=" + getLength(true), true);
		d.appendText("NumOutputs=" + getLength(false), true);
		d.appendText("NumRules=" + systemRules.length, true);
		d.appendText("AndMethod='" + ($("#fisAnd").val()).toLowerCase() + "'", true);
		d.appendText("OrMethod='" + ($("#fisOr").val()).toLowerCase() + "'", true);
		d.appendText("ImpMethod='" + ($("#fisImp").val()).toLowerCase() + "'", true);
		d.appendText("AggMethod='" + ($("#fisAgg").val()).toLowerCase() + "'", true);
		d.appendText("DefuzzMethod='" + ($("#fisDfz").val()).toLowerCase() + "'", true);
		d.appendText("", true);

		// System Inputs
		var i = 1;
		for ( var key in inputDivs ) {
			inputDivs[key].printVar(d, i, "ufis");
			d.appendText("", true);
			i++;
		}

		// System Outputs
		i = 1;
		for ( var key in outputDivs ) {
			outputDivs[key].printVar(d, i, "ufis");
			d.appendText("", true);
			i++;
		}

		// System Rules
		d.appendText("[Rules]", true);
		for ( var key in systemRules ) {
			var r = systemRules[key];

			var id = 0;
			for ( var inp in r.inputList ) {
				d.appendText(findMfInVar(inputDivs["inputDiv" + id], r.inputList[inp].rightEl));
				id++;
				if ( isLastKey (inp, r.inputList)) {
					d.appendText(", ");		
				} else {
					d.appendText(" ");		
				}
			}
			
			id = 0;
			for ( var oup in r.outputList ){
				d.appendText(findMfInVar(outputDivs["outputDiv" + id], r.outputList[oup].rightEl));
				id++;
				if ( isLastKey (oup, r.outputList)) {
					d.appendText(" ");		
				} 
			}

			d.appendText("(" + r.weight + ")");

			if ( strcmp(r.connective, "AND") == 0 ) {
				d.appendText(" : 1", true);
			} else if ( strcmp(r.connective, "OR") == 0 ) {
				d.appendText(" : 2", true);		
			}
		}
	} else if ( strcmp("ojsn", filetype ) == 0 ){

	}
}
/*

{
    "System": {
        "Name": "",
        "Type": "",
        "Version": "",
        "NumInputs": "",
        "NumOutputs": "",
        "NumRules": "",
        "AndMethod": "",
        "OrMethod": "",
        "ImpMethod": "",
        "AggMethod": "",
        "DefuzzMethod": ""
    },
    "Inputs": [
        {
            "Name": "",
            "RangeMin": "",
            "RangeMax": "",
            "NumMFs": "",
            "MFs": [
                {
                    "Name": "",
                    "Type": "",
                    "Params": [
                        {
                            "P1": "",
                            "P2": "",
                            "P3": "",
                            "P4": "",
                            "P5": ""
                        }
                    ]
                }
            ]
        }
    ],
	"Outputs": [
        {
            "Name": "",
            "RangeMin": "",
            "RangeMax": "",
            "NumMFs": "",
            "MFs": [
                {
                    "Name": "",
                    "Type": "",
                    "Params": [
                        {
                            "P1": "",
                            "P2": "",
                            "P3": "",
                            "P4": "",
                            "P5": ""
                        }
                    ]
                }
            ]
        }
    ]
}*/