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
      result.history.push({
        date: snapshot.date,
        info: tmpInfo,
        coinCount,
      });
      if (parseFloat(tmpInfo.price_usd) > result.max_price_usd) result.max_price_usd = parseFloat(tmpInfo.price_usd);
      let newWorstRankPercent = parseFloat(tmpInfo.rank) / coinCount * 100;
      if (newWorstRankPercent > result.worst_rank_percent) result.worst_rank_percent = newWorstRankPercent;
    });
    return result;
  }
}

module.exports = CoinSearch;
