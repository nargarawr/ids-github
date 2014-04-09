/*
  cxk-io-ui.js
  Deals with loading and saving of files to the system
  Author: Craig Knott

  Functions:
    allowDownload ( filetype ); 
  	strcmp ( str1, str2 );
    exportFile ( filetype );
    saveFile ( filetype ); 
    getExtension ( filename );
    loadFile ( evt );
    validateInput ( inputText );
    copyToClipboard ( );
    updateIOType( type );

*/

function allowDownload ( filetype ){
  $("#downloadData").removeAttr("disabled", null);
  $("#downloadData").css("pointer-events", "auto");
  $("#downloadData").addClass("btn-primary");
  $("#downloadData").text("Download as " + filetype)
}

$(document).ready(function() {
    document.getElementById('files').addEventListener('change', loadFile, false);
});

/**t
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
    Shiny.unbindAll()

   	var texts = document.getElementById('exportOutput');
   	texts.value = "";
   
	var d = document.getElementById("mainDivExport");
	clearNode(d);

	if ( strcmp("ufis", filetype ) == 0 || strcmp("mfis", filetype ) == 0 ){
		// System Parameters
		d.appendSpecialBreakText("[System]", true, true)
		d.appendSpecialBreakText("Name='" + ($("#fisName").val()) + "'", true, true);
		d.appendSpecialBreakText("Type='" + ($("#fisType").val()).toLowerCase() + "'", true, true);
		if ( strcmp("ufis", filetype ) == 0  ){
			d.appendSpecialBreakText("Version=1.0", true, true);	
		} else {
			d.appendSpecialBreakText("Version=2.0", true, true);
		}
		d.appendSpecialBreakText("NumInputs=" + getLength(true), true, true);
		d.appendSpecialBreakText("NumOutputs=" + getLength(false), true, true);
		d.appendSpecialBreakText("NumRules=" + systemRules.length, true, true);
		d.appendSpecialBreakText("AndMethod='" + ($("#fisAnd").val()).toLowerCase() + "'", true, true);
		d.appendSpecialBreakText("OrMethod='" + ($("#fisOr").val()).toLowerCase() + "'", true, true);
		d.appendSpecialBreakText("ImpMethod='" + ($("#fisImp").val()).toLowerCase() + "'", true, true);
		d.appendSpecialBreakText("AggMethod='" + ($("#fisAgg").val()).toLowerCase() + "'", true, true);
		d.appendSpecialBreakText("DefuzzMethod='" + ($("#fisDfz").val()).toLowerCase() + "'", true, true);
		d.appendSpecialBreakText("", true, true);

		// System Inputs
		var i = 1;
		for ( var key in inputDivs ) {
			var io = inputDivs[key].isInput ? "In" : "Out" ;
			d.appendSpecialBreakText("[" + io + "put" + i + "]", true, true);
			d.appendSpecialBreakText("Name='" + inputDivs[key].varName + "'", true, true);
			d.appendSpecialBreakText("Range=[" + inputDivs[key].rangeMin + " " + inputDivs[key].rangeMax + "]", true, true);
			d.appendSpecialBreakText("NumMFs=" + inputDivs[key].memFuncs.length, true, true);
			var j = 1;
			for ( var key2 in inputDivs[key].memFuncs ) {
				var t = inputDivs[key].memFuncs[key2];

				if ( t.funType === "gau" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'gaussmf',[" + t.paramSigma + " " + t.paramMean + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true, true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "ga2" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'gaussbmf',[" + t.paramLeftSigma + " " + t.paramLeftMean + " " + t.paramRightSigma + " " + t.paramRightMean + (filetype==="ufis" ? " " + t.paramHeight : "") +"]", true, true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "trp" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'trapmf',[" + t.paramLeftFoot + " " + t.paramLeftShoulder + " " + t.paramRightShoulder + " " + t.paramRightFoot + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true, true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "tri" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'trimf',[" + t.paramLeft + " " + t.paramMean + " " + t.paramRight + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true, true);	
				}					

				j++;
			}

			d.appendSpecialBreakText("", true, true);
			i++;
		}

		// System Outputs
		i = 1;
		for ( var key in outputDivs ) {
			var io = outputDivs[key].isoutput ? "In" : "Out" ;
			d.appendSpecialBreakText("[" + io + "put" + i + "]", true, true);
			d.appendSpecialBreakText("Name='" + outputDivs[key].varName + "'", true, true);
			d.appendSpecialBreakText("Range=[" + outputDivs[key].rangeMin + " " + outputDivs[key].rangeMax + "]", true, true);
			d.appendSpecialBreakText("NumMFs=" + outputDivs[key].memFuncs.length, true, true);
			var j = 1;
			for ( var key2 in outputDivs[key].memFuncs ) {
				var t = outputDivs[key].memFuncs[key2];

				if ( t.funType === "gau" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'gaussmf',[" + t.paramSigma + " " + t.paramMean + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true, true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "ga2" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'gaussbmf',[" + t.paramLeftSigma + " " + t.paramLeftMean + " " + t.paramRightSigma + " " + t.paramRightMean + (filetype==="ufis" ? " " + t.paramHeight : "") +"]", true, true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "trp" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'trapmf',[" + t.paramLeftFoot + " " + t.paramLeftShoulder + " " + t.paramRightShoulder + " " + t.paramRightFoot + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true, true);
				} else if ( inputDivs[key].memFuncs[key2].funType === "tri" ) {
					d.appendSpecialBreakText("MF" + j + "='" + t.funName + "':'trimf',[" + t.paramLeft + " " + t.paramMean + " " + t.paramRight + (filetype==="ufis" ? " " + t.paramHeight : "") + "]", true, true);	
				}					

				j++;
			}

			d.appendSpecialBreakText("", true, true);
			i++;
		}

		// System Rules
		if ( systemRules.length > 0) {
			d.appendSpecialBreakText("[Rules]", true, true);		
		}
		for ( var key in systemRules ) {
			var r = systemRules[key];

			var id = 0;
			for ( var inp in r.inputList ) {
				if ( r.inputList[inp].negated ) {
					d.appendSpecialBreakText("-", false, true);
				}
				d.appendSpecialBreakText(findMfInVar(inputDivs["inputDiv" + id], r.inputList[inp].rightEl), false, true);
				id++;
				if ( isLastKey (inp, r.inputList)) {
					d.appendSpecialBreakText(", ", false, true);		
				} else {
					d.appendSpecialBreakText(" ", false, true);		
				}
			}
			
			id = 0;
			for ( var oup in r.outputList ){
				if ( r.outputList[oup].negated ) {
					d.appendSpecialBreakText("-", false, true);
				}				
				d.appendSpecialBreakText(findMfInVar(outputDivs["outputDiv" + id], r.outputList[oup].rightEl), false, true);
				id++;
				if ( isLastKey (oup, r.outputList)) {
					d.appendSpecialBreakText(" ", false, true);		
				} 
			}

			d.appendSpecialBreakText("(" + r.weight + ")", false, true);

			if ( strcmp(r.connective, "AND") == 0 ) {
				d.appendSpecialBreakText(" : 1", true, true);
			} else if ( strcmp(r.connective, "OR") == 0 ) {
				d.appendSpecialBreakText(" : 2", true, true);		
			}
		}
		d.appendSpecialBreakText("\n",true, true);
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
					Term     : r.inputList[key2].rightEl,
					Negated  : r.inputList[key2].negated
				});
			}
			ruleOutputData = [];
			for ( var key2 in r.outputList ) {
				ruleOutputData.push({
					Variable : r.outputList[key2].leftEl,
					Term     : r.outputList[key2].rightEl,
					Negated  : r.outputList[key2].negated					
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

		d.appendSpecialBreakText(JSON.stringify(jsonData), false, true)		
	}

	Shiny.bindAll()
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
	
	var r = confirm("Doing this will overwrite any work you have completed already, is this ok?")
	if ( !r ) {
		return;
	}

	clearNode(document.getElementById('nameList'));
	clearNode(document.getElementById('list'));

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

		document.getElementById('nameList').innerHTML = '<li><strong>' + escape(f.name) + '</strong> - '
		+ f.size + ' bytes, last modified: ' + (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a') +
		'</li>';

		var reader = new FileReader();
		reader.onload = function ( e ) {
			var text = reader.result;
			switch ( ext.toLowerCase() ) {
				case 'fis':
					if ( loadFISFile(text) ) {
						document.getElementById('list').innerHTML = text.replace(/\n/g, "<br />");	
					}

					break;
				case 'json':
					if ( loadJSONFile(text) ) {
						document.getElementById('list').innerHTML = text.replace(/\n/g, "<br />");	
					}
					break;
			}
		}
		reader.readAsText(files[i]);	

		document.getElementById('list').innerHTML += '<ul>' + output.join('') + '</ul>';
	}	
}

/**
	Loads a fis file into the system

	@param {string}, the text to parse and check
*/
function loadFISFile ( txt ) {

	var name, type, andMethod, orMethod, aggMethod, impMethod, defMethod;

	var str = txt.split("\n");

	if ( !(new RegExp("\\[System\\]").test(str[0])) ) {
		alert("System tag is not present")
		return false;
	}

	var re = "Name='[a-zA-Z0-9 ]*'";
	if ( !(new RegExp(re).test(str[1])) ) {
		alert("Name tag is not present, or malformed")
		return false;
	}
	name = (str[1].split("'"))[1];
	
	if ( !(new RegExp("Type=\'mamdani\'").test(str[2])) ) {
		alert("Type tag is not present, or malformed")
		return false;
	}
	
	type = (str[2].split("'"))[1];
	type = type.charAt(0).toUpperCase() + type.slice(1);

	if ( !(new RegExp("AndMethod=\'(min|product)\'").test(str[7])) ) {
		alert("And Method tag is not present, or malformed")
		return false;
	}
	andMethod = (str[7].split("'"))[1];
	andMethod = andMethod.charAt(0).toUpperCase() + andMethod.slice(1);

	if ( !(new RegExp("OrMethod=\'(max|probor)\'").test(str[8])) ) {
		alert("Or Method tag is not present, or malformed")
		return false;
	}
	orMethod = (str[8].split("'"))[1];
	orMethod = orMethod.charAt(0).toUpperCase() + orMethod.slice(1);

	if ( !(new RegExp("ImpMethod=\'(min|product)\'").test(str[9])) ) {
		alert("Implication Method tag is not present, or malformed")
		return false;
	}
	impMethod = (str[9].split("'"))[1];
	impMethod = impMethod.charAt(0).toUpperCase() + impMethod.slice(1);
	
	if ( !(new RegExp("AggMethod=\'(max|probor|sum)\'").test(str[10])) ) {
		alert("Aggregation Method tag is not present, or malformed")
		return false;
	}
	aggMethod = (str[10].split("'"))[1];
	aggMethod = aggMethod.charAt(0).toUpperCase() + aggMethod.slice(1);

	if ( !(new RegExp("DefuzzMethod=\'(centroid|lom|mom|som|bisector)\'").test(str[11])) ) {
		alert("Defuzzification Method tag is not present, or malformed")
		return false;
	}
	defMethod = (str[11].split("'"))[1];
	defMethod = defMethod.charAt(0).toUpperCase() + defMethod.slice(1);

	$('#fisName').val(name)
	$('#fisType').val(type);
	$('#fisAnd').val(andMethod);
	$('#fisOr').val(orMethod);
	$('#fisImp').val(impMethod);
	$('#fisAgg').val(aggMethod);
	$('#fisDfz').val(defMethod);

	if ( !(new RegExp("NumInputs=\d*").test(str[4])) ) {
		alert("No input count defined")
		return false;
	}
	
	if ( !(new RegExp("NumOutputs=\d*").test(str[5])) ) {
		alert("No output count defined")
		return false;
	}

	if ( !(new RegExp("NumRules=\d*").test(str[6])) ) {
		alert("No rule count defined")
		return false;
	}

	inputDivs.length = 0;
	var myDiv = document.getElementById('mainDivInput');
	clearNode(myDiv)
	inputIndex = 0;
	var inputCount = parseInt((str[4].split("="))[1]);
    var breakDiv = document.createElement("div");
    breakDiv.className = "break";
    myDiv.appendChild(breakDiv);

	outputDivs.length = 0;
	var myDiv = document.getElementById('mainDivOutput');
	clearNode(myDiv)
	outputIndex = 0;
	var outputCount = parseInt((str[5].split("="))[1]);
	var breakDiv = document.createElement("div");
    breakDiv.className = "break";
    myDiv.appendChild(breakDiv);

	systemRules.length = 0;
	printRules ( ); 
	var ruleCount = parseInt((str[6].split("="))[1]);

	for ( var i = 13; i < str.length ; ){
		if ( new RegExp("\\[Input\\d+\\]").test(str[i]) ) {

			if ( !(new RegExp("Name=\'.*\'").test(str[i+1]))) {
				alert("A name tag is missing for one of your input variables")
				return false;
			}
			var inputName = (str[i+1].split("'"))[1];
			
			if ( !(new RegExp(/[Range=\[\d+\ \d+\]]+/).test(str[i+2]))) {
				alert("A range tag is missing or malformed for one of your input variables");
				return false;
			}
			var ranges = str[i+2].split(/[\s\[\]]+/)
			var minRange = ranges[1];
			var maxRange = ranges[2];

			if ( !(new RegExp(/[NumMFs=\d+]+/).test(str[i+3]))) {
				alert("A membership function count tag is missing or malformed for one of your input variables");
				return false;				
			}
			
			var mfCount = (str[i+3].split("="))[1];
			var mfList = new Array();

			for ( var j = 0 ; j < mfCount ; j++ ){
				if ( !(new RegExp(/[MF\d+=\'(\s|\S)*\':(\'gaussmf\',\[\-?\d+\.?\d* \-?\d+\.?\d* \-?\d+\.?\d*|\'gaussbmf\',\[\-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d*\]|\'trapmf\',\[\-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d*\]|\'trimf\',\[\-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d*)]+/).test(str[i+4+j]))) {
					alert("Membership function " + (j+1) + " of one of your variables is invalid")
					return false;
				}

				var str_params = str[i+4+j].split(/['|\[\]]/);
				var mf_name = str_params[1];
				var mf_type = str_params[3];
				var mf_params = str_params[5].split(/[\ ]/)
				
				if ( mf_type === "gaussmf") {
					mfList.push(new gauMemFun(mf_name, mf_params[0], mf_params[1], 1 ));
				} else if ( mf_type === "gaussbmf") {
					mfList.push(new gau2MemFun(mf_name, mf_params[0], mf_params[1], mf_params[2], mf_params[3],  1 ));
				} else if ( mf_type === "trapmf") {
					mfList.push(new trapMemFun(mf_name, mf_params[0], mf_params[1], mf_params[2], mf_params[3],  1  ));
				} else if ( mf_type === "trimf") {
					mfList.push(new triMemFun(mf_name, mf_params[0], mf_params[1], mf_params[2], 1 ));
				}				
			}

			var mainDiv = document.getElementById("mainDivInput")
			var sysVar = new systemVar(inputName, "inputDiv" + inputIndex, true);
    		inputIndex++;

		    mainDiv.appendChild(sysVar.createDiv());
		    inputDivs[sysVar.divId] = sysVar;  
		    inputDivs[sysVar.divId].rangeMin = minRange;
		    inputDivs[sysVar.divId].rangeMax = maxRange;

		    for ( var key in mfList ) {
				inputDivs[sysVar.divId].memFuncs.push(mfList[key])
		    }

			inputDivs[sysVar.divId].updateSmallView();		    
		} else if ( new RegExp("\\[Output\\d+\\]").test(str[i]) ) {
			if ( !(new RegExp("Name=\'.*\'").test(str[i+1]))) {
				alert("A name tag is missing for one of your input variables")
				return false;
			}
			var inputName = (str[i+1].split("'"))[1];
			
			if ( !(new RegExp(/[Range=\[\d+\ \d+\]]+/).test(str[i+2]))) {
				alert("A range tag is missing or malformed for one of your input variables");
				return false;
			}
			var ranges = str[i+2].split(/[\s\[\]]+/)
			var minRange = ranges[1];
			var maxRange = ranges[2];

			if ( !(new RegExp(/[NumMFs=\d+]+/).test(str[i+3]))) {
				alert("A membership function count tag is missing or malformed for one of your input variables");
				return false;				
			}
			
			var mfCount = (str[i+3].split("="))[1];
			var mfList = new Array();

			for ( var j = 0 ; j < mfCount ; j++ ){
				if ( !(new RegExp(/[MF\d+=\'(\s|\S)*\':(\'gaussmf\',\[\-?\d+\.?\d* \-?\d+\.?\d* \-?\d+\.?\d*|\'gaussbmf\',\[\-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d*\]|\'trapmf\',\[\-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d*\]|\'trimf\',\[\-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d* \-?\d*\.?\d*)]+/).test(str[i+4+j]))) {
					alert("Membership function " + (j+1) + " of one of your variables is invalid")
					return false;
				}

				var str_params = str[i+4+j].split(/['|\[\]]/);
				var mf_name = str_params[1];
				var mf_type = str_params[3];
				var mf_params = str_params[5].split(/[\ ]/)
				
				if ( mf_type === "gaussmf") {
					mfList.push(new gauMemFun(mf_name, mf_params[0], mf_params[1], 1 ));
				} else if ( mf_type === "gaussbmf") {
					mfList.push(new gau2MemFun(mf_name, mf_params[0], mf_params[1], mf_params[2], mf_params[3],  1 ));
				} else if ( mf_type === "trapmf") {
					mfList.push(new trapMemFun(mf_name, mf_params[0], mf_params[1], mf_params[2], mf_params[3],  1  ));
				} else if ( mf_type === "trimf") {
					mfList.push(new triMemFun(mf_name, mf_params[0], mf_params[1], mf_params[2], 1));
				}				
			}

			var mainDiv = document.getElementById("mainDivOutput")
			var sysVar = new systemVar(inputName, "outputDiv" + outputIndex, false);
    		outputIndex++;

		    mainDiv.appendChild(sysVar.createDiv());
		    outputDivs[sysVar.divId] = sysVar;  
		    outputDivs[sysVar.divId].rangeMin = minRange;
		    outputDivs[sysVar.divId].rangeMax = maxRange;

		    for ( var key in mfList ) {
				outputDivs[sysVar.divId].memFuncs.push(mfList[key])
		    }

			outputDivs[sysVar.divId].updateSmallView();		    
		} else if ( new RegExp("\\[Rules\\]").test(str[i]) ) {
			for ( var j = 1 ; j <= ruleCount ; j++ ){
				var regexp = "";

				for ( var iJ = 0 ; iJ < inputCount+outputCount ; iJ++ ){
					regexp += "\d+";
					if ( iJ == inputCount-1 ) {
						regexp += ", ";	
					} else {
						regexp += " ";
					}
				}
				
				regexp += "\(\d+\.?\d*\) : (1|2)"
				if ( !(new RegExp(regexp).test(str[i+j])) ) {
					var parts = str[i+j].split(/ \(|\) : /);

					var rule_inputs = new Array();
					var rule_outputs = new Array();

					var insAndOuts = parts[0];
					var lookingAtOutputs = false;

					
					for ( var ji=0; ji < insAndOuts.length; ji++ ) {
						var charAt = insAndOuts.substr( ji, 1 );
						if ( charAt == " " ) {
							continue;
						} else if (charAt == "," ) {
							lookingAtOutputs = true;
						} else if ( charAt == "-") {
							var twoChart = "-" + insAndOuts.substr( ji+1, 1 );
							if ( lookingAtOutputs ) {
								rule_outputs.push(twoChart)
							} else {
								rule_inputs.push(twoChart)
							}							
							ji++;
						} else {
							if ( lookingAtOutputs ) {
								rule_outputs.push(charAt)
							} else {
								rule_inputs.push(charAt)
							}
						}
					}

					var rule_weight = parts[1];
					var rule_conn   = parts[2];

				    var r1i = new Array;
				    var r1iDex = 0;
				    for ( var key in inputDivs ) {
				    	var p1 = inputDivs[key].divId;
				    	var p2 = "";
				    	var p3 = ( rule_inputs[r1iDex] < 0 );
				    	if ( rule_inputs[r1iDex] == 0 ) {
				    		p2 = "(Not Used)";
				    	} else {
				    		p2 =inputDivs[key].memFuncs[Math.abs(rule_inputs[r1iDex]-1)].funName;
				    	}
				    	
				    	r1i.push(new rulePair(p1,p2,p3))
				    	r1iDex++;
				    }

				    var r1o = new Array;
				    var r1oDex = 0;
				    for ( var key in outputDivs ) {
						var p1 = outputDivs[key].divId;
				    	var p2 = "";
				    	var p3 = ( rule_outputs[r1oDex] < 0 );
				    	if ( rule_outputs[r1oDex] == 0 ) {
				    		p2 = "(Not Used)";
				    	} else {
				    		p2 =outputDivs[key].memFuncs[Math.abs(rule_outputs[r1oDex]-1)].funName;
				    	}

				    	r1o.push(new rulePair(p1,p2,p3))
				    	r1oDex++;
				    }				    

				    var conn_str = "";
				    if ( rule_conn == 1 ) {
				    	conn_str = "AND";
				    } else if ( rule_conn == 2 ) {
						conn_str = "OR";
				    }
				    var sr = new systemRule(r1i, r1o, rule_weight, conn_str)
				    systemRules.push(sr);
				}
			}
		}
		i++;
	}

	updateSidePanelWithVars();
	return true;
}

/**
	Loads a json file into the system

	@param {string}, the text to parse and check
*/
function loadJSONFile ( txt ) {

}

/**
	Pseudo- copies to clipboard
*/
function copyToClipboard () {
	var expVal = (document.getElementById("mainDivExport").innerHTML).toString();
	expVal = expVal.replace(/<br>/g, '\n');
	window.prompt("To copy to clipboard, press Ctrl+C and then Enter", expVal);
}

/**
	Allows R-Shiny to access the type of file to save

	@param {string}, the file type 
*/
function updateIOType( type ) {
	Shiny.unbindAll()
	$("#iotypestore").val(type);
	Shiny.bindAll()
}