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
		this.notice = document.createElement("div");

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
		this.div.appendChild(this.notice);

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