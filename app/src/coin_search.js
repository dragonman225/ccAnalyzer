const db = require('../assets/txtdb.json');

const CoinSearch = {
  search: (coinId) => {
    let result = {
      history: [],
      max_price_usd: 0,
      worst_rank_percent: 0
    };
    db.forEach((snapshot) => {
      let tmpInfo = snapshot.rankList.find(coin => coin.id === coinId);
      let coinCount = snapshot.rankList.length;
      if (typeof tmpInfo !== "undefined") {
        result.history.push({
          date: snapshot.date,
          info: tmpInfo,
          coinCount,
        });
        if (parseFloat(tmpInfo.price_usd) > result.max_price_usd) result.max_price_usd = parseFloat(tmpInfo.price_usd);
        let newWorstRankPercent = parseFloat(tmpInfo.rank) / coinCount * 100;
        if (newWorstRankPercent > result.worst_rank_percent) result.worst_rank_percent = newWorstRankPercent;
      }
    });
    return result;
  },

  getSMA: (coinId, frameLength = 1) => {
    let result = {
      dataSets: [],
      frameLength,
    }
    let history = CoinSearch.search(coinId).history;
    let frameStartIndex = 0, frameEndIndex = frameLength - 1;
    let tmpSum = 0;

    // Init frist mean
    for (let i = 0; i < frameLength; ++i) {
      tmpSum += parseFloat(history[i].info.price_usd);
    }
    result.dataSets.push({
      sma_price_usd: tmpSum / frameLength
    });

    // Calculate by moving the frame
    while (frameEndIndex < history.length - 1) {
      tmpSum -= parseFloat(history[frameStartIndex].info.price_usd);
      frameStartIndex += 1;
      frameEndIndex += 1;
      tmpSum += parseFloat(history[frameEndIndex].info.price_usd);
      result.dataSets.push({
        sma_price_usd: tmpSum / frameLength
      });
    }
    // old method, may be wrong
    /*
    for (let i = history.length; i > 0; i -= sampleCount) {
      if (i >= sampleCount) {
        let tmpSum = 0;
        for (let j = 0; j < sampleCount; ++j) {
            tmpSum += parseFloat(history[i-1-j].info.price_usd);
        }
        result.dataSets.push({
          time_frame_start: history[i-sampleCount].date,
          time_frame_end: history[i-1].date,
          mean_price_usd: tmpSum / sampleCount
        });
      }
      else {
        result.abandonedCount = i;
        break;
      }
    }
    */
    return result;
  }
}

module.exports = CoinSearch;
