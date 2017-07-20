var fs = require('fs');
		// stdin = process.stdin,//一个指向 标准输入流(stdin) 的可读流(Readable Stream)。标准输入流默认是暂停 (pause) 的，所以必须要调用 process.stdin.resume() 来恢复 (resume) 接收:
		// stdout = process.stdout;//一个指向标准输出流(stdout)的 可写的流(Writable Stream)
var stats = [];

fs.readdir(process.cwd(), function(err, files) {//这里的process.cwd()表示返回运行当前脚本的工作目录的路径;（Current Work Directory）
		console.log(' ');

		if (!files.length) {
				return console.log(' \033[31m No files to show!\033[39m\n');
		}

		function file(i) {

				var filename = files[i];


				fs.stat(__dirname + '/' + filename, function(err, stat) { //fs.stat//获取文件信息
						stats[i] = stat;
						//显示
						if (stat.isDirectory()) { //如果是目录返回 true，否则返回 false。
								console.log(' ' + i + ' \033[36m' + filename + '/\033[39m');
						} else {
								console.log(' ' + i + ' \033[90m' + filename + '\033[39m');
						}

						i++;
						//判断是否继续
						if (i == files.length) {//穷举完了所有文件
								// read();
						} else {//未穷举完所有文件
								file(i);
						}
				});
		}

		// function read() {
		// 		console.log(' ');
		// 		stdout.write(' \033[33mEnter your choice : \033[39m');
		// 		stdin.resume();
		// 		stdin.setEncoding('utf8');
		// 		stdin.on('data', option);
		// }
		//
		// function option(data) {
		// 		var filename = files[Number(data)];
		// 		if (!files[Number(data)]) {
		// 				stdout.write(' \033[mEnter your choice : \033[39m');
		// 		} else if (stats[Number(data)].isDirectory()) {
		// 				fs.readdir(__dirname + '/' + filename, function(err, files) {
		// 						console.log(' ');
		// 						console.log(' (' + files.length + 'files)');
		// 						files.forEach(function(file) {
		// 								console.log(' - ' + file);
		// 						});
		// 						console.log(' ');
		// 				});
		// 		} else {
		// 				stdin.pause();
		// 				fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
		// 						console.log(' ');
		// 						console.log('\033[90m' + data.replace(/(.*) /g, ' $1') + '\033[39m');
		// 				});
		// 		}
		// }

		file(0);
});
