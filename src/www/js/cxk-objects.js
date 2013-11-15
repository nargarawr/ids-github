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
	The system variable object
*/
function systemVar(m_varName, divId, isInput){
	// Fuzzy values
	this.varName = m_varName;
	this.rangeMin = 0;
	this.rangeMax = 1;
	this.isInput = isInput;
	this.memFuncs = new Array();

	this.memFuncs.push(new gau2MemFun("Old",1,1,1,1,1));
	this.memFuncs.push(new gau2MemFun("Middle Aged",1,1,1,1,1));
	this.memFuncs.push(new gau2MemFun("Young",1,1,1,1,1));

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

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

		var varNameInput = document.createElement("input");
		varNameInput.id = this.divId + "_nameInput";
		varNameInput.type = "text";
		varNameInput.value = this.varName;
		varNameInput.className = "indent";
		this.div.appendChild(varNameInput);

		this.div.appendChild(document.createElement("br"));

		var varRangeLabel = document.createElement("h4");
		varRangeLabel.className = "titleText";
		varRangeLabel.appendChild(document.createTextNode("Range (min-max)"));
		this.div.appendChild(varRangeLabel);

		this.div.appendChild(document.createElement("br"));
		this.div.appendChild(document.createElement("br"));

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

/*



*/
		innerDiv.appendChild(convertToTable(this.memFuncs, this.divId));
/*



*/

		var addMFButton = document.createElement("button");
		addMFButton.className = "btn variableButton left btn-primary";
		addMFButton.appendChild(document.createTextNode("Add Function"));
		addMFButton.setAttribute("data-toggle","modal");
		addMFButton.setAttribute("href","#myModal");
		var s = "updateModal(); setCurrentDiv('" + this.div.id + "')";
		addMFButton.setAttribute("onclick","updateModal(); setCurrentDiv('" + this.div.id + "')");
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

function convertToTable ( memFuncs, divId ) {
	if ( memFuncs.length < 1 ) {
		return document.createElement("br");
	}
	var tbl = document.createElement("table");
	
	var tbl_header = document.createElement("tr");
	tbl.appendChild(tbl_header);
	var tbld = document.createElement("td");
		tbld.appendChild(document.createTextNode("Name"));
		tbl_header.appendChild(tbld);
	
	tbld = document.createElement("td");
		tbld.appendChild(document.createTextNode("Type"));
		tbl_header.appendChild(tbld);		

		tbld = document.createElement("td");
		tbl_header.appendChild(tbld);

		tbld = document.createElement("td");
		tbl_header.appendChild(tbld);
	
	for ( var i = 0 ; i < memFuncs.length ; i ++ ) {
		var sid = divId + "-tr" + i;
		var tbl_row = document.createElement("tr");
		tbl_row.setAttribute("id", sid);
		tbl.appendChild(tbl_row);
		
		tbld = document.createElement("td");
		tbld.appendChild(document.createTextNode(memFuncs[i].funName));
		tbl_row.appendChild(tbld);				

		tbld = document.createElement("td");
		tbld.appendChild(document.createTextNode(memFuncs[i].funType));
		tbl_row.appendChild(tbld);						

		tbld = document.createElement("td");
		var editButton = document.createElement("button");
		editButton.appendChild(document.createTextNode("Edit"));
		tbld.appendChild(editButton);
		tbl_row.appendChild(tbld);		

		tbld = document.createElement("td");
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Delete"));
		var s = i + ", \"" + divId +"\"";
		deleteButton.setAttribute("onclick", "deleteMembershipFunction(" + s + ")");
		tbld.appendChild(deleteButton);
		tbl_row.appendChild(tbld);		
	}

	return tbl;
}

/*
	Deletes a membership function
*/
function deleteMembershipFunction ( i, divId ) {
	(inputDivs[divId].memFuncs).splice(i, 1);
	inputDivs[divId].resetContent();
	inputDivs[divId].getBigContent();
}
