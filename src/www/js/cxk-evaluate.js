
function generateEvaluatorUI () {
	var d = document.getElementById("inputValueList")
	clearNode(d);

	for ( var key in inputDivs) {
		var inpBoxLabel = document.createElement("label")
		inpBoxLabel.setAttribute("for", "eval-inp-" + key)
		inpBoxLabel.appendText(inputDivs[key].varName + " (" +  inputDivs[key].rangeMin + "-"  + inputDivs[key].rangeMax +")")
		d.appendChild(inpBoxLabel)

		var inpBox = document.createElement("input")
		inpBox.setAttribute("max",inputDivs[key].rangeMax);
		inpBox.setAttribute("min",inputDivs[key].rangeMin);
		inpBox.setAttribute("onchange", "storeValues(this)")
		inpBox.className="shiny-bound-input";
		inpBox.id="eval-inp-" + key;
		inpBox.type="number";
		d.appendChild(inpBox)
	}

	exportFile('ufis');
}

function storeValues ( htmlObject ) {
	exportFile('ufis');

	var d = document.getElementById("inputValueList")
	var s = "";

	for ( var c in d.childNodes ){
		var textbox = d.childNodes[c];
		if (textbox.tagName && textbox.tagName.toLowerCase() == "input" && textbox.type.toLowerCase() == "number"){
			s += textbox.value + " ";
		}
	}
	$("#passBackEval").val(s)
}

function evaluateSystem () {
	var d = document.getElementById("inputValueList")
}