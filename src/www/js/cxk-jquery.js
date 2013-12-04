$(document).ready(function() {

    // Functions to be called when the modal window is closed in any way
    $('#myModal').on('hidden', function () {
      clearPopovers();
      document.getElementById('inputFunName').value = "";
    })

    // Input variable help button information
    $("#inputVarHelpBtn").popover(
      {
        placement:'bottom',
        title: '<b> Input Variable Creator </b>',
        content: "An input variable is a collection of membership functions that specify an input to the system. For instance, if we wanted to construct a system to predict how good we would be at basketball, we could have inputs such as height and athleticism.<br><br> To create your own input variable, simply click on the \'Add New Variable\' button. This will create a placeholder new variable for you. The name of the variable is a symbolic, and unique, reference name for it, and the range of a variable is the range between the values can fall<br><br> To then edit your variable, you can click on the \'Edit\' button, which will take you to the expanded view of the variable. From here you can modify all the values of the variable (including any functions that have been added). To actually add your membership functions, click on the \'Add Function\' button, which will bring up the membership function creation window"
      });

    $("#inputVarHelpBtn").click(function(){
        if ( $("#inputVarHelpBtn").text() === "Show Help") {
          $("#inputVarHelpBtn").html("Hide Help");
        } else {
          $("#inputVarHelpBtn").html("Show Help");
        }
    });

    // Output variable help button information   
    $("#outputVarHelpBtn").popover(
      {
        placement:'bottom',
        title: '<b> Output Variable Creator </b>',
        content: "An output variable is a collection of membership functions that specify an output to the system. For instance, if we had a system that had age and athleticism as our inputs, a potential output of this system could be how good we would be at baseskdtball.<br><br> To create your own output variable, simply click on the \'Add New Variable\' button. This will create a placeholder new variable for you. The name of the variable is a symbolic, and unique, reference name for it, and the range of a variable is the range between the values can fall<br><br> To then edit your variable, you can click on the \'Edit\' button, which will take you to the expanded view of the variable. From here you can modify all the values of the variable (including any functions that have been added). To actually add your membership functions, click on the \'Add Function\' button, which will bring up the membership function creation window"
      });

    $("#outputVarHelpBtn").click(function(){
        if ( $("#outputVarHelpBtn").text() === "Show Help") {
          $("#outputVarHelpBtn").html("Hide Help");
        } else {
          $("#outputVarHelpBtn").html("Show Help");
        }
    });

    // Membership function creator help button information 
    $("#mfcHelpBtn").popover({
      placement:'bottom',
      title: '<b> Membership Function Creator </b>',
      content: 'What a membership function is... How to specify them ... the types... parameters?'
    });

    $("#mfcHelpBtn").click(function(){
      if ( $('#mfcHelpBtn').text() === "Show Help"){
          $('#mfcHelpBtn').html("Hide Help");
      } else {
          $('#mfcHelpBtn').html("Show Help");
      }
    });

    // When any navigation is pressed, clear all help windows
    $("#input-tab").click(clearPopovers);
    $("#output-tab").click(clearPopovers);
    $("#rule-tab").click(clearPopovers);
    $("#import-tab").click(clearPopovers);
    $("#export-tab").click(clearPopovers);
});