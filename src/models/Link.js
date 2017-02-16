export default class Link {
  constructor(sourceNode, targetNode, freq) {
    this.source = sourceNode;
    this.target = targetNode;
    this.freq = freq;
    this.attachPoints = {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1
    };
  }

  isTheOnlyBridge() {
    return this.source.rightLinks.length === 1
      && this.target.leftLinks.length === 1;
  }

  toConstraint() {
    const gap = this.isTheOnlyBridge() ? 5 : 15;
    return {
      axis: 'x',
      left: this.source.data.id,
      right: this.target.data.id,
      gap: (this.source.width + this.target.width) / 2 + gap
    };
  }

  toOnlyBridgeConstraint() {
    return {
      type: 'alignment',
      axis: 'y',
      offsets: [
        { node: this.source.data.id, offset: 0 },
        { node: this.target.data.id, offset: 0 }
      ]
    };
  }
}
