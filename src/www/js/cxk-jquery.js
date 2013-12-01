$(document).ready(function() {
    $('#myModal').on('hidden', function () {
      clearPopovers();
    })

    $("#inputVarHelpBtn").popover(
      {
        //trigger:'hover',
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

    $("#outputVarHelpBtn").click(function(){
        if ( $("#outputVarHelpBtn").text() === "Show Help") {
          $("#outputVarHelpBtn").html("Hide Help");
        } else {
          $("#outputVarHelpBtn").html("Show Help");
        }
    });

    $("#mfcHelpBtn").click(function(){
      if ( $('#mfcHelpBtn').text() === "Show Help"){
          $('#mfcHelpBtn').html("Hide Help");
      } else {
          $('#mfcHelpBtn').html("Show Help");
      }
    });

    $("#outputVarHelpBtn").popover(
      {
        //trigger:'hover',
        placement:'bottom',
        title: '<b> Output Variable Creator </b>',
        content: "An output variable is a collection of membership functions that specify an output to the system. For instance, if we had a system that had age and athleticism as our inputs, a potential output of this system could be how good we would be at basketball.<br><br> To create your own output variable, simply click on the \'Add New Variable\' button. This will create a placeholder new variable for you. The name of the variable is a symbolic, and unique, reference name for it, and the range of a variable is the range between the values can fall<br><br> To then edit your variable, you can click on the \'Edit\' button, which will take you to the expanded view of the variable. From here you can modify all the values of the variable (including any functions that have been added). To actually add your membership functions, click on the \'Add Function\' button, which will bring up the membership function creation window"
      });

    $("#mfcHelpBtn").popover({
      placement:'bottom',
      title: '<b> Membership Function Creator </b>',
      content: 'how to mek membership function....'
    });
 
 $("#input-tab").click(clearPopovers);
 $("#output-tab").click(clearPopovers);


});