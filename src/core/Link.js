export default class Link {
  constructor(source, sourceNode, target, targetNode, freq) {
    this.source = source;
    this.sourceNode = sourceNode;
    this.target = target;
    this.targetNode = targetNode;
    this.freq = freq;
  }

  isTheOnlyBridge() {
    return this.sourceNode.right === 1 && this.targetNode.left === 1;
  }

  toConstraint() {
    const gap = this.isTheOnlyBridge() ? 5 : 20;
    return {
      axis: 'x',
      left: this.source,
      right: this.target,
      gap: (this.sourceNode.width + this.targetNode.width) / 2 + gap
    };
  }
}
