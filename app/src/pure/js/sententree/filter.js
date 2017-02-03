define([

],
function(){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

var module = (function(){
  var nltkStopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'nor', 'only', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']; // removed 'own', 'not', 'no' from stopwords
  var customStopwords = ['de', 'la', 'y', 'un', 'que', 'en', 'el','shit','fuck','fucking']; //spanish 
  var tweetStopwords = ['rt', 'via', 'amp', 'http', 'https', 'm', 're', 'co'];
  var stopwords = nltkStopwords.concat(customStopwords).concat(tweetStopwords);

  function removeStopwords(tokens, additionalwords){
    if( tokens == null )
      return null;
    var itemset = tokens.itemset;
    var tokenlist = tokens.tokenlist;

    var stopwordsRegex = new RegExp('^(' + stopwords.concat(additionalwords).join('|') + ')$');
    var stopwordLookup = itemset.map(function(word){
      return stopwordsRegex.test(word);
    });

    var newTokens = [];
    tokenlist.forEach(function(tweet) {
      var newText = tweet.text.filter(function(w) {
        return !stopwordLookup[w];
      });
      if(newText.length > 0){
        newTokens.push({
          tweetId: tweet.tweetId,
          text: newText,
          cnt: tweet.cnt,
          rawText: tweet.rawText
        });
      }
    });
    return {vocab:tokens.vocab, itemset:itemset, tokenlist:newTokens};
  }

  return {
    removeStopwords: removeStopwords
  };
}());

// return module
return module;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});