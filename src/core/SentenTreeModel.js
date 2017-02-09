import WordFilter from './WordFilter.js';
import { initGraphs } from './GraphBuilder.js';
import { tokenize } from './tokenizer.js';

const DEFAULT_FILTER = new WordFilter();

export default class SentenTreeModel {
  constructor(entries, wordFilter = DEFAULT_FILTER, termWeights = {}) {
    const dataset = tokenize(entries).filter(wordFilter);
    const terms = dataset.encodeTermWeights(termWeights);
    this.graph = initGraphs(dataset, terms);
  }
}