getResponse <- function(url) {
  latkey <- "3a8836fbb3520a2b2aa3541d24a45806"
  h <- new_handle()
  handle_setheaders(h,
                    "content-type" = "application/json",
                    "subscription-key" = latkey
  )
  response <- curl_fetch_memory(paste0('https://document-parser-api.lateral.io/?url=', url), handle = h)
  response <- rawToChar(response$content)
  if(length(grep("message\":", response)) > 0) {
	 return("unable to parse article")
  }
  response
}

getBody <- function(resp) {
  gsub("\n"," ",stri_unescape_unicode(substring(strapplyc(resp, "body\":(.*)\"}", simplify = TRUE),2)))
}

analyzeBody <- function(body) {
  indico_key = 'a42a5bed73f3d4309091a2b68d395f7f'
  pol <- political(body,api_key=indico_key)
  emo <- emotion(body, api_key=indico_key)
  c(pol,emo)
}

analyzeURL <- function(url) {
	response <- getResponse(url)
	getBody(response)
}


scoreArticle <- function(new.body, old.fvector) {
   new.fvector <- sapply(text_features(new.body, api_key = '961434b69d19c04216d8c9064d954de2'), function(x) x)
   cosine.sim <- sum(new.fvector*old.fvector)/(magnitude(new.fvector)*magnitude(old.fvector))
   if (is.nan(cosine.sim)) {
        0
   } else {
        cosine.sim
   }
}



mostRelatedArticle <- function(titles, new.urls, old.fvector) {
  new.bodies <- sapply(new.urls, function(x) getBody(getResponse(x)))
  scores <- sapply(new.bodies, function(x) scoreArticle(x, old.fvector))
  best.score.index <- order(scores, decreasing  = T)[[1]]
  url <-new.urls[[best.score.index]]
  title <- titles[[best.score.index]]
  c(strapplyc(url, "([^&]*).*")[[1]], title)
}


magnitude <- function(v) {
	sqrt(sum(v^2))
}

getBestMatch <- function(site, old.fvector, keys) {
  Sys.sleep(abs(1 + rnorm(1)))
  num.results <- 5
  new.url <- paste0("https://www.google.com/search?q=site:", site, "|", keys[[1]], "|", keys[[2]], "&tbm=nws&tbs=qdr:d&num=", num.results)
  html <- htmlParse(getURL(new.url),encoding="UTF-8")
  titles <- xpathSApply(html, "//*[@class='r']", xmlValue)
  if (length(titles) == 0) {
    Sys.sleep(abs(1 + 1*rnorm(1)))
    new.url <-  paste0("https://www.google.com/search?q=site:", site, "&tbm=nws&tbs=qdr:d&num=10")
    html <- htmlParse(getURL(new.url),encoding="UTF-8")
    titles <- xpathSApply(html, "//*[@class='r']", xmlValue)
  }
  article.urls <- substring(xpathSApply(html, "//h3/a", xmlGetAttr, 'href'), 8)
  best.article <- mostRelatedArticle(titles, article.urls, old.fvector)
}


createVector <- function(sites, i, matrix) {
    c(sites[[i]], matrix[1:2, i], analyzeBody(analyzeURL(matrix[1, i])))
}

getResults <- function(url) {
   library(RCurl)
   library(XML)
   library(curl)
   library(gsubfn)
   library(stringi)
   library(indicoio)
    body <- analyzeURL(url)
    keywords <- c(names(keywords(body, top_n = 10, api_key = '961434b69d19c04216d8c9064d954de2', version = 2)), "the", "the") #hacky way to avoid keys[[1]] or [[2]] out of bounds
    keywords <- grep("[[:alnum:]][[:alnum:]+]", keywords, value = T)
    keywords <- gsub(" ", "|", keywords)
    simple.url <- gsub(".*(www.*com).*", "\\1", url)
  	sites <- c("www.nytimes.com", "www.cnn.com", "www.foxnews.com", "www.breitbart.com", "www.politico.com", "www.washingtonpost.com")
  	old.fvector <- sapply(text_features(body, api_key = '961434b69d19c04216d8c9064d954de2'), function(x) x)
  	matrix <- sapply(sites, function(x) getBestMatch(x, old.fvector, keywords))
    v <- c(c("", "", "", analyzeBody(body)), sapply(1:6, function(x) createVector(sites, x, matrix)))
    unlist(v, recursive = T, use.names = F)
}
