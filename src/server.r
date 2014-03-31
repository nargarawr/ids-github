library(shiny)
library(FuzzyToolkitUoN)

shinyServer(function(input, output) {

  # Download the file to the user's hard drive;
  # In json, MATLAB fis, or FuzzyToolkitUoN fis
  output$downloadData <- downloadHandler(
    filename = function() { 
      paste(input$fisName, input$iotypestore, sep='') 
    },
    content = function(file) {
      cat(input$exportOutput)
      cat(gsub("<spbrk>","\n",input$exportOutput))
      write({gsub("  "," ",gsub("<spbrk>","\n",input$exportOutput))}, file)
    }
  )

  # Plots a gensurf of the user's FIS
  output$plotGenSurf <- renderPlot({    
    # gensurf(FIS)
  })
})
