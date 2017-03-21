var exec = require("child_process").exec;

function start(response) {  //传response
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {  //精辟之处，像这样把response传进来才是非阻塞异步的
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
