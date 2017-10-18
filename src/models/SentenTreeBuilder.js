import SentenTreeModel from './SentenTreeModel.js';
import TokenizedDataset from './TokenizedDataset.js';
import WordFilter from './WordFilter.js';
import { tokenize } from './tokenize.js';

const identity = x => x;

export default class SentenTreeBuilder {
  constructor() {
    this._tokenize = tokenize;
    this._transformToken = identity;
    const filter = WordFilter.getDefault();
    this._filterToken = token => !filter.test(token);
  }

  tokenize(...args) {
    if (args.length === 0) return this._tokenize;
    this._tokenize = args[0];
    return this;
  }

  transformToken(...args) {
    if (args.length === 0) return this._transformToken;
    this._transformToken = args[0];
    return this;
  }

  filterToken(...args) {
    if (args.length === 0) return this._filterToken;
    this._filterToken = args[0];
    return this;
  }

  buildTokenizedDataset(entries) {
    const tokenizedEntries = entries
      .map(entry => ({
        id: entry.id,
        count: entry.count || 1,
        tokens: this._tokenize(entry.text)
          .map(this._transformToken)
          .filter(this._filterToken),
        rawText: entry.text,
      }))
      .filter(entry => entry.tokens.length > 0);

    return new TokenizedDataset(tokenizedEntries);
  }

  buildModel(entries, termWeights = {}) {
    return new SentenTreeModel(
      this.buildTokenizedDataset(entries),
      termWeights
    );
  }
}
