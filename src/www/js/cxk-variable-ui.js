/*
  cxk-variable-ui.js
  Deals with all variable aspects of the system
  Author: Craig Knott

  Functions:
    getTotalMfCount ( input );
    checkValidity ( divId, isInput );
    compressDiv ( divId, isInput, shouldReset );
    resizeDivs ( topDivId, isInput );
    expandDiv( divId, isInput );
    deleteDiv( divId, isInput );
    addNewVar( isInput );
    swapToFront( keyToSwap, isInput );
    setCurrentDiv ( cd, b );
    getCurrentDiv ( );
    getIsInput ( );
    convertToTable ( memFuncs, divId, isInput );
*/

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
  Get the number of input or output membership functions
*/
function getTotalMfCount( input ){
    var total = 0;
    if ( input ) {
      for ( var key in inputDivs ) {
        total += inputDivs[key].memFuncs.length;
      }
    } else {
      for ( var key in outputDivs ) {
        total += outputDivs[key].memFuncs.length;
      }
    }

    return total;
}

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
