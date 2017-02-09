import WordFilter from './core/WordFilter.js';
import { initGraph } from './core/GraphBuilder.js';
import { tokenize } from './core/tokenizer.js';

const DEFAULT_FILTER = new WordFilter();

export class SentenTreeModel {
  constructor(entries, wordFilter = DEFAULT_FILTER, termWeights = {}) {
    const dataset = tokenize(entries).filter(wordFilter);
    const terms = dataset.encodeTermWeights(termWeights);
    initGraph(dataset, terms);
  }
}