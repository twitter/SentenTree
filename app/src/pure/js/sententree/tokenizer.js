define([

],
function(){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

var module = (function(){
  var tokenPatt = /http:\/\/t\.co\/\w+|http:\/\/vine\.co\/\w+|http:\/\/t\.co\w+|http:\/\/vine\.co\w+|http:\/\/t\.\w+|http:\/\/vine\.\w+|http:\/\/\w+|\@\w+|\#\w+|\d+(,\d+)+|\w+(-\w+)*|\$?\d+(\.\d+)?\%?|([A-Z]\.)+/g;

  // tweets follow this format: tweetId, tweetText, # of retweets
  function tokenize(tweets, isLowered ){
    isLowered = isLowered || false;
    if( !tweets)
      return null;
    if( !isLowered ) {
      tweets.forEach(function(t) {
        tweets[1] = tweets[1].toLowerCase();
      });
    }
    var vocab = {};
    var itemset = [];
    var tokenlist = [];
    for( var i = 0; i < tweets.length; i++ ) {
      var tokenResult = tokenPatt.exec(tweets[i][1]);
      if( !tokenResult )
        continue;
      var tweet = {'tweetId':tweets[i].id, 'text':[], 'cnt':+tweets[i].count, 'rawText': tweets[i].text};

      tokenPatt.lastIndex = 0;
      while( (tokenResult = tokenPatt.exec(tweets[i].text)) != null ) {
        var t = tokenResult[0];
        // HACK
        if(t=='scores' || t=='scored'){
          t='score';
        }
        if( !(t in vocab) ) {
          vocab[t] = itemset.length;
          itemset.push(t);
        }
        tweet.text.push(vocab[t]);
      }
      if( tweet.text.length > 0 )
        tokenlist.push(tweet);
    }
    return {vocab:vocab, itemset:itemset, tokenlist:tokenlist};
  }

  return {
    tokenize: tokenize
  };
}());

// return module
return module;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});