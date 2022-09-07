function lessFrequentPos(hits) {
  let lessFreqPos = [0];
  let lessHit = hits[0];
  for (let i = 1; i < hits.length; i++) {
    if (hits[i] < lessHit) {
      lessHit = hits[i];
      lessFreqPos = [i];
    } else if (hits[i] === lessHit) {
      lessFreqPos.push(i);
    }
  }
  return lessFreqPos;
}

module.exports = { lessFrequentPos };