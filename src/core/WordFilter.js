import { keyBy, uniq } from 'lodash-es';

const NLTK_STOP_WORDS = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'nor', 'only', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']; // removed 'own', 'not', 'no' from stopwords

const CUSTOM_STOP_WORDS = ['de', 'la', 'y', 'un', 'que', 'en', 'el', 'shit', 'fuck', 'fucking']; //spanish
const TWEET_STOP_WORDS = ['rt', 'via', 'amp', 'http', 'https', 'm', 're', 'co'];
const DEFAULT_STOP_WORDS = uniq(NLTK_STOP_WORDS.concat(CUSTOM_STOP_WORDS).concat(TWEET_STOP_WORDS));

export default class WordFilter {
  constructor(includeWords = [], excludeWords = []) {
    if(includeWords && includeWords.length > 0) {
      this.stopWords = uniq(DEFAULT_STOP_WORDS.concat(includeWords));
    } else {
      this.stopWords = DEFAULT_STOP_WORDS;
    }
    if(excludeWords && excludeWords.length > 0) {
      const exclusionLookup = keyBy(excludeWords, w => w);
      this.stopWords = this.stopWords.filter(w => !exclusionLookup[w]);
    }
    this.regex = new RegExp('^(' + this.stopWords.join('|') + ')$');
  }

  test(word) {
    return this.regex.test(word);
  }
}
