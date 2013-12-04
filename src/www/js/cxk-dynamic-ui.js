// Global variables to track the input variables
var inputIndex = 0;
var inputDivs = new Array();

var outputIndex = 0;
var outputDivs = new Array();

var currentIsInput;
var currentDiv = "";

var g_originalName;
var globali = 0;
var edit = false;


/*
	Checks whether the specified variable is valid, returns an error code
*/
function checkValidity (divId, isInput) {
  var s;
  if ( isInput ) {
    s = "Input";
  } else {
    s = "Output";
  }

  var name = document.getElementById(divId + "_name" + s).value;
  var rmin = document.getElementById(divId + "_rmin" + s).value;
  var rmax = document.getElementById(divId + "_rmax" + s).value;  
  
	if ( !name ) {
		// Name is missing
		return 1;	
	} else if ( !rmin || !rmax ){
		// A bound is missing/invalid
		return 2;	
	} else if ( rmin >= rmax ) {
		// Range is invalid
		return 3;	
  }
    
  var unique = true;
  for (var key in inputDivs){
    if (inputDivs[key].varName === name && key !== divId) {
      unique = false;
    }
  } 
  for (var key in outputDivs){
    if (outputDivs[key].varName === name && key !== divId) {
      unique = false;
    }
  } 
  if ( !unique ) {
    // Non-unique name
    return 4;
  }

	// All good!
  	return 0;
}


/*
	Compresses the specified div, shrinking it in size and changing the content
*/
function compressDiv ( divId, isInput, shouldReset ) {
	var errorCode = checkValidity(divId, isInput);
  var errorMessage;

	if ( errorCode == 0 ){
    if ( isInput ) {
      inputDivs[divId].varName = document.getElementById(divId + "_nameInput").value;
      inputDivs[divId].rangeMin = document.getElementById(divId + "_rminInput").value;
      inputDivs[divId].rangeMax = document.getElementById(divId + "_rmaxInput").value;

      if ( shouldReset ) {
        inputDivs[divId].resetContent();
        inputDivs[divId].getSmallContent();
        inputDivs[divId].div.className = "variable span3";
        inputDivs[divId].div.spanSize = "3";

        inputDivs[divId].notice.innerHTML = "";

        for ( var key in inputDivs ){
          swapToFront(key, isInput);
          break;
        }    
      }
      
    } else {
      outputDivs[divId].varName = document.getElementById(divId + "_nameOutput").value;
      outputDivs[divId].rangeMin = document.getElementById(divId + "_rminOutput").value;
      outputDivs[divId].rangeMax = document.getElementById(divId + "_rmaxOutput").value;

      if ( shouldReset ) {
        outputDivs[divId].resetContent();
        outputDivs[divId].getSmallContent();
        outputDivs[divId].div.className = "variable span3";
        outputDivs[divId].div.spanSize = "3";

        outputDivs[divId].notice.innerHTML = "";

        for ( var key in outputDivs ){
          swapToFront(key, isInput);
          break;
        }      
      }
    }
		
	} else if (errorCode == 1){
		errorMessage = "<strong>Oops!</strong> It looks like you have not entered a name for your variable";
	} else if (errorCode == 2){
		errorMessage =  "<strong>Oops!</strong> Your bounds appear to be missing, or not numbers";	
	} else if (errorCode == 3){
		errorMessage = "<strong>Oops!</strong> Your bounds are causing problems, is your maximum lower than your minimum?";						
	}	else if (errorCode == 4 ){
      errorMessage = "<strong>Oops!</strong> You've already given that name to one of your variables";          
  }
  errorMessage = "<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button>" + errorMessage + "</div>";

  if ( errorCode != 0 ){
    if ( isInput ){
      inputDivs[divId].notice.innerHTML = errorMessage;
    } else {
      outputDivs[divId].notice.innerHTML = errorMessage;
    }
  }

}

/*
	Compresses all divs, excluding the one at index /topDivId/
*/
function resizeDivs (topDivId, isInput) {
	// Reduce size of all divs except newly clicked
  if ( isInput ){
    for ( var key in inputDivs ) {
      if ( key !== topDivId && inputDivs[key].div.spanSize == "9" ) {
        compressDiv(key, isInput, true);
      }
    }  
  } else {
    for ( var key in outputDivs ) {
      if ( key !== topDivId && outputDivs[key].div.spanSize == "9" ) {
        compressDiv(key, isInput, true);
      }
    }      
  }
}

/*
	Expands the specified div, growing it in size and changing the content
*/
function expandDiv(divId, isInput){
	resizeDivs (divId, isInput);
	swapToFront(divId, isInput);

  if ( isInput ){
    inputDivs[divId].resetContent();
    inputDivs[divId].getBigContent();
    inputDivs[divId].div.className = "variable span9";
    inputDivs[divId].div.spanSize = "9";
  } else {
    outputDivs[divId].resetContent();
    outputDivs[divId].getBigContent();
    outputDivs[divId].div.className = "variable span9";
    outputDivs[divId].div.spanSize = "9";    
  }
}

/*
	Deletes the specified div, after giving a warning
*/
function deleteDiv(divId, isInput) {
	var r = confirm("This will permanently delete this variable, are you sure you wish to continue?")
	if (r==true) { 		
    if ( isInput ) {
      for ( var key in inputDivs ) {
        if ( key === divId ) {
          delete inputDivs[key];
        }
      }

      var myDiv = document.getElementById('mainDivInput');
      myDiv.removeChild(document.getElementById(divId));      
    } else {
      for ( var key in outputDivs ) {
        if ( key === divId ) {
          delete outputDivs[key];
        }
      }

      var myDiv = document.getElementById('mainDivOutput');
      myDiv.removeChild(document.getElementById(divId));            
    }
		
  } 
}

/*
	Adds a new variable to the system
*/
function addNewVar(isInput){
  if ( isInput ){
    var mainDiv = document.getElementById("mainDivInput")

    var sysVar = new systemVar("Input Variable " + inputIndex, "inputDiv" + inputIndex, isInput);
    inputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    inputDivs[sysVar.divId] = sysVar;  
  } else {
    var mainDiv = document.getElementById("mainDivOutput")

    var sysVar = new systemVar("Output Variable " + outputIndex, "outputDiv" + outputIndex, isInput);
    outputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    outputDivs[sysVar.divId] = sysVar;      
  }
}


/*
	Set the div at index /keyToSwap/ to be above all other divs
*/
function swapToFront(keyToSwap, isInput ){
  if ( isInput ) {
    var mainDiv = document.getElementById("mainDivInput");
    
    // Remove all current children
    var fc = mainDiv.firstChild;
    while( fc ) {
        mainDiv.removeChild( fc );
        fc = mainDiv.firstChild;
    }

    // Add necessary first, empty, div
    var breakDiv = document.createElement("div");
    breakDiv.className = "break";
    mainDiv.appendChild(breakDiv);

    mainDiv.appendChild(inputDivs[keyToSwap].div);
    for ( var key in inputDivs ) {
      if ( key !== keyToSwap ){
        mainDiv.appendChild(inputDivs[key].div);
      }
    }    
  } else {
    var mainDiv = document.getElementById("mainDivOutput");
    
    // Remove all current children
    var fc = mainDiv.firstChild;
    while( fc ) {
        mainDiv.removeChild( fc );
        fc = mainDiv.firstChild;
    }

    // Add necessary first, empty, div
    var breakDiv = document.createElement("div");
    breakDiv.className = "break";
    mainDiv.appendChild(breakDiv);

    mainDiv.appendChild(outputDivs[keyToSwap].div);
    for ( var key in outputDivs ) {
      if ( key !== keyToSwap ){
        mainDiv.appendChild(outputDivs[key].div);
      }
    }        
  }
  	
}

/*
	Updates the membership function creator based on the mf type selection
*/
function updateModal (selectionId) {
	var s = document.getElementById ( 'mfTypeSelect' );
	var opt = s.options[s.selectedIndex].value;

	var vo = document.getElementById ( "variableOptions" ) ;    
	if ( vo.hasChildNodes() ) {
		while ( vo.childNodes.length >= 1 ) {
			vo.removeChild( vo.firstChild );       
		} 
	}

	addElements ( vo, opt );
}

/*
	Adds the relevant input elements to the membership function creator
*/
function addElements ( id , mfType ){
    if ( mfType == "gaussMF" ) {
        var inputBox1 = document.createElement("input");
        inputBox1.id = "inputSigma";
        var inputBox2 = document.createElement("input");
        inputBox2.id = "inputMean";

        id.appendChild(document.createTextNode("Sigma"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox1);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Mean"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox2);
        id.appendChild((document.createElement("br")));      
    } else if ( mfType == "gaussbMF" ) {
        var inputBox1 = document.createElement("input");
        inputBox1.id = "inputLSigma";
        var inputBox2 = document.createElement("input");
        inputBox2.id = "inputLMean";
        var inputBox3 = document.createElement("input");
        inputBox3.id = "inputRSigma";
        var inputBox4 = document.createElement("input");
        inputBox4.id = "inputRMean";

        id.appendChild(document.createTextNode("Left Sigma"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox1);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Left Mean"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox2);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Right Sigma"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox3);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Right Mean"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox4);
        id.appendChild((document.createElement("br")));
    } else if ( mfType == "triMF" ) {
        var inputBox1 = document.createElement("input");
        inputBox1.id = "inputLeft";
        var inputBox2 = document.createElement("input");
        inputBox2.id = "inputMean";
        var inputBox3 = document.createElement("input");
        inputBox3.id = "inputRight";

        id.appendChild(document.createTextNode("Left"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox1);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Mean"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox2);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Right"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox3);
        id.appendChild((document.createElement("br")));
    } else if ( mfType == "trapMF" ) {
        var inputBox1 = document.createElement("input");
        inputBox1.id = "inputLFoot";
        var inputBox2 = document.createElement("input");
        inputBox2.id = "inputLShoulder";
        var inputBox3 = document.createElement("input");
        inputBox3.id = "inputRShoulder";
        var inputBox4 = document.createElement("input");
        inputBox4.id = "inputRFoot";

        id.appendChild(document.createTextNode("Left Foot"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox1);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Left Shoulder"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox2);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Right Shoulder"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox3);
        id.appendChild((document.createElement("br")));
        id.appendChild(document.createTextNode("Right Foot"));
        id.appendChild((document.createElement("br")));
        id.appendChild(inputBox4);
        id.appendChild((document.createElement("br")));
    } else {
        alert("Invalid option selected or option not yet supported");
    }  

      var inputBox5 = document.createElement("input");        
      inputBox5.id = "inputHeight";

      id.appendChild(document.createTextNode("Height"));  
      id.appendChild((document.createElement("br")));
      id.appendChild(inputBox5);
}

/*
	Checks for any errors in a given membership function
	code 0 - valid
	code 1 - no name
	code 2 - a parameter is blank / not a number
*/
function errorsInFunction (arr) {
      if ( arr[0] === "" ){
        return 1;
      }

      for (i = 1 ; i < arr.length; i++){
        if ( isNaN (arr[i]) || arr[i] === "") {
          return 2;  
        }       
      }

      return 0;
}

function overwriteMembershipFunction (divId, isInput, originalName) {
    // Get the entered values
    var vals;
    var mf;
    if ( isInput ){
      mf = inputDivs[divId].memFuncs[globali];
    } else {
      mf = outputDivs[divId].memFuncs[globali];
    }
    
    // Check for duplicate names
    var mfName = document.getElementById('inputFunName').value;

    if ( isInput ){
      for ( var i = 0 ; i < inputDivs[divId].memFuncs.length ; i ++ ){       
          var m = inputDivs[divId].memFuncs[i];
          if (mfName == m.funName && mfName != g_originalName) {
              alert("Function names must be unique");
              return;
          }
      }
    } else {
      for ( var i = 0 ; i < outputDivs[divId].memFuncs.length ; i ++ ){       
          var m = outputDivs[divId].memFuncs[i];
          if (mfName == m.funName && mfName != g_originalName) {
              alert("Function names must be unique");
              return;
          }
      }
    }

    var s = document.getElementById ( 'mfTypeSelect' );
    var opt = s.options[s.selectedIndex].value;

    if ( opt == "gaussMF" ){
        mf.paramSigma = document.getElementById('inputSigma').value;  
        mf.paramMean = document.getElementById('inputMean').value;          
        mf.funType = "gau";
    } else if ( opt == "gaussbMF" ){
        mf.paramLeftSigma = document.getElementById('inputLSigma').value;  
        mf.paramLeftMean = document.getElementById('inputLMean').value;  
        mf.paramRightSigma = document.getElementById('inputRSigma').value;  
        mf.paramRightMean = document.getElementById('inputRMean').value;  
        mf.funType = "ga2";
    } else if ( opt == "triMF" ){
        mf.paramLeft = document.getElementById('inputLeft').value;  
        mf.paramRight = document.getElementById('inputMean').value;  
        mf.paramMean = document.getElementById('inputRight').value;  
        mf.funType = "tri";
    } else if ( opt == "trapMF" ){
        mf.paramLeftFoot = document.getElementById('inputLFoot').value;  
        mf.paramLeftShoulder = document.getElementById('inputLShoulder').value;  
        mf.paramRightFoot = document.getElementById('inputRShoulder').value;  
        mf.paramRightShoulder = document.getElementById('inputRFoot').value;  
        mf.funType = "trp";
    } 
    mf.funName = document.getElementById('inputFunName').value;
    mf.paramHeight = document.getElementById('inputHeight').value;


  // Error checking on parameters



  // Refresh display
  if ( isInput ){
    inputDivs[divId].refreshMembershipFunctions();       
  } else {
    outputDivs[divId].refreshMembershipFunctions();
  }

  // Close modal
  $('#myModal').modal('hide');

  edit = false;
}


/*
	Generates a membership function from the input elements
*/
function createMembershipFunction( divId, isInput ) {

    if ( edit ) {
      overwriteMembershipFunction(divId, isInput, g_originalName);
      return;
    }

    var s = document.getElementById ( 'mfTypeSelect' );
    var opt = s.options[s.selectedIndex].value;
    var mfName = document.getElementById('inputFunName').value;
    var pHeight = document.getElementById('inputHeight').value;  
    var isNotUniqueName = false;

    // Check for unique names
    if ( isInput ){
      for ( var i = 0 ; i < inputDivs[divId].memFuncs.length ; i ++ ){       
          var mf = inputDivs[divId].memFuncs[i];
          if (mfName === mf.funName) {
              alert("Function names must be unique");
              return;
          }
      }
    } else {
      for ( var i = 0 ; i < outputDivs[divId].memFuncs.length ; i ++ ){       
          var mf = outputDivs[divId].memFuncs[i];
          if (mfName === mf.funName) {
              alert("Function names must be unique");
              return;
          }
      }
    }
    
    // Get the entered values
    var vals;
    if ( opt == "gaussMF" ){
        var pSigma = document.getElementById('inputSigma').value;  
        var pMean = document.getElementById('inputMean').value;  

        var vals = [mfName, pSigma, pMean, pHeight];   
    } else if ( opt == "gaussbMF" ){
        var pLSigma = document.getElementById('inputLSigma').value;  
        var pLMean = document.getElementById('inputLMean').value;  
        var pRSigma = document.getElementById('inputRSigma').value;  
        var pRMean = document.getElementById('inputRMean').value;  

        var vals = [mfName, pLSigma, pLMean, pRSigma, pRMean, pHeight];
    } else if ( opt == "triMF" ){
        var pLeft = document.getElementById('inputLeft').value;  
        var pMean = document.getElementById('inputMean').value;  
        var pRight = document.getElementById('inputRight').value;  

        var vals = [mfName, pLeft, pMean, pRight, pHeight];
    } else if ( opt == "trapMF" ){
        var pLFoot = document.getElementById('inputLFoot').value;  
        var pLShould = document.getElementById('inputLShoulder').value;  
        var pRShould = document.getElementById('inputRShoulder').value;  
        var pRFoot = document.getElementById('inputRFoot').value;  

        var vals = [mfName, pLFoot, pLShould, pRShould, pRFoot, pHeight];
    } 

    // Check for errors in the entered parameters
    var errCode = errorsInFunction(vals);
    if ( errCode === 1 ){
      alert ( "You have not entered a function name." );
      return;
    } else if ( errCode === 2 ) {
      alert ( "Some parameters were not numbers, or were blank" );
      return;
    } 

    // Create the membership function
    var mf;
    if ( opt == "gaussMF" ){
         var mf = new gauMemFun (mfName, pSigma, pMean, pHeight);
    } else if ( opt == "gaussbMF" ){
          var mf = new gau2MemFun (mfName, pLSigma, pLMean, pRSigma, pRMean, pHeight);
    } else if ( opt == "triMF" ){
          var mf = new triMemFun (mfName, pLeft, pMean, pRight, pHeight);
    } else if ( opt == "trapMF" ){
          var mf = new trapMemFun (mfName, pLFoot, pLShould, pRShould, pRFoot, pHeight);
    } 

    // Add to correct place, and refresh display
    if ( isInput ){
      inputDivs[divId].memFuncs.push(mf);
      inputDivs[divId].refreshMembershipFunctions();       
    } else {
      outputDivs[divId].memFuncs.push(mf);
      outputDivs[divId].refreshMembershipFunctions();
    }

    // Hide modal
    $('#myModal').modal('hide');
}


/*
	Sets the current div, so we know where to store membership functions
*/
function setCurrentDiv (cd, b) {
	currentDiv = cd;
  currentIsInput = b;
}

/*
  Gets the currently active div
*/
function getCurrentDiv ( ){
    return currentDiv;
}

/*
  Gets whether or not the current active div is an input variable or not
*/
function getIsInput (){ 
  return currentIsInput;
}


/*
  Prints the list of membership functions as a table
*/
function convertToTable ( memFuncs, divId, isInput ) {
  if ( memFuncs.length < 1 ) {
    return document.createElement("br");
  }
  var tbl = document.createElement("table");
  
  var tbl_header = document.createElement("tr");
  tbl.appendChild(tbl_header);
  var tbld = document.createElement("td");
    tbld.appendChild(document.createTextNode("Name"));
    tbl_header.appendChild(tbld);
  
  tbld = document.createElement("td");
    tbld.appendChild(document.createTextNode("Type"));
    tbl_header.appendChild(tbld);   

    tbld = document.createElement("td");
    tbl_header.appendChild(tbld);

    tbld = document.createElement("td");
    tbl_header.appendChild(tbld);
  
  for ( var i = 0 ; i < memFuncs.length ; i ++ ) {
    var sid = divId + "-tr" + i;
    var tbl_row = document.createElement("tr");
    tbl_row.setAttribute("id", sid);
    tbl.appendChild(tbl_row);
    
    tbld = document.createElement("td");
    tbld.appendChild(document.createTextNode(memFuncs[i].funName));
    tbl_row.appendChild(tbld);        

    tbld = document.createElement("td");
    tbld.appendChild(document.createTextNode(convertType(memFuncs[i].funType)));
    tbl_row.appendChild(tbld);            

    tbld = document.createElement("td");
    var editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));
    
    editButton.setAttribute("data-toggle","modal");
    editButton.setAttribute("href","#myModal");
    var s = i + ", \"" + divId +"\", " + isInput;
    editButton.setAttribute("onclick", "editMembershipFunction(" + s + ")");    
    tbld.appendChild(editButton);
    tbl_row.appendChild(tbld);  
    
    
    tbld = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    var s = i + ", \"" + divId +"\", " + isInput;
    deleteButton.setAttribute("onclick", "deleteMembershipFunction(" + s + ")");
    tbld.appendChild(deleteButton);
    tbl_row.appendChild(tbld);    
  }

  return tbl;
}

/*
  Deletes a membership function
*/
function deleteMembershipFunction ( i, divId, isInput ) {
  if ( isInput ) {
    (inputDivs[divId].memFuncs).splice(i, 1);
    inputDivs[divId].resetContent();
    inputDivs[divId].getBigContent();
  } else {
    (outputDivs[divId].memFuncs).splice(i, 1);
    outputDivs[divId].resetContent();
    outputDivs[divId].getBigContent();
  }
}

/*
  Converts the abbreviation type name to a full type name
*/
function convertType (type){
  if ( type === "gau" ){
    return "Gaussian";
  } else if (type === "ga2"){
    return "2-Part Gaussian";
  } else if ( type === "tri" ){
    return "Triangular";
  } else if ( type === "trp" ){
    return "Trapezoidal";
  }
}

/*
  Edits a membership function
*/
function editMembershipFunction (i, divId, isInput ){
  edit = true;
  globali = i;


  var type = inputDivs[divId].memFuncs[i].funType;
  var s = document.getElementById ( 'mfTypeSelect' );
  if ( type === "gau" ){
    s.selectedIndex = 0;
  } else if (type === "ga2"){
    s.selectedIndex = 1;
  } else if ( type === "tri" ){
    s.selectedIndex = 2;
  } else if ( type === "trp" ){
    s.selectedIndex = 3;
  }

  updateModal();
  var mf = inputDivs[divId].memFuncs[i];

  // Fill values, dependent on function type
  if ( type === "gau" ){
    document.getElementById("inputSigma").value = mf.paramSigma;
    document.getElementById("inputMean").value = mf.paramMean;
  } else if (type === "ga2"){
    document.getElementById("inputLSigma").value = mf.paramLeftSigma;
    document.getElementById("inputLMean").value = mf.paramLeftMean;
    document.getElementById("inputRSigma").value = mf.paramRightSigma;
    document.getElementById("inputRMean").value = mf.paramRightMean;
  } else if ( type === "tri" ){
    document.getElementById("inputLeft").value = mf.paramLeft;
    document.getElementById("inputRight").value = mf.paramRight;
    document.getElementById("inputMean").value = mf.paramMean;
  } else if ( type === "trp" ){
    document.getElementById("inputLFoot").value = mf.paramLeftFoot;
    document.getElementById("inputLShoulder").value = mf.paramLeftShoulder;
    document.getElementById("inputRFoot").value = mf.paramRightFoot;
    document.getElementById("inputRShoulder").value = mf.paramRightShoulder;
  }
    document.getElementById("inputFunName").value = mf.funName;
    document.getElementById("inputHeight").value = mf.paramHeight;

    g_originalName = mf.funName;
}


/*
  Function to clear any left over popovers
*/
function clearPopovers() {
    $("#inputVarHelpBtn").popover('hide');
    $("#outputVarHelpBtn").popover('hide');
    $("#mfcHelpBtn").popover('hide');
    $("#inputVarHelpBtn").html("Show Help");
    $("#outputVarHelpBtn").html("Show Help");
    $("#mfcHelpBtn").html("Show Help");
}
