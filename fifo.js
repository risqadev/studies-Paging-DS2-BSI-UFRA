const input = [1, 2, 3, 1, 6, 1, 5, 1, 6, 4, 3, 1, 5, 4, 3, 1, 6, 3, 1, 2, 3, 4, 3, 2, 2, 2, 3, 4, 1, 1];
const pages = 3;
const loaded = [];
const latests = [];

function fifo() {
  for (const value of input) {
    const existingPos = alreadyExistsPos(value);
    if(existingPos < 0) {
      let posToInsert;
      if (loaded.length < pages) {
        posToInsert = loaded.length;
      } else {
        posToInsert = checkLeastRecently();
      }
      setLatestsList(value);
      loaded[posToInsert] = value;
    }
  }
  // end
  console.log(loaded);
}

function alreadyExistsPos(value) {
  for (let j = 0; j < pages; j++)
    if (value === loaded[j]) return j;
  return -1;
}

function setLatestsList(value) {
  for (let i = 0; i < latests.length; i++) {
    if (value === latests[i]) {
      latests.splice(i, 1);
    }
  }
  latests[latests.length] = value;
}

function checkLeastRecently() {
  let leastRecentlyPos;
  let leastRecentlyI = latests.length;
  for (const pos in loaded) {
    for (let i = leastRecentlyI - 1; i >= 0 ; i--) {
      if (loaded[pos] === latests[i] && i < leastRecentlyI) {
        leastRecentlyI = i;
        leastRecentlyPos = parseInt(pos);
      }
    }
    // if (leastRecentlyPos === undefined) return pos;
  }
  return leastRecentlyPos;
}

fifo();