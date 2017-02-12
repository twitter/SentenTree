export default class Link {
  constructor(sourceNode, targetNode, freq) {
    this.source = sourceNode;
    this.target = targetNode;
    this.freq = freq;
  }

  isTheOnlyBridge() {
    return this.source.right === 1 && this.target.left === 1;
  }

  toConstraint() {
    const gap = this.isTheOnlyBridge() ? 5 : 20;
    return {
      axis: 'x',
      left: this.source.data.id,
      right: this.target.data.id,
      gap: (this.source.width + this.target.width) / 2 + gap
    };
  }
}
