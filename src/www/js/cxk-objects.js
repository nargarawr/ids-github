/*
	Triangular Membership Function
*/
function triMemFun (name, left, mean, right, height) {
      this.funName            = name;
      this.funType            = "tri";
      this.paramLeft          = left;
      this.paramMean          = mean;
      this.paramRight         = right;
      this.paramHeight        = height; 
}

/*
	Trapezoidal Membership Function
*/
function trapMemFun (name, lfoot, lshould, rshould, rfoot, height) {
      this.funName            = name;
      this.funType            = "trp";
      this.paramLeftFoot      = lfoot;
      this.paramLeftShoulder  = lshould;
      this.paramRightShoulder = rshould;
      this.paramRightFoot     = rfoot;
      this.paramHeight        = height; 
}

/*
	Gaussian Membership Function
*/
function gauMemFun (name, sigma, mean, height){
      this.funName            = name;
      this.funType            = "gau";
      this.paramSigma         = sigma;
      this.paramMean          = mean;
      this.paramHeight        = height;
}

/*
	2-Part Gaussian Membership Function
*/
function gau2MemFun (name, lsigma, lmean, rsigma, rmean, height) {
      this.funName            = name;
      this.funType            = "ga2";
      this.paramLeftSigma     = lsigma;
      this.paramLeftMean      = lmean;
      this.paramRightSigma    = rsigma;
      this.paramRightMean     = rmean;
      this.paramHeight        = height;      
}

/*
	A fuzzy variable object
*/
function systemVar(m_varName, divId, isInput){
	// Fuzzy values
	this.varName = m_varName;
	this.rangeMin = 0;
	this.rangeMax = 1;
	this.isInput = isInput;
	this.memFuncs = new Array();

	this.memFuncs.push(new gau2MemFun("Old",1,1,1,1,1));
	this.memFuncs.push(new gauMemFun("Middle Aged",1,1,1));
	this.memFuncs.push(new gau2MemFun("Young",1,1,1,1,1));

	// HTML div values
	this.spanSize = 3;
	this.divId = divId;
	this.div = null;
	this.notice = null;

	/*
		Creates the div to store all viewable content
	*/
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

	/*
		Resets content, to be refreshed
	*/
	this.resetContent=resetContent;
	function resetContent () {
		var fc = this.div.firstChild;
		while( fc ) {
	    	this.div.removeChild( fc );
	    	fc = this.div.firstChild;
		}
	}

	/*
		Displays the ``compressed'' content of a variable
	*/
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
		var s = "\"" + this.divId +"\", " + this.isInput;
		deleteButton.setAttribute("onClick", "deleteDiv(" + s +  ")");
		this.div.appendChild(deleteButton);

		var b = document.createElement("button");
		b.className = "btn btn-primary variableButton right";
		b.appendChild(document.createTextNode("Edit"));
		var s = "\"" + this.divId +"\", " + this.isInput;
		b.setAttribute("onClick", "expandDiv(" + s +  ")");
		this.div.appendChild(b);
	}


	/*
		Displays the ``expanded'' content of a variable
	*/
	this.getBigContent = getBigContent;
	function getBigContent () {
		this.div.appendChild(this.notice);

		var varNameLabel = document.createElement("h4");
		varNameLabel.className = "titleText";
		varNameLabel.appendChild(document.createTextNode("Variable Name"));
		this.div.appendChild(varNameLabel);		

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

		if ( this.isInput ){
			var varNameInput = document.createElement("input");
			varNameInput.id = this.divId + "_nameInput";
			varNameInput.type = "text";
			varNameInput.value = this.varName;
			varNameInput.className = "indent";
			this.div.appendChild(varNameInput);
		} else {
			var varNameOutput = document.createElement("input");
			varNameOutput.id = this.divId + "_nameOutput";
			varNameOutput.type = "text";
			varNameOutput.value = this.varName;
			varNameOutput.className = "indent";
			this.div.appendChild(varNameOutput);
		}


		this.div.appendChild(document.createElement("br"));

		var varRangeLabel = document.createElement("h4");
		varRangeLabel.className = "titleText";
		varRangeLabel.appendChild(document.createTextNode("Range (min-max)"));
		this.div.appendChild(varRangeLabel);

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

		if ( this.isInput ){
			var varMinInput = document.createElement("input");
			varMinInput.id = this.divId + "_rminInput";
			varMinInput.type = "number";
			varMinInput.className="indent";
			varMinInput.value = this.rangeMin;
			this.div.appendChild(varMinInput);

			var varMaxInput = document.createElement("input");
			varMaxInput.id = this.divId + "_rmaxInput";
			varMaxInput.type = "number";
			varMaxInput.value = this.rangeMax;
			this.div.appendChild(varMaxInput);
		} else {
			var varMinOutput = document.createElement("input");
			varMinOutput.id = this.divId + "_rminOutput";
			varMinOutput.type = "number";
			varMinOutput.className="indent";
			varMinOutput.value = this.rangeMin;
			this.div.appendChild(varMinOutput);

			var varMaxOutput = document.createElement("input");
			varMaxOutput.id = this.divId + "_rmaxOutput";
			varMaxOutput.type = "number";
			varMaxOutput.value = this.rangeMax;
			this.div.appendChild(varMaxOutput);
		}

		this.div.appendChild(document.createElement("br"));		

		var varFunctionsLabel = document.createElement("h4");
		varFunctionsLabel.className = "titleText";
		varFunctionsLabel.appendChild(document.createTextNode("Functions: " + this.memFuncs.length));
		this.div.appendChild(varFunctionsLabel);

		this.div.appendChild(document.createElement("br"));		
		this.div.appendChild(document.createElement("hr"));

		var innerDiv = document.createElement("div");
		innerDiv.setAttribute("id",this.div.id + "Inner");
		this.div.appendChild(innerDiv);

		innerDiv.appendChild(convertToTable(this.memFuncs, this.divId, this.isInput));

		var addMFButton = document.createElement("button");
		addMFButton.className = "btn variableButton left btn-primary";
		addMFButton.appendChild(document.createTextNode("Add Function"));
		addMFButton.setAttribute("data-toggle","modal");
		addMFButton.setAttribute("href","#myModal");
		var d = "\"" + this.divId +"\", " + this.isInput;
		addMFButton.setAttribute("onclick","updateModal(); setCurrentDiv(" + d + ")");
		this.div.appendChild(addMFButton);

		// Buttons 
		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger variableButton right";
		deleteButton.appendChild(document.createTextNode("Delete"));
		var s = "\"" + this.divId +"\", " + this.isInput;
		deleteButton.setAttribute("onClick", "deleteDiv(" + s +  ")");
		this.div.appendChild(deleteButton);

		var closeButton = document.createElement("button");
		closeButton.className = "btn btn-success variableButton right";
		closeButton.appendChild(document.createTextNode("Save and Close"));
		closeButton.setAttribute("onClick", "compressDiv(" + s +  ")");
		this.div.appendChild(closeButton);
	}
}

