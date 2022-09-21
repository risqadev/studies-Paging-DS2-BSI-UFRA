const { input, heapType } = require('./inputs');

const sequence =  !! process.argv[3]
                  && process.argv[3].split(',').map(item => Number(item))
                  || input;
const type = process.argv[2] || heapType;

let arranje = [null];

const demovePos = 1;

console.log(sequence, isHeap(type, sequence));

function heap () {
  if (!isHeap(type, sequence)) {
    for (const value of sequence) {
      arranje = insert(value, arranje);
    }
  }
  if (isHeap(type, sequence) && !!demovePos) {
    arranje = demove(type, sequence, demovePos);
  }
}
heap();

console.log(arranje, isHeap(type, arranje));


function getFatherPos(pos) {
  return pos >> 1;  // bitwise right shift
}

function insert(element, arranje) {
  const n = arranje.length;
  arranje[n] = element;
  const arranjeMod = promove(type, arranje, n);
  return arranjeMod;
}

function promove(type, arranje, pos) {
  let fatherPos = getFatherPos(pos);
  while (
    pos > 1
    && !(type === 'min' && arranje[pos] >= arranje[fatherPos])
    && !(type === 'max' && arranje[pos] <= arranje[fatherPos])
  ) {
    const father = arranje[fatherPos];
    arranje[fatherPos] = arranje[pos];
    arranje[pos] = father;
    pos = fatherPos;
    fatherPos = getFatherPos(pos);
  }
  return arranje;
}

function demove(type, arranje, pos) {
  let left = pos << 1;    // bitwise left shift
  let right = left + 1;
  while (!!arranje[left] || !!arranje[right]) {
    if ( (type === 'min' && (!arranje[right] || arranje[left] < arranje[right]))
      || (type === 'max' && (!arranje[right] || arranje[left] > arranje[right]))
    ) {
      arranje[pos] = arranje[left];
      pos = left;
    }
    if ( (type === 'min' && (!arranje[right] || arranje[left] > arranje[right]))
      || (type === 'max' && (!arranje[right] || arranje[left] < arranje[right]))
    ) {
      arranje[pos] = arranje[right];
      pos = right;
    }
    left = pos << 1;
    right = left + 1;
  }
  arranje.splice(pos, 1);
  return arranje;
}

function isHeap(type, arranje) {
  if (type === 'min') {
    for (let i = 2; i < arranje.length; i++)
      if (arranje[i] < arranje[getFatherPos(i)])
        return false;
    return true;
  }
  if (type === 'max') {
    for (let i = 2; i < arranje.length; i++)
      if (arranje[i] > arranje[getFatherPos(i)])
        return false;
    return true;
  }
}