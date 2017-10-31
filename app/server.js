const express = require('express');
const ejs = require('ejs');
const coinSearch = require('./src/coin_search');

const app = express();
app.set('view engine', 'ejs');

app.get('/:coinname', (req, res) => {
  let coinInfo = coinSearch.search(req.params.coinname);
  console.log(coinInfo);
  if (typeof coinInfo.history[0].info !== 'undefined') {
    res.render('backbone', {
      coinData: coinInfo.history,
      render_max_price_usd: coinInfo.max_price_usd * 1.1,
      render_worst_rank_percent: coinInfo.worst_rank_percent * 1.1
    });
  } else {
    // console.log("This is fxcking nodejs error! App is Actually fine.");
    // console.log("Why does it render before data is ready?");
    res.status(404).send();
  }
})

app.listen(8888, (err) => {
    if (err)
        console.log(err)
    else
        console.log('ccAnalyzer listening on 8888');
});
