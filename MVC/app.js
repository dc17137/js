// 定义mimetype
var mimeType = {
	".jpg":"image/jpeg",
	".html":"text/html",
	".png":"image/png",
	".json":"text/plain",
	".txt":"text/plain",
	".gif":"image/gif",
	".js":"text/plain",
	".css":"text/css"
}
// 引入http 
var fs = require("fs");
var http = require("http");
var url = require("url");
var path = require("path");
var server = http.createServer(function(req,res){
		// 判断到底是静态资源还是接口
		var url_obj = url.parse(req.url,true);
		var query_obj = url_obj.query;
		var pathname = decodeURIComponent(url_obj.pathname);
		if(pathname === "/xxx"){
			// 是接口
		}else{
			// 是静态资源
      var pathObj = path.parse(pathname);
      var extName = pathObj.ext;

      fs.readFile("."+pathname,function(err,data){
      	if(err){
      		res.setHeader("content-type","text/html");
      		res.end("抱歉，读取的文件不存在，请重新检测"+"<Strong>"+pathname+"</Strong>");
      		return;
      	}
      	res.setHeader("content-type",mimeType[extName])
      	res.end(data);
      })
		}
})
server.listen(3000);