const size = 32;
const cx1 = 16, cy1 = 16, r1 = 15;
const cx2 = 19, cy2 = 13, r2 = 12;

let path = '';
let grid = '';
for (let y = 0; y < size; y++) {
  let startX = -1;
  let rowStr = '';
  for (let x = 0; x < size; x++) {
    // Check if pixel center is inside outer circle and outside inner circle
    const d1 = (x+0.5 - cx1)**2 + (y+0.5 - cy1)**2;
    const d2 = (x+0.5 - cx2)**2 + (y+0.5 - cy2)**2;
    const inside = (d1 <= r1**2) && (d2 > r2**2);
    
    if (inside) {
      rowStr += 'X';
      if (startX === -1) startX = x;
    } else {
      rowStr += '.';
      if (startX !== -1) {
        path += `M${startX},${y} h${x - startX} v1 h-${x - startX} z\n        `;
        startX = -1;
      }
    }
  }
  if (startX !== -1) {
    path += `M${startX},${y} h${size - startX} v1 h-${size - startX} z\n        `;
  }
  grid += rowStr + '\n';
}
console.log(grid);
console.log(path);
