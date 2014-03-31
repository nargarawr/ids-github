/**  cxk-dynamic-ui.js
  Deals with additional dynamic user interface elements
  Author: Craig Knott

  Functions:
    onTabChange( tabIndex );
    clearNode ( nodetoclear );
    Node.prototype.appendText = function (string);
    Node.prototype.appendText = function (string, shouldBreak);
    tipperTest( );
*/

/**
  Ran each time a new tab is selected, takes the tab selected as argument

  @param {int}, the index of the tab changed to
*/
function onTabChange ( tabIndex ) {
  var d = document.getElementById("errorRowRule");
  d.innerHTML = "";

  if ( tabIndex == 0 ) {
    g_isInput = true;
  } else if ( tabIndex == 1 ) {
    g_isInput = false;
  } else if ( tabIndex == 2) {
    printRules();
  }
}

/**
  Deletes all child nodes of the given node

  @param {Node}, the node to be cleared
*/
function clearNode ( nodetoclear ) {
    if ( nodetoclear.hasChildNodes() ) {
      while ( nodetoclear.childNodes.length >= 1 ) {
        nodetoclear.removeChild( nodetoclear.firstChild );       
      } 
    }
}

/**
  Appends text to a node element

  @param {string}, the string to append
*/
Node.prototype.appendText = function (string) {
  this.appendChild(document.createTextNode(string));
} 

/**
  Appends text to a node element

  @param {string}, the string to append
  @param {boolean}, whether to also append a break or not
  @param {boolean}, whether to append to the file output
*/
Node.prototype.appendText = function (string, shouldBreak ) {
  this.appendChild(document.createTextNode(string));
  if ( shouldBreak ) {
    this.appendChild(document.createElement("br")); 
  }  
} 

/**
  Appends text to a node element

  @param {string}, the string to append
  @param {boolean}, whether to also append a break or not
  @param {boolean}, whether to append to the file output
*/
Node.prototype.appendSpecialBreakText = function (string, shouldBreak, shouldAppendToFile ) {
  this.appendChild(document.createTextNode(string));

  var d = document.getElementById('exportOutput');
  if ( shouldAppendToFile ) {
    d.value += string;
  }

  if ( shouldBreak ) {
    this.appendChild(document.createElement("br"));
    d.value += '<spbrk>';  
  }
} 

/**
    Debug function that constructs the tipper test example
*/
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

    updateSidePanelWithVars();

    // Create 3 rules

    var r1i = new Array;
    r1i.push(new pair("inputDiv0","Poor"))
    r1i.push(new pair("inputDiv1","Rancid"))
    var r1o = new Array;
    r1o.push(new pair("outputDiv0","Poor"))
    var r1 = new systemRule(r1i, r1o, 1,"OR")
    systemRules.push(r1);

    var r2i = new Array;
    r2i.push(new pair("inputDiv0","Good"))
    r2i.push(new pair("inputDiv1","(Not Used)"))
    var r2o = new Array;
    r2o.push(new pair("outputDiv0","Average"))
    var r2 = new systemRule(r2i, r2o, 1,"AND")
    systemRules.push(r2);

    var r3i = new Array;
    r3i.push(new pair("inputDiv0","Excellent"))
    r3i.push(new pair("inputDiv1","Delicious"))
    var r3o = new Array;
    r3o.push(new pair("outputDiv0","Generous"))
    var r3 = new systemRule(r3i, r3o, 1,"OR")
    systemRules.push(r3);

    printRules();
    edittingRule = false;
    edittingId = null;     

    for ( var key in inputDivs ) {
      inputDivs[key].updateSmallView();
    }

    for ( var key in outputDivs ) {
      outputDivs[key].updateSmallView();
    }
}


function urgencyTest () {
/*
  var mainDiv = document.getElementById("mainDivInput")

    var sysVar = new systemVar("Heart Rate", "inputDiv" + inputIndex, true);
    inputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    inputDivs[sysVar.divId] = sysVar;  
    inputDivs[sysVar.divId].rangeMin = 0;
    inputDivs[sysVar.divId].rangeMax = 160;

    var mf = new gauMemFun ("D Low", 25, 0, 1);
    var mf2 = new gauMemFun ("H Low", 5, 40, 1);
    var mf3 = new gauMemFun ("Low", 5, 55, 1);
    var mf4 = new gauMemFun ("Average", 15, 80, 1);
    var mf5 = new gauMemFun ("High", 10, 105, 1);
    var mf6 = new gauMemFun ("V High", 8, 122, 1);
    var mf7 = new gauMemFun ("D High", 20, 160, 1);

    inputDivs[sysVar.divId].memFuncs.push(mf);
    inputDivs[sysVar.divId].memFuncs.push(mf2);
    inputDivs[sysVar.divId].memFuncs.push(mf3);
    inputDivs[sysVar.divId].memFuncs.push(mf4);
    inputDivs[sysVar.divId].memFuncs.push(mf5);
    inputDivs[sysVar.divId].memFuncs.push(mf6);
    inputDivs[sysVar.divId].memFuncs.push(mf7);   

    var sysVar = new systemVar("Temperature", "inputDiv" + inputIndex, true);
    inputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    inputDivs[sysVar.divId] = sysVar;  
    inputDivs[sysVar.divId].rangeMin = 25;
    inputDivs[sysVar.divId].rangeMax = 45;

    var mf = new trapMemFun ("D Low", 25,25,27,29,1);
    var mf2 = new trapMemFun ("V Low", 27,30,33,35,1);
    var mf3 = new trapMemFun ("Low", 34,35,36,37,1);
    var mf4 = new triMemFun ("Average", 36.5,37,37.5,1);
    var mf5 = new trapMemFun ("High", 37,38,40,41,1);
    var mf6 = new trapMemFun ("V High", 40,41,42,43,1);
    var mf7 = new trapMemFun ("D High", 41,45,45,45,1);

    inputDivs[sysVar.divId].memFuncs.push(mf);
    inputDivs[sysVar.divId].memFuncs.push(mf2);
    inputDivs[sysVar.divId].memFuncs.push(mf3);
    inputDivs[sysVar.divId].memFuncs.push(mf4);
    inputDivs[sysVar.divId].memFuncs.push(mf5);
    inputDivs[sysVar.divId].memFuncs.push(mf6);
    inputDivs[sysVar.divId].memFuncs.push(mf7);   


    var mainDiv = document.getElementById("mainDivOutput")

    var sysVar = new systemVar("Urgency", "outputDiv" + outputIndex, false);
    outputIndex++;

    mainDiv.appendChild(sysVar.createDiv());
    outputDivs[sysVar.divId] = sysVar; 
    outputDivs[sysVar.divId].rangeMin = 0;
    outputDivs[sysVar.divId].rangeMax = 100;

    var mf = new trapMemFun ("Poor", );
    var mf2 = new trapMemFun ("Average", );
    var mf3 = new trapMemFun ("Generous", );
    var mf4 = new trapMemFun ("Generous", );
    var mf5 = new trapMemFun ("Generous", );

    outputDivs[sysVar.divId].memFuncs.push(mf);
    outputDivs[sysVar.divId].memFuncs.push(mf2);   
    outputDivs[sysVar.divId].memFuncs.push(mf3);   
    outputDivs[sysVar.divId].memFuncs.push(mf4);   
    outputDivs[sysVar.divId].memFuncs.push(mf5);   

    updateSidePanelWithVars();

    // Create 3 rules

    var r1i = new Array;
    r1i.push(new pair("inputDiv0","Poor"))
    r1i.push(new pair("inputDiv1","Rancid"))
    var r1o = new Array;
    r1o.push(new pair("outputDiv0","Poor"))
    var r1 = new systemRule(r1i, r1o, 1,"OR")
    systemRules.push(r1);

    var r2i = new Array;
    r2i.push(new pair("inputDiv0","Good"))
    r2i.push(new pair("inputDiv1","(Not Used)"))
    var r2o = new Array;
    r2o.push(new pair("outputDiv0","Average"))
    var r2 = new systemRule(r2i, r2o, 1,"AND")
    systemRules.push(r2);

    var r3i = new Array;
    r3i.push(new pair("inputDiv0","Excellent"))
    r3i.push(new pair("inputDiv1","Delicious"))
    var r3o = new Array;
    r3o.push(new pair("outputDiv0","Generous"))
    var r3 = new systemRule(r3i, r3o, 1,"OR")
    systemRules.push(r3);

    printRules();
    edittingRule = false;
    edittingId = null;    
*/
}