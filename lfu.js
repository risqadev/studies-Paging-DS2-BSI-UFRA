const { setHistory, checkLeastRecentlyFromPos } = require('./services/history');
const { lessFrequentPos } = require('./services/frequency');
const { input, pages } = require('./inputs');

const loaded = [];
const history = [];
const hits = Array(pages).fill(0);

function lfu() {
  for (const value of input) {
    const existingPos = loaded.findIndex(item => item === value);
    if(existingPos < 0) {
      let posToInsert;
      if (loaded.length < pages) {
        posToInsert = loaded.length;
      } else {
        const lessFrequent = lessFrequentPos(hits);
        if (lessFrequent.length === 1) {
          posToInsert = lessFrequent[0];
        } else if (lessFrequent.length > 1) {
          posToInsert = checkLeastRecentlyFromPos(loaded, history, lessFrequent);
        }
      }
      loaded[posToInsert] = value;
      hits[posToInsert] = 1;
    } else {
      hits[existingPos]++;
    }
    setHistory(value, history);
  }
  // end
  console.log(loaded);
}

lfu();