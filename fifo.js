const { setHistory, checkLeastRecentlyFromValues } = require('./services/history');
const { input, pages } = require('./inputs');

const loaded = [];
const history = [];

function fifo() {
  for (const value of input) {
    const existingPos = loaded.findIndex(item => item === value);
    if(existingPos < 0) {
      let posToInsert;
      if (loaded.length < pages) {
        posToInsert = loaded.length;
      } else {
        posToInsert = checkLeastRecentlyFromValues(loaded, history);
      }
      loaded[posToInsert] = value;
      setHistory(value, history);
    }
  }
  // end
  console.log(loaded);
}

fifo();