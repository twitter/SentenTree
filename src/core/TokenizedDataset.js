import { sum } from 'lodash-es';

export default class TokenizedDataset {
  constructor(vocabularies = {}, itemset = [], entries = []) {
    this.vocabularies = vocabularies;
    this.itemset = itemset;
    this.entries = entries;
  }

  filter(wordFilter) {
    const stopwordLookup = this.itemset.map(w => wordFilter.test(w));
    const newEntries = this.entries
      .map(entry => {
        const tokens = entry.tokens.filter(w => !stopwordLookup[w]);
        return tokens.length > 0
          ? Object.assign({}, entry, { tokens })
          : null;
      })
      .filter(x => x);

    return new TokenizedDataset(
      this.vocabularies,
      this.itemset,
      newEntries
    );
  }

  encodeTermWeights(termWeights = {}) {
    return Object.keys(termWeights)
      .map(key => key in this.vocabularies)
      .reduce((acc, key) => {
        acc[this.vocabularies[key]] = termWeights[key];
        return acc;
      }, {});
  }

  computeSize() {
    return sum(this.entries.map(e => e.cnt));
  }
}