let http = require("http");
let url = require("url");
let fs = require("fs");


function startServer(actions) {
    http.createServer((req, res) => {
        let q = url.parse(req.url, true);
        console.log(q);

        if (q.pathname.startsWith("/api")) {
            let action = q.pathname.substring(4);
            if (!actions[action]) {
                res.writeHead(400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
                res.end("no such action"); return;
            }
            actions[action](req, res, q);
           
        } else {
            const allowedContentTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript'
            };
            let filename = null;
            if (q.pathname == '/')
                filename = "/index.html";
            else filename = q.pathname;

            let indexOfDot = filename.indexOf(".");
            if (indexOfDot == -1) {
                res.writeHead(400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
                res.end("invalid file name"); return;
            }
            let extension = filename.substring(indexOfDot);
            let contentType = null;

            console.log(extension);
            if (!allowedContentTypes[extension]) {
                res.writeHead(400, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
                res.end("the extention is not suported"); return;
            }
            contentType = allowedContentTypes[extension];
            fs.readFile(filename.substring(1), (err, data) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/plain", 'Access-Control-Allow-Origin': '*' });
                    res.end("file not found"); return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
                res.end(data);
            });



        }

    }).listen(8080);
}

exports.startServer = startServer;
