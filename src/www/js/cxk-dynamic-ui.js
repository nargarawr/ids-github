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
  }
  /**  alert(tabIndex);
  if ( tabIndex == 2 ) { // Clicked on rule tab
    generateRules();  
  }*/
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
*/
Node.prototype.appendText = function (string, shouldBreak) {
  this.appendChild(document.createTextNode(string));
  if ( shouldBreak ) {
    this.appendChild(document.createElement("br")); 
  }
  var d = document.getElementById('exportOutput');
  d.value += string + '\n';

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
  
}