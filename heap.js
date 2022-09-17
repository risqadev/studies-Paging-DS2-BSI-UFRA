const { input, heapType } = require('./inputs');

let arranje = [null];

function heap () {
  for (const value of input) {
    arranje = insert(value, arranje);
  }
}
heap();

console.log(arranje, isHeap(heapType, arranje));


function getFather(pos) {
  return Math.floor(pos/2)
}

function insert(element, arranje) {
  const n = arranje.length;
  arranje[n] = element;
  const arranjeMod = promove(heapType, arranje, n);
  return arranjeMod;
}

function promove(type, arranje, pos) {
  let i = pos;
  while (i > 1) {
    const fatherPos = getFather(i);
    if (type === 'min')
      if (arranje[i] >= arranje[fatherPos])
        return arranje;
    if (type === 'max')
      if (arranje[i] <= arranje[fatherPos])
        return arranje;
    const father = arranje[fatherPos];
    arranje[fatherPos] = arranje[i];
    arranje[i] = father;
    i = fatherPos;
  }
  return arranje;
}

function isHeap(type, arranje) {
  if (type === 'min') {
    for (let i = 2; i < arranje.length; i++)
      if (arranje[i] < arranje[getFather(i)])
        return false;
    return true;
  }
  if (type === 'max') {
    for (let i = 2; i < arranje.length; i++)
      if (arranje[i] > arranje[getFather(i)])
        return false;
    return true;
  }
}