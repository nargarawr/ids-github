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
    $("#rulecHelpBtn").html("Show Help");
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



function tipperTest () {
    var mainDiv = document.getElementById("mainDivInput")

    var sysVar = new systemVar("Service", "inputDiv" + inputIndex, true);
    inputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    inputDivs[sysVar.divId] = sysVar;  
    inputDivs[sysVar.divId].rangeMin = 0;
    inputDivs[sysVar.divId].rangeMax = 10;

    var mf = new gauMemFun ("Poor", 1.5, 0, 1);
    var mf2 = new gauMemFun ("Good", 1.5, 5, 1);
    var mf3 = new gauMemFun ("Excellent", 1.5, 10, 1);
    inputDivs[sysVar.divId].memFuncs.push(mf);
    inputDivs[sysVar.divId].memFuncs.push(mf2);
    inputDivs[sysVar.divId].memFuncs.push(mf3);
    

    var sysVar = new systemVar("Food", "inputDiv" + inputIndex, true);
    inputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    inputDivs[sysVar.divId] = sysVar;  
    inputDivs[sysVar.divId].rangeMin = 0;
    inputDivs[sysVar.divId].rangeMax = 10;

    var mf = new trapMemFun ("Rancid", 0,0,1,3,1);
    var mf2 = new trapMemFun ("Delicious", 7,9,10,10,1);
    inputDivs[sysVar.divId].memFuncs.push(mf);
    inputDivs[sysVar.divId].memFuncs.push(mf2);

    var mainDiv = document.getElementById("mainDivOutput")

    var sysVar = new systemVar("Tip", "outputDiv" + outputIndex, false);
    outputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    outputDivs[sysVar.divId] = sysVar; 
    outputDivs[sysVar.divId].rangeMin = 0;
    outputDivs[sysVar.divId].rangeMax = 30;

    var mf = new triMemFun ("Poor", 0,5,10,1);
    var mf2 = new triMemFun ("Average", 10,15,20,1);
    var mf3 = new triMemFun ("Generous", 20,25,30,1);
    outputDivs[sysVar.divId].memFuncs.push(mf);
    outputDivs[sysVar.divId].memFuncs.push(mf2);   
    outputDivs[sysVar.divId].memFuncs.push(mf3);   
    
}
