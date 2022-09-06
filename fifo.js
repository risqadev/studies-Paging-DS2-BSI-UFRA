const input = [1, 2, 3, 1, 6, 1, 5, 1, 6, 4, 3, 1, 5, 4, 3, 1, 6, 3, 1, 2, 3, 4, 3, 2, 2, 2, 3, 4, 1, 1];
const pages = 3;
const loaded = [];
const history = [];

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
      loaded[posToInsert] = value;
      setHistory(value);
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

function setHistory(value) {
  for (let i = 0; i < history.length; i++) {
    if (value === history[i]) {
      history.splice(i, 1);
    }
  }
  history[history.length] = value;
}

function checkLeastRecently() {
  let leastRecentlyPos;
  let leastRecentlyI = history.length;
  for (const pos in loaded) {
    for (let i = leastRecentlyI - 1; i >= 0 ; i--) {
      if (loaded[pos] === history[i] && i < leastRecentlyI) {
        leastRecentlyI = i;
        leastRecentlyPos = parseInt(pos);
      }
    }
    // if (leastRecentlyPos === undefined) return pos;
  }
  return leastRecentlyPos;
}

fifo();