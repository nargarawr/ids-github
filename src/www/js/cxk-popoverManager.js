/*
  cxk-rule-ui.js
  Deals with all popovers
  Author: Craig Knott

  Functions:
    $("#inputVarHelpBtn").popover(); 
    $("#inputVarHelpBtn").click();
    $("#outputVarHelpBtn").popover();
    $("#outputVarHelpBtn").click();
    $("#ruleHelpBtn").popover();
    $("#ruleHelpBtn").click();
    $("#mfcHelpBtn").popover();
    $("#mfcHelpBtn").click();
    $("#rulecHelpBtn").popover();
    $("#rulecHelpBtn").click();
    $("#input-tab").click();
    $("#output-tab").click();
    $("#rule-tab").click();
    $("#import-tab").click();
    $("#export-tab").click();
*/


$(document).ready(function() {

    /* 
      Input variable help button information
    */
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


    /* 
      Output variable help button information   
    */
    $("#outputVarHelpBtn").popover(
      {
        placement:'bottom',
        title: '<b> Output Variable Creator </b>',
        content: "An output variable is a collection of membership functions that specify an output to the system. For instance, if we had a system that had age and athleticism as our inputs, a potential output of this system could be how good we would be at basketball.<br><br> To create your own output variable, simply click on the \'Add New Variable\' button. This will create a placeholder new variable for you. The name of the variable is a symbolic, and unique, reference name for it, and the range of a variable is the range between the values can fall<br><br> To then edit your variable, you can click on the \'Edit\' button, which will take you to the expanded view of the variable. From here you can modify all the values of the variable (including any functions that have been added). To actually add your membership functions, click on the \'Add Function\' button, which will bring up the membership function creation window"
      });

    $("#outputVarHelpBtn").click(function(){
        if ( $("#outputVarHelpBtn").text() === "Show Help") {
          $("#outputVarHelpBtn").html("Hide Help");
        } else {
          $("#outputVarHelpBtn").html("Show Help");
        }
    });

    /*
      Rule creator help button information 
    */
    $("#ruleHelpBtn").popover({
      placement:'bottom',
      title: '<b> Rule Creator </b>',
      content: 'In this section of the system, you can specify what logical rules you wish to apply to the system, during the evaluation process.<br><br> To add a rule, press the \'Add New Rule\' button. This will bring up the Rule Creator Menu, which will explain more about rules in a fuzzy system. Once a rule has been created, you can use the \'Edit\' and \'Delete\' buttons to edit and delete the rule, respectively.'
    });

    $("#ruleHelpBtn").click(function(){
      if ( $('#ruleHelpBtn').text() === "Show Help"){
          $('#ruleHelpBtn').html("Hide Help");
      } else {
          $('#ruleHelpBtn').html("Show Help");
      }
    });



    /*
      Membership function creator help button information 
    */
    $("#mfcHelpBtn").popover({
      placement:'bottom',
      title: '<b> Membership Function Creator </b>',
      content: 'Membership functions make up fuzzy sets (or fuzzy variables, as we know them here), and represent the degrees of truth that given values have for the property they represent. For instance, if we had an \'Age\' variable, we could have membership functions such as: Old, Young, and Middle-Aged.<br><br> In o-Fuzz!, there are currently four different membership functions to choose from, each providing a distinct shape: <a href=\"http://www.mathworks.co.uk/help/fuzzy/gaussmf.html\">Gaussian</a>, <a href=\"http://www.mathworks.co.uk/help/fuzzy/gauss2mf.html\">2-Part Gaussian</a>, <a href=\"http://www.mathworks.co.uk/help/fuzzy/trimf.html\">Triangular</a>, and <a href=\"http://www.mathworks.co.uk/help/fuzzy/trapmf.html\">Trapezoidal</a>. This will be expanded upon when our back end, <a href=\"http://cran.r-project.org/web/packages/FuzzyToolkitUoN/index.html\">FuzzyToolkitUoN</a> is updated.<br><br>Creating a membership function is as easy as specifying the type and parameters that you wish the function to have. You\'ll notice that a graphical representation of your function will be drawn as you specify it, so you can observe any errors.<br><br>Be aware that all membership functions within a variable need to have a unique name, this name cannot be blank, and all parameters must be numbers'
    });

    $("#mfcHelpBtn").click(function(){
      if ( $('#mfcHelpBtn').text() === "Show Help"){
          $('#mfcHelpBtn').html("Hide Help");
      } else {
          $('#mfcHelpBtn').html("Show Help");
      }
    });



    /* 
      Input variable help button information
    */
    $("#rulecHelpBtn").popover(
      {
        placement:'bottom',
        title: '<b> Rule Creator </b>',
        content: "Specifying rules is as simple as selecting the correct linguistic term for each variable in your system. We use rules to dictate how the system will be evaluated later on. For example, you could specify a rule that says:<br><br> If \"height\" is \"tall\" and \"athleticism\" is \"good\" then \"sport to play\" is \"basketball\". <br><br>This will then tell the fuzzy inference system how to evaluate an instance where these statements are true. It is generally a good idea to specify a rule for each combination of input terms for your system, to ensure you cover all possible permutations. <br><br>You may also specify the connective to use (either AND or OR), and the weight of the rule (which affects how much impact the rule has on the system as a whole). You can select the weight using the provided slider, or by entering a value directly into the provided text box; just remember that this value has to be between 0 (no effect), and 1 (full effect)."
      });

    $("#rulecHelpBtn").click(function(){
        if ( $("#rulecHelpBtn").text() === "Show Help") {
          $("#rulecHelpBtn").html("Hide Help");
        } else {
          $("#rulecHelpBtn").html("Show Help");
        }
    });



    // When any navigation is pressed, clear all help windows
    $("#input-tab").click(clearPopovers);
    $("#output-tab").click(clearPopovers);
    $("#rule-tab").click(clearPopovers);
    $("#import-tab").click(clearPopovers);
    $("#export-tab").click(clearPopovers);
});


/*
$(document).on("click", "textarea.inputTextarea", function(evt) {

    // evt.target is the button that was clicked
    var el = $(evt.target);

    // Raise an event to signal that the value changed
    el.trigger("change");
  });

  var inputTextareaBinding = new Shiny.InputBinding();
  $.extend(inputTextareaBinding, {
    find: function(scope) {
      return $(scope).find(".inputTextarea");
    },
    getValue: function(el) {
      return $(el).text();
    },
    setValue: function(el, value) {
      $(el).text(value);
    },
    subscribe: function(el, callback) {
      $(el).on("change.inputTextareaBinding", function(e) {
        callback();
      });
    },
    unsubscribe: function(el) {
      $(el).off(".inputTextareaBinding");
    }
  });

  Shiny.inputBindings.register(inputTextareaBinding);
});
*/

