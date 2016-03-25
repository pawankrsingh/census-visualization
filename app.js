var express = require('express');
var request = require('request');
var app = express();

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 2020);


app.get('/counter', function (req, res) {
  //Calling Counter Webservice
  var counterURL ='http://fastwebcounter.com/secure.php?s=censusviz.azurewebsites.net';
  request(counterURL, function (error, response, body) {
   if (!error && response.statusCode == 200) {
      var results = 343;
      var re1='.*?';	// Non-greedy match on filler
      var re2='(\\d+)';	// Integer Number 1
      var p = new RegExp(re1+re2,["i"]);
      var m = p.exec(body);
      if (m != null)
      {
          var int1=m[1];
          results =int1.replace(/</,"&lt;");
      }
      //res.send(results);
      res.send(JSON.stringify({ counter: results }));
    }
   else{ res.send(JSON.stringify({ counter: 343 }));}
  });

});
