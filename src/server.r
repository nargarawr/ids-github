library(shiny)
library(FuzzyToolkitUoN)

shinyServer(function(input, output) {

  # Generate a summary of the data
  output$test <- renderPrint({
  	seq1 <- c(0,10,0,10)
  	m <- matrix(seq1,2);
  	# 0,0
  	# 10, 10
    evalFIS(m,tippertest())
  })

  output$test2 <- renderPrint({
  	"test"
  })

  output$plot <- renderPlot({
    x <- (1:10)
    hist(x, main="derp")
  })

})