import { sum } from 'lodash';

export default class TokenizedDataset {
  constructor(entries = []) {
    this.vocabularies = {};
    this.itemset = [];
    this.entries = entries
      .map(({ id, count, tokens, rawText }) => ({
        id,
        count,
        tokens: tokens.map(t => this.encode(t)),
        rawText,
        seqIndices: [],
      }));
  }

  hasToken(token) {
    return this.vocabularies.hasOwnProperty(token);
  }

  hasCode(code) {
    return code >= 0 && code < this.itemset.length;
  }

  getCode(token) {
    return this.vocabularies[token];
  }

  encode(token) {
    if (this.vocabularies.hasOwnProperty(token)) {
      return this.vocabularies[token];
    }
    const code = this.itemset.length;
    this.itemset.push(token);
    this.vocabularies[token] = code;
    return code;
  }

  decode(code) {
    return this.itemset[code];
  }

  encodeTermWeights(termWeights = {}) {
    return Object.keys(termWeights)
      .filter(key => this.hasToken(key))
      .reduce((acc, key) => {
        acc[this.getCode(key)] = termWeights[key];
        return acc;
      }, {});
  }

  computeSize() {
    return sum(this.entries.map(e => e.count));
  }
}
