//给用户的WEB浏览器提供静态文件

var http = require('http');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};  //用来缓存文件内容的对象

function send404(response) {  //所请求文件不存在时发送404错误
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

function sendFile(response, filePath, fileContents) {  //提供文件数据服务
  response.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {  //在缓存中寻找静态文件
  if (cache[absPath]) {  //检查文件是否缓存在内存中
    sendFile(response, absPath, cache[absPath]);  //从内存中返回文件
  } else {
    fs.exists(absPath, function(exists) {  //检查文件是否存在
      if (exists) {
        fs.readFile(absPath, function(err, data) {  //从硬盘中读取文件
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);  //从硬盘中读取文件并返回
          }
        });
      } else {
        send404(response);  //发送 HTTP 404 响应
      }
    });
  }
}

var server = http.createServer(function(request, response) { //创建 HTTP 服务器
  var filePath = false;

  if (request.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }

  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);  //返回静态文件
});

server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);  //启动Socket.io服务器，给它提供一个已经定义好的HTTP服务器，这样两者就能共享同一个TCP/IP端口
