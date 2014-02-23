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

	if ( strcmp("ufis", filetype ) == 0 || strcmp("mfis", filetype ) == 0 ){
		// System Parameters
		d.appendText("[System]", true)
		d.appendText("Name='" + ($("#fisName").val()) + "'", true);
		d.appendText("Type='" + ($("#fisType").val()).toLowerCase() + "'", true);
		if ( strcmp("ufis", filetype ) == 0  ){
			d.appendText("Version=1.0", true);	
		} else {
			d.appendText("Version=2.0", true);
		}
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
			var io = inputDivs[key].isInput ? "In" : "Out" ;
			d.appendText("[" + io + "put" + i + "]", true);
			d.appendText("Name='" + inputDivs[key].varName + "'", true);
			d.appendText("Range=[" + inputDivs[key].rangeMin + " " + inputDivs[key].rangeMax + "]", true);
			d.appendText("NumMFs=" + inputDivs[key].memFuncs.length, true);
			var j = 1;
			for ( var key2 in inputDivs[key].memFuncs ) {
				var t = inputDivs[key].memFuncs[key2];

				if ( t.funType === "gau" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'gaussmf',[" + t.paramSigma + " " + t.paramMean + " " + t.paramHeight + "]", true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "ga2" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'gaussbmf',[" + t.paramLeftSigma + " " + t.paramLeftMean + " " + t.paramRightSigma + " " + t.paramRightMean + " " + t.paramHeight +"]", true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "trp" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'trapmf',[" + t.paramLeftFoot + " " + t.paramLeftShoulder + " " + t.paramRightShoulder + " " + t.paramRightFoot + " " + t.paramHeight + "]", true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "tri" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'trimf',[" + t.paramLeft + " " + t.paramMean + " " + t.paramRight + " " + t.paramHeight + "]", true);	
				}					

				j++;
			}

			d.appendText("", true);
			i++;
		}

		
		// System Outputs
		i = 1;
		for ( var key in outputDivs ) {
			var io = outputDivs[key].isoutput ? "In" : "Out" ;
			d.appendText("[" + io + "put" + i + "]", true);
			d.appendText("Name='" + outputDivs[key].varName + "'", true);
			d.appendText("Range=[" + outputDivs[key].rangeMin + " " + outputDivs[key].rangeMax + "]", true);
			d.appendText("NumMFs=" + outputDivs[key].memFuncs.length, true);
			var j = 1;
			for ( var key2 in outputDivs[key].memFuncs ) {
				var t = outputDivs[key].memFuncs[key2];

				if ( t.funType === "gau" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'gaussmf',[" + t.paramSigma + " " + t.paramMean + " " + t.paramHeight + "]", true);
				} else if ( outputDivs[key].memFuncs[key2].funType === "ga2" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'gaussbmf',[" + t.paramLeftSigma + " " + t.paramLeftMean + " " + t.paramRightSigma + " " + t.paramRightMean + " " + t.paramHeight +"]", true);
				} else if ( outputDivs[key].memFuncs[key2].funType === "trp" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'trapmf',[" + t.paramLeftFoot + " " + t.paramLeftShoulder + " " + t.paramRightShoulder + " " + t.paramRightFoot + " " + t.paramHeight + "]", true);
				} else if ( outputDivs[key].memFuncs[key2].funType === "tri" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'trimf',[" + t.paramLeft + " " + t.paramMean + " " + t.paramRight + " " + t.paramHeight + "]", true);	
				}					

				j++;
			}

			d.appendText("", true);
			i++;
		}

		// System Rules
		if ( systemRules.length > 0) {
			d.appendText("[Rules]", true);		
		}
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
		var jsonData = [];
		var cName = "System"

		var systemData = [];
		systemData.push({
			Name: $("#fisName").val(),
			Type: $("#fisType").val(),
			Version: 1.0,
			NumInputs: getLength(true),
			NumOutputs: getLength(false),
			NumRules: systemRules.length,
			AndMethod:$("#fisAnd").val().toLowerCase(),
			OrMethod:$("#fisOr").val().toLowerCase(),
			ImpMethod:$("#fisImp").val().toLowerCase(),
			AggMethod:$("#fisAgg").val().toLowerCase(),
			DefuzzMethod:$("#fisDfz").val()	.toLowerCase()
		});
		
		inputData = [];
		for ( var key in inputDivs ) {
			var mfDataMain = [];
			for ( var key2 in inputDivs[key].memFuncs ) {
				var mfData = [];

				if ( inputDivs[key].memFuncs[key2].funType == "gau" ) {
					mfData.push({
						Name  : inputDivs[key].memFuncs[key2].funName,
						Type  : inputDivs[key].memFuncs[key2].funType,
						Sigma : inputDivs[key].memFuncs[key2].paramSigma,
						Mean  : inputDivs[key].memFuncs[key2].paramMean,
						Height: inputDivs[key].memFuncs[key2].paramHeight		
					});
				} else if ( inputDivs[key].memFuncs[key2].funType == "ga2" ) {
					mfData.push({
						Name       : inputDivs[key].memFuncs[key2].funName,
						Type       : inputDivs[key].memFuncs[key2].funType,						
						LeftSigma  : inputDivs[key].memFuncs[key2].paramLeftSigma,
						LeftMean   : inputDivs[key].memFuncs[key2].paramLeftMean,
						RightSigma : inputDivs[key].memFuncs[key2].paramRightSigma,
						RightMean  : inputDivs[key].memFuncs[key2].paramRightMean,
						Height: inputDivs[key].memFuncs[key2].paramHeight		
					});
				} else if ( inputDivs[key].memFuncs[key2].funType == "trp" ) {
					mfData.push({
						Name          : inputDivs[key].memFuncs[key2].funName,
						Type          : inputDivs[key].memFuncs[key2].funType,						
						LeftFoot      : inputDivs[key].memFuncs[key2].paramLeftFoot,
						LeftShoulder  : inputDivs[key].memFuncs[key2].paramLeftShoulder,
						RightShoulder : inputDivs[key].memFuncs[key2].paramRightShoulder,
						RightFoot     : inputDivs[key].memFuncs[key2].paramRightFoot,	
						Height: inputDivs[key].memFuncs[key2].paramHeight		
					});
				} else if ( inputDivs[key].memFuncs[key2].funType == "tri" ) {
					mfData.push({
						Name  : inputDivs[key].memFuncs[key2].funName,
						Type  : inputDivs[key].memFuncs[key2].funType,						
						Left  : inputDivs[key].memFuncs[key2].paramLeft,
						Mean  : inputDivs[key].memFuncs[key2].paramMean,
						Right : inputDivs[key].memFuncs[key2].paramRight,
						Height: inputDivs[key].memFuncs[key2].paramHeight						
					});
				}

				mfDataMain.push(mfData);
			}
		
			var subInputData = [];
			subInputData.push({
				Name: inputDivs[key].varName,
				Min:  inputDivs[key].rangeMin,
				Max:  inputDivs[key].rangeMax,
				Functions: mfDataMain
			});
			inputData.push(subInputData);
		}
		outputData = [];
		for ( var key in outputDivs ) {
			var mfDataMain = [];
			for ( var key2 in outputDivs[key].memFuncs ) {
				var mfData = [];

				if ( outputDivs[key].memFuncs[key2].funType == "gau" ) {
					mfData.push({
						Name  : outputDivs[key].memFuncs[key2].funName,
						Type  : outputDivs[key].memFuncs[key2].funType,
						Sigma : outputDivs[key].memFuncs[key2].paramSigma,
						Mean  : outputDivs[key].memFuncs[key2].paramMean,
						Height: outputDivs[key].memFuncs[key2].paramHeight		
					});
				} else if ( outputDivs[key].memFuncs[key2].funType == "ga2" ) {
					mfData.push({
						Name       : outputDivs[key].memFuncs[key2].funName,
						Type       : outputDivs[key].memFuncs[key2].funType,						
						LeftSigma  : outputDivs[key].memFuncs[key2].paramLeftSigma,
						LeftMean   : outputDivs[key].memFuncs[key2].paramLeftMean,
						RightSigma : outputDivs[key].memFuncs[key2].paramRightSigma,
						RightMean  : outputDivs[key].memFuncs[key2].paramRightMean,
						Height: outputDivs[key].memFuncs[key2].paramHeight		
					});
				} else if ( outputDivs[key].memFuncs[key2].funType == "trp" ) {
					mfData.push({
						Name          : outputDivs[key].memFuncs[key2].funName,
						Type          : outputDivs[key].memFuncs[key2].funType,						
						LeftFoot      : outputDivs[key].memFuncs[key2].paramLeftFoot,
						LeftShoulder  : outputDivs[key].memFuncs[key2].paramLeftShoulder,
						RightShoulder : outputDivs[key].memFuncs[key2].paramRightShoulder,
						RightFoot     : outputDivs[key].memFuncs[key2].paramRightFoot,	
						Height: outputDivs[key].memFuncs[key2].paramHeight		
					});
				} else if ( outputDivs[key].memFuncs[key2].funType == "tri" ) {
					mfData.push({
						Name  : outputDivs[key].memFuncs[key2].funName,
						Type  : outputDivs[key].memFuncs[key2].funType,						
						Left  : outputDivs[key].memFuncs[key2].paramLeft,
						Mean  : outputDivs[key].memFuncs[key2].paramMean,
						Right : outputDivs[key].memFuncs[key2].paramRight,
						Height: outputDivs[key].memFuncs[key2].paramHeight						
					});
				}

				mfDataMain.push(mfData);
			}
		
			var suboutputData = [];
			suboutputData.push({
				Name: outputDivs[key].varName,
				Min:  outputDivs[key].rangeMin,
				Max:  outputDivs[key].rangeMax,
				Functions: mfDataMain
			});
			outputData.push(suboutputData);
		}
		ruleData = [];

		jsonData.push({
        	System:  systemData,
        	Inputs:  inputData,
        	Outputs: outputData,
        	Rules:   ruleData
    	});

		console.log(jsonData);
		console.log(JSON.stringify(jsonData));
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