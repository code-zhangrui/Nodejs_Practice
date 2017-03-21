var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";  //
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8"); //接收数据的编码格式为UTF-8

    request.addListener("data", function(postDataChunk) {  //注册了“data”事件的监听器，用于收集[每次]接收到的新数据块，并将其赋值给postData 变量
      postData += postDataChunk;  //
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");  //
    });

    request.addListener("end", function() {  //将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次
      route(handle, pathname, response, postData);  //把POST数据传递给请求路由，因为这些数据，请求处理程序会用到
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
