
/*
  Function to clear any left over popovers
*/
function clearPopovers() {
    $("#inputVarHelpBtn").popover('hide');
    $("#outputVarHelpBtn").popover('hide');
    $("#mfcHelpBtn").popover('hide');
    $("#ruleHelpBtn").popover('hide');

    $("#inputVarHelpBtn").html("Show Help");
    $("#outputVarHelpBtn").html("Show Help");
    $("#mfcHelpBtn").html("Show Help");
    $("#ruleHelpBtn").html("Show Help");
}

/*
  Ran each time a new tab is selected, takes the tab selected as argument
*/
function onTabChange ( tabIndex ) {
  /*
  alert(tabIndex);
  if ( tabIndex == 2 ) { // Clicked on rule tab
    generateRules();  
  }*/
}


