const http = require('http');
const { request } = require('node:http');

http.createServer((req, res) => {
  let body = [];
  request.on('error', err => {
    console.error(err)
  }).on('data', chunk => {
    body.push(chunk.toString());
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log('body:', body);
    res.writaHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World\n')
  })
}).listen(8088);

console.log('Server started')