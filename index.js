// モジュール読み込み
var client = require('cheerio-httpcli');
var request = require('request');


// スクレイピング開始
setInterval(function(){
  //時刻データを取得して変数jikanに格納する
  var date = new Date();

  //時・分・秒を取得する
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  client.fetch('https://store.nintendo.co.jp/category/NINTENDOSWITCH/HAC_S_KAYAA.html', {}, function (err, $, res) {

    // 購入ボタン
    $('.add_area').each(function() {
      if ($(this).children().text() === 'SOLD OUT') {
        console.log(`[${hour}時${minute}分${second}秒] > `, 'まだSOLD OUT中');
      } else {
        console.log(`[${hour}時${minute}分${second}秒] > `, '再販！！');
        var options = {
          uri: "https://hooks.slack.com/services/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",
          headers: {
            "Content-type": "application/json",
          },
          json: {
            "text": "再販開始！！\thttps://store.nintendo.co.jp/category/NINTENDOSWITCH/HAC_S_KAYAA.html"
          }
        };
        request.post(options, function(error, response, body){});
      }

    });

  });

}, Math.floor( Math.random() * 10000 ) + 3000);
