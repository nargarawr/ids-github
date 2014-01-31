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
    
    var mfName = document.getElementById('inputFunName').value;

  // Error checking on parameters
  if ( mfName === "" ){
    alert("You have not entered a function name.");
    return;
  }


  // Check for duplicate names
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
    var vals;

    if ( opt == "gaussMF" ){
        mf.paramSigma = document.getElementById('inputSigma').value;  
        mf.paramMean = document.getElementById('inputMean').value;    
        mf.funType = "gau";

        vals = [mf.paramSigma, mf.paramMean, document.getElementById('inputHeight').value];
    } else if ( opt == "gaussbMF" ){
        mf.paramLeftSigma = document.getElementById('inputLSigma').value;  
        mf.paramLeftMean = document.getElementById('inputLMean').value;  
        mf.paramRightSigma = document.getElementById('inputRSigma').value;  
        mf.paramRightMean = document.getElementById('inputRMean').value;  
        mf.funType = "ga2";

        vals = [mf.paramLeftSigma, mf.paramLeftMean, mf.paramRightSigma, mf.paramRightMean, document.getElementById('inputHeight').value];
    } else if ( opt == "triMF" ){
        mf.paramLeft = document.getElementById('inputLeft').value;  
        mf.paramRight = document.getElementById('inputMean').value;  
        mf.paramMean = document.getElementById('inputRight').value;  
        mf.funType = "tri";

        vals = [mf.paramLeft, mf.paramMean, mf.paramRight, document.getElementById('inputHeight').value];
    } else if ( opt == "trapMF" ){
        mf.paramLeftFoot = document.getElementById('inputLFoot').value;  
        mf.paramLeftShoulder = document.getElementById('inputLShoulder').value;  
        mf.paramRightFoot = document.getElementById('inputRShoulder').value;  
        mf.paramRightShoulder = document.getElementById('inputRFoot').value;  
        mf.funType = "trp";

        vals = [mf.paramLeftFoot, mf.paramLeftShoulder,  mf.paramRightFoot, mf.paramRightShoulder, document.getElementById('inputHeight').value];
    } 
    mf.funName = document.getElementById('inputFunName').value;
    mf.paramHeight = document.getElementById('inputHeight').value;

      for (i = 0 ; i < vals.length; i++){
        if ( isNaN (vals[i]) || vals[i] === "") {
          alert("Some parameters were not numbers, or were blank");
          return;
        }       
      }

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