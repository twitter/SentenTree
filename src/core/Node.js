import { sum } from 'lodash-es';

export default class Node {
  constructor(rawNode) {
    this.leftNodes = [];
    this.leftLinks = [];
    this.rightNodes = [];
    this.rightLinks = [];
    this.data = rawNode;

    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 18;
  }

  isLeaf(){
    return this.leftNodes.length === 0 || this.rightNodes.length === 0;
  }

  isLeftLeaf() {
    return this.leftNodes.length === 0;
  }

  isRightLeaf() {
    return this.rightNodes.length === 0;
  }

  leftEdge() {
    return this.x - this.width / 2;
  }

  rightEdge() {
    return this.x + this.width / 2;
  }

  updateAttachPoints() {
    if(this.leftLinks.length === 1) {
      this.leftLinks[0].attachPoints.y2 = this.y;
    } else if(this.leftLinks.length > 1){
      const totalLeft = sum(this.leftLinks.map(l => l.strokeWidth));
      let startPos = this.y - (totalLeft + (this.leftLinks.length-1)*2) / 2 ;
      this.leftLinks
        .sort((a,b) => a.source.y - b.source.y)
        .forEach(link => {
          link.attachPoints.y2 = startPos + link.strokeWidth / 2;
          startPos += link.strokeWidth + 2;
        });
    }

    if(this.rightLinks.length === 1) {
      this.rightLinks[0].attachPoints.y1 = this.y;
    } else if(this.rightLinks.length > 1){
      const totalRight = sum(this.rightLinks.map(l => l.strokeWidth));
      let startPos = this.y - (totalRight + (this.rightLinks.length-1)*2) / 2 ;
      this.rightLinks
        .sort((a,b) => a.target.y - b.target.y)
        .forEach(link => {
          link.attachPoints.y1 = startPos + link.strokeWidth / 2;
          startPos += link.strokeWidth + 2;
        });
    }

  }
}
