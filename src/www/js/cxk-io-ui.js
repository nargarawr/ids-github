/*
  cxk-io-ui.js
  Deals with loading and saving of files to the system
  Author: Craig Knott

  Functions:
  	strcmp ( str1, str2 );
    exportFile ( filetype );
    saveFile ( filetype ); 
    getExtension ( filename );
    loadFile ( evt );
    validateInput ( inputText );
*/

$(document).ready(function() {
    document.getElementById('files').addEventListener('change', loadFile, false);
});

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
					d.appendText("MF" + i + "='" + t.funName + "':'gaussmf',[" + t.paramSigma + " " + t.paramMean + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "ga2" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'gaussbmf',[" + t.paramLeftSigma + " " + t.paramLeftMean + " " + t.paramRightSigma + " " + t.paramRightMean + " " + (filetype==="ufis" ? " " + t.paramHeight : "") +"]", true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "trp" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'trapmf',[" + t.paramLeftFoot + " " + t.paramLeftShoulder + " " + t.paramRightShoulder + " " + t.paramRightFoot + " " + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "tri" ) {
					d.appendText("MF" + i + "='" + t.funName + "':'trimf',[" + t.paramLeft + " " + t.paramMean + " " + t.paramRight + " " + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true);	
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
				Id:   key,
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
				Id:   key,
				Name: outputDivs[key].varName,
				Min:  outputDivs[key].rangeMin,
				Max:  outputDivs[key].rangeMax,
				Functions: mfDataMain
			});
			outputData.push(suboutputData);
		}

		ruleData = [];
		for ( var key in systemRules ) {
			var r = systemRules[key];

			ruleInputData  = [];
			for ( var key2 in r.inputList ) {
				ruleInputData.push({
					Variable : r.inputList[key2].leftEl,
					Term     : r.inputList[key2].rightEl
				});
			}
			ruleOutputData = [];
			for ( var key2 in r.outputList ) {
				ruleOutputData.push({
					Variable : r.outputList[key2].leftEl,
					Term     : r.outputList[key2].rightEl
				});
			}

			subRuleData = [];
			subRuleData.push({
				Inputs     : ruleInputData,
				Outputs    : ruleOutputData,
				Connective : r.connective,
				Weight     : r.weight
			});
			ruleData.push(subRuleData);
		}

		jsonData.push({
        	System:  systemData,
        	Inputs:  inputData,
        	Outputs: outputData,
        	Rules:   ruleData
    	});

		d.appendText(JSON.stringify(jsonData))		
	}

	saveFile (filetype);
}

/**
	Saves the system in a variety of formats

	@param {string}, the format to print in (mfis, ufis, or ojsn)
*/
function saveFile ( filetype ){
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		alert("In progress!")  		
	} else {
  		alert('Your browser does not allow for the saving and loading of files (yet)');
  	}
}

/**
	Get the extension of a file 

	@param {string}, the file name to check
	@return {string}, the file extension
*/
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

/**
	Loads a file from a local directory

	@param {event}, the file event that called this function
*/
function loadFile(evt) {
	var files = evt.target.files; 

	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var ext = getExtension(f.name);
		switch ( ext.toLowerCase() ) {
			case 'fis':
			case 'json':
				break;
			default: 
				alert("Unsupported file type. Please unpload a .fis or .json file");
				return;
		} 

		document.getElementById('list').innerHTML = '<li><strong>' + escape(f.name) + '</strong> - '
		+ f.size + ' bytes, last modified: ' + (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a') +
		'</li>';

		var reader = new FileReader();
		reader.onload = function ( e ) {
			var text = reader.result;
			if ( validateInput(text) ) {
				document.getElementById('list').innerHTML = text.replace(/\n/g, "<br />");	
			} else {
				alert("Invalid file.");
			}
		}
		reader.readAsText(files[i]);	
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

/**
	Checks a file for input validity

	@param {string}, input text to validate
*/
function validateInput ( inputText ) {
	var pattern = new RegExp("\[System\]\nName='[a-zA-Z0-9]*'\nType='[a-zA-Z]*'\nVersion=\d*\.\d*\nNumInputs=\d*\nNumOutputs=\d*\nNumRules=\d*\nAndMethod='[a-zA-Z]*'\nOrMethod='[a-zA-Z]*'\nImpMethod='[a-zA-Z]*'\nAggMethod='[a-zA-Z]*'\nDefuzzMethod='[a-zA-Z]*'\n\n(\[Input\d*\]\nName='[a-zA-Z0-9]*'\nRange=\[\d* \d*\]\nNumMFs=\d*\n(MF\d*='[a-zA-Z0-9]*':'(trimf|trapmf|gaussmf|gaussbmf)',\[((-|)\d*(\.|)\d*( |))*\]\n)*\n)*\[Output\d*\]\nName='[a-zA-Z0-9]*'\nRange=\[\d* \d*\]\nNumMFs=\d*\n(MF\d*='[a-zA-Z0-9]*':'(trimf|trapmf|gaussmf|gaussbmf)',\[((-|)\d*(\.|)\d*( |))*\]\n)*\n(\[Rules\]|)(\n|)(((\d*( |,))*\(\d*.\d*\) : \d)(\n|))*");
	var res = pattern.test(inputText);	

	return res;
}

/*
\[System\]\nName='[a-zA-Z0-9]*'\nType='[a-zA-Z]*'\nVersion=\d*\.\d*\nNumInputs=\d*\nNumOutputs=\d*\nNumRules=\d*\nAndMethod='[a-zA-Z]*'\nOrMethod='[a-zA-Z]*'\nImpMethod='[a-zA-Z]*'\nAggMethod='[a-zA-Z]*'\nDefuzzMethod='[a-zA-Z]*'\n\n(\[Input\d*\]\nName='[a-zA-Z0-9]*'\nRange=\[\d* \d*\]\nNumMFs=\d*\n(MF\d*='[a-zA-Z0-9]*':'(trimf|trapmf|gaussmf|gaussbmf)',\[((-|)\d*(\.|)\d*( |))*\]\n)*\n)*\[Output\d*\]\nName='[a-zA-Z0-9]*'\nRange=\[\d* \d*\]\nNumMFs=\d*\n(MF\d*='[a-zA-Z0-9]*':'(trimf|trapmf|gaussmf|gaussbmf)',\[((-|)\d*(\.|)\d*( |))*\]\n)*\n(\[Rules\]|)(\n|)(((\d*( |,))*\(\d*.\d*\) : \d)(\n|))*(\n|)
*/


