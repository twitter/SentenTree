import TokenizedDataset from './TokenizedDataset.js';

const PATTERN = /http:\/\/t\.co\/\w+|http:\/\/vine\.co\/\w+|http:\/\/t\.co\w+|http:\/\/vine\.co\w+|http:\/\/t\.\w+|http:\/\/vine\.\w+|http:\/\/\w+|\@\w+|\#\w+|\d+(,\d+)+|\w+(-\w+)*|\$?\d+(\.\d+)?\%?|([A-Z]\.)+/g;

// tweets follow this format: tweetId, tweetText, # of retweets
export function tokenize(inputEntries){
  const vocabularies = {};
  const itemset = [];
  const entries = inputEntries
    .filter(entry => PATTERN.exec(entry[1]))
    .map(entry => {
      const tokens = [];
      PATTERN.lastIndex = 0;
      let tokenResult;
      while( (tokenResult = PATTERN.exec(entry.text)) != null ) {
        let t = tokenResult[0].trim();
        // HACK
        if(t=='scores' || t=='scored'){
          t='score';
        }
        if( !(t in vocabularies) ) {
          vocabularies[t] = itemset.length;
          itemset.push(t);
        }
        tokens.push(vocabularies[t]);
      }

      return {
        id: entry.id,
        tokens,
        count: entry.count || 1,
        rawText: entry.text
      };
    });

  return new TokenizedDataset(vocabularies, itemset, entries);
}