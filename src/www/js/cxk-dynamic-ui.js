// Global variables to track the input variables
var inputIndex = 0;
var inputDivs = new Array();
var currentDiv = "";

/*

*/

/*
	Checks whether the specified variable is valid, returns an error code
*/
function checkValidity (divId) {
	var name = document.getElementById(divId + "_nameInput").value;
	var rmin = document.getElementById(divId + "_rminInput").value;
	var rmax = document.getElementById(divId + "_rmaxInput").value;

	if ( !name ) {
		// Name is missing
		return 1;	
	} else if ( !rmin || !rmax ){
		// A bound is missing/invalid
		return 2;	
	} else if ( rmin >= rmax ) {
		// Range is invalid
		return 3;		
	} else {
		// All good!
		return 0;
	}
}

/*
	Compresses the specified div, shrinking it in size and changing the content
*/
function compressDiv ( divId ) {
	var errorCode = checkValidity(divId);

	if ( errorCode == 0 ){
		inputDivs[divId].varName = document.getElementById(divId + "_nameInput").value;
		inputDivs[divId].rangeMin = document.getElementById(divId + "_rminInput").value;
		inputDivs[divId].rangeMax = document.getElementById(divId + "_rmaxInput").value;

		inputDivs[divId].resetContent();
		inputDivs[divId].getSmallContent();
		inputDivs[divId].div.className = "variable span3";
		inputDivs[divId].div.spanSize = "3";

		inputDivs[divId].notice.innerHTML = "";

		for ( var key in inputDivs ){
			swapToFront(key);
			break;
		}
	} else if (errorCode == 1){
		inputDivs[divId].notice.innerHTML = "<div class='alert alert-error'>" +
  												"<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
  												"<strong>Error!</strong> You have not entered a name for your variable" +
											"</div>";
	} else if (errorCode == 2){
		inputDivs[divId].notice.innerHTML = "<div class='alert alert-error'>" +
  												"<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
  												"<strong>Error!</strong> Your bounds are either missing, or not numbers" +
											"</div>";					
	} else if (errorCode == 3){
		inputDivs[divId].notice.innerHTML = "<div class='alert alert-error'>" +
  												"<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
  												"<strong>Error!</strong> Your bounds are invalid (is your maximum lower than your minimum?)" +
											"</div>";								
	}	
}

/*
	Compresses all divs, excluding the one at index /topDivId/
*/
function resizeDivs (topDivId) {
	// Reduce size of all divs except newly clicked
	for ( var key in inputDivs ) {
		if ( key !== topDivId && inputDivs[key].div.spanSize == "9" ) {
			compressDiv(key);
		}
	}
}

/*
	Expands the specified div, growing it in size and changing the content
*/
function expandDiv(divId){
	resizeDivs (divId);
	swapToFront(divId);

	inputDivs[divId].resetContent();
	inputDivs[divId].getBigContent();
	inputDivs[divId].div.className = "variable span9";
	inputDivs[divId].div.spanSize = "9";
}

/*
	Deletes the specified div, after giving a warning
*/
function deleteDiv(divId) {
	var r = confirm("This will permanently delete this variable, are you sure you wish to continue?")
	if (r==true) { 		
		for ( var key in inputDivs ) {
			if ( key === divId ) {
				delete inputDivs[key];
			}
		}

  		var myDiv = document.getElementById('mainDivInput');
  		myDiv.removeChild(document.getElementById(divId));
  	} 
}

/*
	Adds a new variable to the system
*/
function addNewVar(input){
	var mainDiv = document.getElementById("mainDivInput")

	var sysVar = new systemVar("Input Variable " + inputIndex, "inputDiv" + inputIndex, input);
	inputIndex++;

	mainDiv.appendChild(sysVar.createDiv());
	inputDivs[sysVar.divId] = sysVar;
}


/*
	Set the div at index /keyToSwap/ to be above all other divs
*/
function swapToFront(keyToSwap){
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

/*
	Generates a membership function from the input elements
*/
function createMembershipFunction( divId ) {
    var s = document.getElementById ( 'mfTypeSelect' );
    var opt = s.options[s.selectedIndex].value;
    var mfName = document.getElementById('inputFunName').value;
    var pHeight = document.getElementById('inputHeight').value;  
    var isNotUniqueName = false;

    alert(1);

    for ( var i = 0 ; i < inputDivs[divId].memFuncs.length ; i ++ ){       
        var mf = inputDivs[divId].memFuncs[i];
        if (mfName === mf.funName) {
            alert("Function names must be unique");
            return;
        }
    }
alert(2);
    if ( opt == "gaussMF" ){
        alert(3);
        var pSigma = document.getElementById('inputSigma').value;  
        var pMean = document.getElementById('inputMean').value;  
        var vals = [mfName, pSigma, pMean, pHeight];
        var errCode = errorsInFunction(vals);
alert(4);
	    if ( errCode === 1 ){
	          alert ( "You have not entered a function name." );
	    } else if ( errCode === 2 ) {
	          alert ( "Some parameters were not numbers, or were blank" );
	    } else {
            alert(5);
	          var mf = new gauMemFun (mfName, pSigma, pMean, pHeight);
          inputDivs[divId].memFuncs.push(mf);
          $('#myModal').modal('hide');
          inputDivs[divId].resetContent();
          inputDivs[divId].getBigContent();
	    }
    } else if ( opt == "gaussbMF" ){
        var pLSigma = document.getElementById('inputLSigma').value;  
        var pLMean = document.getElementById('inputLMean').value;  
        var pRSigma = document.getElementById('inputRSigma').value;  
        var pRMean = document.getElementById('inputRMean').value;  

        var vals = [mfName, pLSigma, pLMean, pRSigma, pRMean, pHeight];
        var errCode = errorsInFunction(vals);
	    if ( errCode === 1 ){
	          alert ( "You have not entered a function name." );
	    } else if ( errCode === 2 ) {
	          alert ( "Some parameters were not numbers, or were blank" );
	    } else {
          // No Errors
          var mf = new gau2MemFun (mfName, pLSigma, pLMean, pRSigma, pRMean, pHeight);
	      inputDivs[divId].memFuncs.push(mf);
          $('#myModal').modal('hide');
          inputDivs[divId].resetContent();
          inputDivs[divId].getBigContent();
        }
    } else if ( opt == "triMF" ){
        var pLeft = document.getElementById('inputLeft').value;  
        var pMean = document.getElementById('inputMean').value;  
        var pRight = document.getElementById('inputRight').value;  

        var vals = [mfName, pLeft, pMean, pRight, pHeight];
        var errCode = errorsInFunction(vals);
	    if ( errCode === 1 ){
	          alert ( "You have not entered a function name." );
	    } else if ( errCode === 2 ) {
	          alert ( "Some parameters were not numbers, or were blank" );
	    } else {
          // No Errors
          var mf = new triMemFun (mfName, pLeft, pMean, pRight, pHeight);
          inputDivs[divId].memFuncs.push(mf);
          $('#myModal').modal('hide');
          inputDivs[divId].resetContent();
          inputDivs[divId].getBigContent();
        }
    } else if ( opt == "trapMF" ){
        var pLFoot = document.getElementById('inputLFoot').value;  
        var pLShould = document.getElementById('inputLShoulder').value;  
        var pRShould = document.getElementById('inputRShoulder').value;  
        var pRFoot = document.getElementById('inputRFoot').value;  

        var vals = [mfName, pLFoot, pLShould, pRShould, pRFoot, pHeight];
        var errCode = errorsInFunction(vals);
	    if ( errCode === 1 ){
	          alert ( "You have not entered a function name." );
	    } else if ( errCode === 2 ) {
	          alert ( "Some parameters were not numbers, or were blank" );
	    } else {
          // No Errors
          var mf = new trapMemFun (mfName, pLFoot, pLShould, pRShould, pRFoot, pHeight);
          inputDivs[divId].memFuncs.push(mf);
          $('#myModal').modal('hide');
          inputDivs[divId].resetContent();
          inputDivs[divId].getBigContent();
        }
    }

}

/*
	Sets the current div, so we know where to store membership functions
*/
function setCurrentDiv (cd) {
	currentDiv = cd;
	alert(cd);
}
function getCurrentDiv ( ){
    return currentDiv;
}