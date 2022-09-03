const input = [1, 2, 3, 1, 6, 1, 5, 1, 6, 4, 3, 1, 5, 4, 3, 1, 6, 3, 1, 2, 3, 4, 3, 2, 2, 2, 3, 4, 1, 1];
const pages = 3;
const loaded = [];
const hits = Array(pages).fill(0);
const latests = [];

function lfu() {
  for (const value of input) {
    const existingPos = alreadyExistsPos(value);
    if(existingPos < 0) {
      let posToInsert;
      const lessFrequent = lessFrequentPos();
      if (lessFrequent.length === 1) {
        posToInsert = lessFrequent[0];
      } else if (lessFrequent.length > 1) {
        posToInsert = checkLeastRecently(lessFrequent);
      }
      loaded[posToInsert] = value;
      hits[posToInsert] = 1;
    } else {
      hits[existingPos]++;
    }
    setLatestsList(value);
  }
  // end
  console.log(loaded);
}

function alreadyExistsPos(value) {
  for (let j = 0; j < pages; j++)
    if (value === loaded[j]) return j;
  return -1;
}

function lessFrequentPos() {
  let lfPos = [];
  let lfHits = 1000;
  for (let i = 0; i < pages; i++) {
    if (hits[i] === lfHits && lfHits > 0) {
      lfPos.push(i);
    } else if (hits[i] < lfHits) {
      lfHits = hits[i];
      lfPos = [];
      lfPos[0] = i;
    } 
  }
  return lfPos;
}

function setLatestsList(value) {
  for (let i = 0; i < latests.length; i++) {
    if (value === latests[i]) {
      latests.splice(i, 1);
    }
  }
  latests[latests.length] = value;
}

function checkLeastRecently(arrayOfPos) {
  let leastRecentlyPos;
  let leastRecentlyI = pages;
  for (const pos of arrayOfPos) {
    for (let i = 0; i < latests.length; i++) {
      if (loaded[pos] === latests[i] && i < leastRecentlyI) {
        leastRecentlyI = i;
        leastRecentlyPos = pos;
      }
    }
    if (leastRecentlyPos === undefined) return pos;
  }
  return leastRecentlyPos;
}

lfu()