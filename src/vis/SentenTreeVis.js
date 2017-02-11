import { SvgChart, helper } from 'd3kit/dist/d3kit-es.js';
import 'webcola/WebCola/cola.min.js';

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

    console.log('cola', cola);

    // this.colaAdaptor = cola.d3adaptor()
    //   .flowLayout('x')
    //   .avoidOverlaps(true);

  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const data = this.data();


  }
}

export default SentenTreeVis;
