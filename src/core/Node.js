export default class Node {
  constructor(rawNode) {
    this.left = 0;
    this.leftNodes = [];
    this.right = 0;
    this.rightNodes = [];
    this.data = rawNode;

    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 14;
  }

  isLeaf(){
    return this.left === 0 || this.right === 0;
  }

  isLeftLeaf() {
    return this.left === 0;
  }

  isRightLeaf() {
    return this.right === 0;
  }
}
