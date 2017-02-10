import { SvgChart, helper } from 'd3kit';

class SentenTreeVis extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {

    });
  }

  static getCustomEventNames() {
    return [];
  }

  constructor(element, options) {
    super(element, options);

    // this.layers.create([]);

    this.visualize = this.visualize.bind(this);
    this.on('data', this.visualize);
    this.on('options', this.visualize);
    this.on('resize', this.visualize);
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const data = this.data();
  }
}

export default SentenTreeVis;
