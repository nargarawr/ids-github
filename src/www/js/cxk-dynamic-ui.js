
/*
  Function to clear any left over popovers
*/
function clearPopovers() {
    $("#inputVarHelpBtn").popover('hide');
    $("#outputVarHelpBtn").popover('hide');
    $("#mfcHelpBtn").popover('hide');
    $("#ruleHelpBtn").popover('hide');
    $("#rulecHelpBtn").popover('hide');

    $("#inputVarHelpBtn").html("Show Help");
    $("#outputVarHelpBtn").html("Show Help");
    $("#mfcHelpBtn").html("Show Help");
    $("#ruleHelpBtn").html("Show Help");
    $("#rulecHelpBtn").html("Show Help")
}

/*
  Ran each time a new tab is selected, takes the tab selected as argument
*/
function onTabChange ( tabIndex ) {
  var d = document.getElementById("errorRowRule");
  d.innerHTML = "";
  /*
  alert(tabIndex);
  if ( tabIndex == 2 ) { // Clicked on rule tab
    generateRules();  
  }*/
}



function testStuff () {
    var mainDiv = document.getElementById("mainDivInput")

    var sysVar = new systemVar("Input Variable " + inputIndex, "inputDiv" + inputIndex, true);
    inputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    inputDivs[sysVar.divId] = sysVar;  

    var mf = new gauMemFun ("test", 1, 1, 1);

    for ( var key in inputDivs ) {
      inputDivs[key].memFuncs.push(mf);
    }
    

    var mainDiv = document.getElementById("mainDivOutput")

    var sysVar = new systemVar("Output Variable " + outputIndex, "outputDiv" + outputIndex, false);
    outputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    outputDivs[sysVar.divId] = sysVar; 

    for ( var key in outputDivs ) {
      outputDivs[key].memFuncs.push(mf);
    }
}
