/*
  cxk-objects.js
  All of the objects present in the system
  Author: Craig Knott

  Functions:
    triMemFun (name, left, mean, right, height);
    trapMemFun (name, lfoot, lshould, rshould, rfoot, height);
  	gauMemFun (name, sigma, mean, height);
    gau2MemFun (name, lsigma, lmean, rsigma, rmean, height);
    systemVar(m_varName, divId, isInput);
    systemRule(m_inputList, m_outputList, weight, connective);	
*/

/**
	Triangular Membership Function

	@param {string}, the name of the function
	@param {double}, the left foot of the function
	@param {double}, the center of the function
	@param {double}, the right foot of the function
	@param {double}, the height of the function
*/
function triMemFun (name, left, mean, right, height) {
    this.funName            = name;
    this.funType            = "tri";
    this.paramLeft          = left;
    this.paramMean          = mean;
    this.paramRight         = right;
    this.paramHeight        = height; 

	/**
		Prints this membership function
		@param {Node}, where to print this membership function
		@param {string}, the format of the print
		@param {int}, the index of this variable in the print queue		
	*/
    this.printMf = printMf; 
	function printMf ( loc, format, i ) {
		if ( strcmp( format, "ufis" ) == 0 ) {
			loc.appendText("MF" + i + "='" + this.funName + "':'trimf',[" + this.paramLeft + " " + this.paramMean + " " + this.paramRight + " " + this.paramHeight + "]", true);
		} else if ( strcmp( format, "mfis" ) == 0 ) {
		} else if ( strcmp( format, "ojsn" ) == 0 ) {
		}
	} 
}

/**
	Trapezoidal Membership Function

	@param {string}, the name of the function
	@param {double}, the left foot of the function 
	@param {double}, the left shoulder of the function
	@param {double}, the right shoulder of the function
	@param {double}, the right foot of the function
	@param {double}, the height of the function
*/
function trapMemFun (name, lfoot, lshould, rshould, rfoot, height) {
    this.funName            = name;
    this.funType            = "trp";
    this.paramLeftFoot      = lfoot;
    this.paramLeftShoulder  = lshould;
    this.paramRightShoulder = rshould;
    this.paramRightFoot     = rfoot;
    this.paramHeight        = height; 

	/**
		Prints this membership function
		@param {Node}, where to print this membership function
		@param {string}, the format of the print
		@param {int}, the index of this variable in the print queue		
	*/
    this.printMf = printMf; 
	function printMf ( loc, format, i ) {
		if ( strcmp( format, "ufis" ) == 0 ) {
			loc.appendText("MF" + i + "='" + this.funName + "':'trapmf',[" + this.paramLeftFoot + " " + this.paramLeftShoulder + " " + this.paramRightShoulder + " " + this.paramRightFoot + " " + this.paramHeight + "]", true);
		} else if ( strcmp( format, "mfis" ) == 0 ) {
		} else if ( strcmp( format, "ojsn" ) == 0 ) {
		}
	}
}

/**
	Gaussian Membership Function

	@param {string}, the name of the function
	@param {double}, the standard deviation of the function
	@param {double}, the center of the function
	@param {double}, the height of the function
*/
function gauMemFun (name, sigma, mean, height){
    this.funName            = name;
    this.funType            = "gau";
    this.paramSigma         = sigma;
    this.paramMean          = mean;
    this.paramHeight        = height;

	/**
		Prints this membership function
		@param {Node}, where to print this membership function
		@param {string}, the format of the print
		@param {int}, the index of this variable in the print queue		
	*/
    this.printMf = printMf; 
	function printMf ( loc, format, i ) {
		if ( strcmp( format, "ufis" ) == 0 ) {
			loc.appendText("MF" + i + "='" + this.funName + "':'gaussmf',[" + this.paramSigma + " " + this.paramMean + " " + this.paramHeight + "]", true);
		} else if ( strcmp( format, "mfis" ) == 0 ) {
		} else if ( strcmp( format, "ojsn" ) == 0 ) {
		}
	} 
}

/**
	2-Part Gaussian Membership Function

	@param {string}, the name of the function
	@param {double}, the standard deviation of the first function
	@param {double}, the center of the first function
	@param {double}, the standard deviation of the second function
	@param {double}, the center of the second function	
	@param {double}, the height of the functions
*/
function gau2MemFun (name, lsigma, lmean, rsigma, rmean, height) {
    this.funName            = name;
    this.funType            = "ga2";
    this.paramLeftSigma     = lsigma;
    this.paramLeftMean      = lmean;
    this.paramRightSigma    = rsigma;
    this.paramRightMean     = rmean;
    this.paramHeight        = height;   

	/**
		Prints this membership function
		@param {Node}, where to print this membership function
		@param {string}, the format of the print
		@param {int}, the index of this variable in the print queue		
	*/
    this.printMf = printMf; 
	function printMf ( loc, format, i ) {
		if ( strcmp( format, "ufis" ) == 0 ) {
			loc.appendText("MF" + i + "='" + this.funName + "':'gaussbmf',[" + this.paramLeftSigma + " " + this.paramLeftMean + " " + this.paramRightSigma + " " + this.paramRightMean + " " + this.paramHeight +"]", true);
		} else if ( strcmp( format, "mfis" ) == 0 ) {
		} else if ( strcmp( format, "ojsn" ) == 0 ) {
		}
	}   
}

/**
	A fuzzy variable object

	@param {string}, the name of the variable
	@param {string}, the id of the div this is stored in
	@param {boolean}, whether this is an input or output
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

	/**
		Prints this variable

		@param {Node}, where to print the variable to
		@param {int}, the index of this variable in the print queue
		@param {string}, the format of the print (i.e, what file type)
	*/
    this.printVar = printVar; 
	function printVar ( loc, i, format ) {
		if ( strcmp( format, "ufis" ) == 0 ) {
			var io = this.isInput ? "In" : "Out" ;
			loc.appendText("[" + io + "put" + i + "]", true);
			loc.appendText("Name='" + this.varName + "'", true);
			loc.appendText("Range=[" + this.rangeMin + " " + this.rangeMax + "]", true);
			loc.appendText("NumMFs=" + this.memFuncs.length, true);
			var j = 1;
			for ( var key in this.memFuncs ) {
				this.memFuncs[key].printMf( loc, format, j );
				j++;
			}
		} else if ( strcmp( format, "mfis" ) == 0 ) {
		} else if ( strcmp( format, "ojsn" ) == 0 ) {
		}
	}  

	/**
		Creates the div to store all viewable content

		@return {string}, this as a div
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

	/**
		Resets content of this div, to be refreshed
	*/
	this.resetContent=resetContent;
	function resetContent () {
		var fc = this.div.firstChild;
		while( fc ) {
	    	this.div.removeChild( fc );
	    	fc = this.div.firstChild;
		}
	}

	/**
		Redisplays the membership functions of the variable
	*/
	this.refreshMembershipFunctions = refreshMembershipFunctions;
	function refreshMembershipFunctions () {
		var c = document.getElementById(this.div.id + "Inner");
		var fc = c.firstChild;
		
		while( fc ) {
	    	c.removeChild( fc );
	    	fc = c.firstChild;
		}
		

		var varFunctionsLabel = document.getElementById(this.div.id+"titleText");
		varFunctionsLabel.innerHTML = "Functions: " + this.memFuncs.length;

		c.appendChild(convertToTable(this.memFuncs, this.divId, this.isInput));
	}

	/**
		Displays the 'compressed' content of a variable
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

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

		var editButton = document.createElement("button");
		editButton.className = "btn btn-primary variableButton lowMarge";
		editButton.appendChild(document.createTextNode("Edit"));
		var s = "\"" + this.divId +"\", " + this.isInput;
		editButton.setAttribute("onClick", "expandDiv(" + s +  ")");
		this.div.appendChild(editButton);

		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger variableButton lowMarge";
		deleteButton.appendChild(document.createTextNode("Delete"));
		var s = "\"" + this.divId +"\", " + this.isInput;
		deleteButton.setAttribute("onClick", "deleteDiv(" + s +  ")");
		this.div.appendChild(deleteButton);
	}

	/**
		Displays the 'expanded' content of a variable
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
		varFunctionsLabel.id = this.div.id + "titleText";
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
		var e = "\"" + this.divId +"\", " + this.isInput + ", false";
		addMFButton.setAttribute("onclick","checkValidity(" + d + "); clearPopovers(); updateModal(); setCurrentDiv(" + d + ")");
		this.div.appendChild(addMFButton);

		// Buttons 
		var deleteButton = document.createElement("button");
		deleteButton.className = "btn btn-danger variableButton right";
		deleteButton.appendChild(document.createTextNode("Delete"));
		var s = "\"" + this.divId +"\", " + this.isInput;
		deleteButton.setAttribute("onClick", "deleteDiv(" + s +  ")");
		this.div.appendChild(deleteButton);

		var saveButton = document.createElement("button");
		saveButton.className = "btn btn-success variableButton right";
		saveButton.appendChild(document.createTextNode("Save"));
		var s2 = "\"" + this.divId +"\", " + this.isInput;
		saveButton.setAttribute("onClick", "saveDiv(" + s2 +  ")");
		this.div.appendChild(saveButton);

		var closeButton = document.createElement("button");
		closeButton.className = "btn btn-success variableButton right";
		closeButton.appendChild(document.createTextNode("Save and Close"));
		var s2 = "\"" + this.divId +"\", " + this.isInput + ", true";
		closeButton.setAttribute("onClick", "compressDiv(" + s2 +  ")");
		this.div.appendChild(closeButton);
	}
}


/**
	A object to pair together two homogeneous elements

	@param {a}, the left hand element
	@param {b}, the right hand element
*/
function pair ( l, r ) {
	this.leftEl = l;
	this.rightEl = r;
}

/*
	Rule object

	@param {array[pair]}, an array of pairs of variables and terms for inputs
	@param {array[pair]}, an array of pairs of variables and terms for outputs
	@param {double}, the weight of the rule in the system
	@param {string}, the connective to use in this rule

*/
function systemRule(m_inputList, m_outputList, weight, connective){
	this.inputList = m_inputList;
	this.outputList = m_outputList;
	this.weight = weight;
	this.connective = connective;
}