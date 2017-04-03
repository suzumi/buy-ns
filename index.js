var client = require('cheerio-httpcli');
var request = require('request');


setInterval(function(){
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  client.fetch('[target url]', {}, function (err, $, res) {

    // 購入ボタン
    $('.add_area').each(function() {
      if ($(this).children().text() === 'SOLD OUT') {
        console.log(`[${hour}時${minute}分${second}秒] > `, 'まだSOLD OUT中');
      } else {
        console.log(`[${hour}時${minute}分${second}秒] > `, '再販！！');
        var options = {
          uri: "[your incomming web hook url]",
          headers: {
            "Content-type": "application/json",
          },
          json: {
            "text": "再販開始！！"
          }
        };
        request.post(options, function(error, response, body){});
      }

    });

  });

}, Math.floor( Math.random() * 10000 ) + 3000);
