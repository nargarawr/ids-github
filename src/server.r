library(shiny)
library(FuzzyToolkitUoN)

shinyServer(function(input, output) {
  FIS <<- tippertest()

  output$testOp <- renderPrint({
    #paste(input$n1, "...", input$n2)
      m <- matrix(c(input$n1,input$n2),1,2)
      evalFIS(m,FIS)
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

 
   # x <- (1:10)
   # hist(x, main="derp")
  #})

})