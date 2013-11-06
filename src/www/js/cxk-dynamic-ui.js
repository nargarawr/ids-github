var inputIndex = 0;
var inputDivs = new Array();

/*
	The system variable object
*/
function systemVar(m_varName, divId, isInput){
	// Fuzzy values
	this.varName = m_varName;
	this.rangeMin = 0;
	this.rangeMax = 1;
	this.isInput = isInput;
	this.memFuncs = new Array();

	// HTML div values
	this.spanSize = 3;
	this.divId = divId;
	this.div = null;
	this.notice = null;

	this.createDiv = createDiv; 
	function createDiv () {
		this.div = document.createElement("div");
		this.div.id = this.divId;
		this.div.className = "variable span" +this.spanSize;
		this.resetContent();
		this.getSmallContent();
		return this.div;
	}

	this.resetContent=resetContent;
	function resetContent () {
		var fc = this.div.firstChild;
		while( fc ) {
	    	this.div.removeChild( fc );
	    	fc = this.div.firstChild;
		}
	}

	this.getSmallContent = getSmallContent;
	function getSmallContent () {
		var p = document.createElement("h4");
		p.className = "titleText";
		p.appendChild(document.createTextNode(this.varName));
		this.div.appendChild(p);

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

		var r = document.createElement("h5");
		r.className = "titleText";
		r.appendChild(document.createTextNode("Range: " + this.rangeMin + " to " + this.rangeMax));
		this.div.appendChild(r);		

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

		var mf = document.createElement("h5");
		mf.className = "titleText";
		mf.appendChild(document.createTextNode("Functions: " + this.memFuncs.length));
		this.div.appendChild(mf);				

		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger variableButton right";
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.setAttribute("onClick", "deleteDiv('" + this.divId +  "')");
		this.div.appendChild(deleteButton);

		var b = document.createElement("button");
		b.className = "btn btn-primary variableButton right";
		b.appendChild(document.createTextNode("Edit"));
		b.setAttribute("onClick", "expandDiv('" + this.divId +  "')");
		this.div.appendChild(b);

	}

	this.getBigContent = getBigContent;
	function getBigContent () {
		var varNameLabel = document.createElement("h4");
		varNameLabel.className = "titleText";
		varNameLabel.appendChild(document.createTextNode("Variable Name"));
		this.div.appendChild(varNameLabel);		

		var varNameInput = document.createElement("input");
		varNameInput.id = this.divId + "_nameInput";
		varNameInput.type = "text";
		varNameInput.value = this.varName;
		this.div.appendChild(varNameInput);

		this.div.appendChild(document.createElement("br"));

		var varRangeLabel = document.createElement("h4");
		varRangeLabel.className = "titleText";
		varRangeLabel.appendChild(document.createTextNode("Range"));
		this.div.appendChild(varRangeLabel);

		var varMinInput = document.createElement("input");
		varMinInput.id = this.divId + "_rminInput";
		varMinInput.type = "number";
		varMinInput.value = this.rangeMin;
		this.div.appendChild(varMinInput);

		var varMaxInput = document.createElement("input");
		varMaxInput.id = this.divId + "_rmaxInput";
		varMaxInput.type = "number";
		varMaxInput.value = this.rangeMax;
		this.div.appendChild(varMaxInput);

		this.div.appendChild(document.createElement("br"));		

		var varFunctionsLabel = document.createElement("h4");
		varFunctionsLabel.className = "titleText";
		varFunctionsLabel.appendChild(document.createTextNode("Functions: " + this.memFuncs.length));
		this.div.appendChild(varFunctionsLabel);

		this.div.appendChild(document.createElement("br"));		
		this.div.appendChild(document.createElement("hr"));

		var addMFButton = document.createElement("button");
		addMFButton.className = "btn variableButton left";
		addMFButton.appendChild(document.createTextNode("Add Functions"));
		this.div.appendChild(addMFButton);

		// Buttons 
		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger variableButton right";
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.setAttribute("onClick", "deleteDiv('" + this.divId +  "')");
		this.div.appendChild(deleteButton);

		var closeButton = document.createElement("button");
		closeButton.className = "btn btn-success variableButton right";
		closeButton.appendChild(document.createTextNode("Save and Close"));
		closeButton.setAttribute("onClick", "compressDiv('" + this.divId +  "')");
		this.div.appendChild(closeButton);


	}
}

function deleteDiv (divId) {
	var r = confirm("This will permanently this variable, are you sure you wish to continue?")
	if (r==true) { 		
  		var myDiv = document.getElementById('mainDivInput');
  		myDiv.removeChild(document.getElementById(divId));
  	} 
}

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

function compressDiv (divId ) {
	
	var errorCode = checkValidity(divId);

	if ( errorCode == 0 ){
		inputDivs[divId].varName = document.getElementById(divId + "_nameInput").value;
		inputDivs[divId].rangeMin = document.getElementById(divId + "_rminInput").value;
		inputDivs[divId].rangeMax = document.getElementById(divId + "_rmaxInput").value;

		inputDivs[divId].resetContent();
		inputDivs[divId].getSmallContent();
		inputDivs[divId].div.className = "variable span3";
		inputDivs[divId].div.spanSize = "3";
	} else if (errorCode == 1){
		//inputDivs[divId].notice.innerHTML = "fuck" ;
		alert("error 1");
	} else if (errorCode == 2){
		alert("error 2");
	} else if (errorCode == 3){
		alert("error 3");
	}
	

	
}

function expandDiv(divId){
	inputDivs[divId].resetContent();
	inputDivs[divId].getBigContent();
	inputDivs[divId].div.className = "variable span9";
	inputDivs[divId].div.spanSize = "9";
}

function addNewVar(input){
	var mainDiv = document.getElementById("mainDivInput")

	var sysVar = new systemVar("Input Variable " + inputIndex, "inputDiv" + inputIndex, input);
	inputIndex++;

	mainDiv.appendChild(sysVar.createDiv());
	inputDivs[sysVar.divId] = sysVar;
}