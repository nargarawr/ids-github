# Results of user evaluations

createResults = function () {
  t <- read.csv('C:\\Users\\Cxk\\Dropbox\\Private\\Dissertation\\ids-github\\Testing\\testResults.csv')
 }


 plotFav = function (data) {

 	x <- 0

 	for ( i in 1:nrow(data)) {
 		if ( data$Most.Liked[[i]] == "OF" )	{
 			cat("OF\n");
 			x <- x + 1
 		}
 	}

 	x

 }
