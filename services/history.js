const setHistory = (value, history) => {
  for (const i in history) {
    if (value === history[i]) {
      history.splice(i, 1);
    }
  }
  history.push(value);
  // return history;
}

function checkLeastRecentlyFromValues(loaded, history) {
  let leastRecentlyPos;
  let leastRecentlyI = history.length;
  for (const pos in loaded) {
    for (let i = leastRecentlyI - 1; i >= 0 ; i--) {
      if (loaded[pos] === history[i] && i < leastRecentlyI) {
        leastRecentlyI = i;
        leastRecentlyPos = parseInt(pos);
      }
    }
  }
  return leastRecentlyPos;
}

function checkLeastRecentlyFromPos(loaded, history, positions) {
  let leastRecentlyPos;
  let leastRecentlyI = history.length;
  for (const pos of positions) {
    for (let i = leastRecentlyI - 1; i >= 0 ; i--) {
      if (loaded[pos] === history[i] && i < leastRecentlyI) {
        leastRecentlyI = i;
        leastRecentlyPos = parseInt(pos);
      }
    }
  }
  return leastRecentlyPos;
}

module.exports = { setHistory, checkLeastRecentlyFromValues, checkLeastRecentlyFromPos };