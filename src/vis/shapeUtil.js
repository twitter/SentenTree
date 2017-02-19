export function diagonal(x1, y1, x2, y2) {
  return 'M' + x1 + ',' + y1
    + 'C' + (x1 + x2) / 2 + ',' + y1
    + ' ' + (x1 + x2) / 2 + ',' + y2
    + ' ' + x2 + ',' + y2;
}

export function line(x1, y1, x2, y2) {
  return `M ${x1},${y1} L ${x2},${y2}`;
}
