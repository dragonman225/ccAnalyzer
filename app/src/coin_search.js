const db = require('../assets/txtdb.json');

const CoinSearch = {
  search: (coinId) => {
    let result = [];
    db.forEach((snapshot) => {
      let tmpInfo = snapshot.rankList.find(coin => coin.id === coinId);
      let coinCount = snapshot.rankList.length;
      result.push({
        date: snapshot.date,
        info: tmpInfo,
        coinCount
      });
    });
    return result;
  }
}

module.exports = CoinSearch;
