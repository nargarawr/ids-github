library(shiny)
library(FuzzyToolkitUoN)
#library(rgl)
#library(shinyRGL)

shinyServer(function(input, output) {
  FIS <<- tippertest()

  output$downloadData <- downloadHandler(
    filename = function() { 
      paste(input$fisName, input$iotypestore, sep='') 
    },
    content = function(file) {
      cat(input$exportOutput)
      write({input$exportOutput}, file)
    }
  )


  output$plotGenSurf <- renderPlot({    
    # gensurf(FIS)
  })


  # Generate a summary of the data
  #output$test <- renderPrint({
      #paste(input$testText, "...", input$inputDiv0_nameInput)
    

    #paste("hello", " ", "yolo")
    #paste(input$inputSigma, input$inputMean, input$inputHeight, input$inputFunName)

  	#seq1 <- c(0,10,0,10)
  	#m <- matrix(seq1,2);
  	# 0,0
  	# 10, 10
    #evalFIS(m,tippertest())
  #})


  #output$plot <- renderPlot({
  #  renderWebGL({
  #    points3d(1:10,1:10,1:10)
  #  })
    
    
  #})

})
