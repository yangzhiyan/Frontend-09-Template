const net = require('net');

class Request {
  constructor (options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
    if (this.headers['Content-Type'] === 'application/json')
      this.bodyText = JSON.stringify(this.body);
    else if(this.headers['content-Type'] === 'application/x-www-form-urlencoded') 
      this.bodyText = Object.keys(this.body).map(key => `${key} = ${encodeURIComponent(this.body[key])}`).join('&')
    // length 不建议在外边传  
    this.headers['Content-Length'] = this.bodyText.length;
  }

  send () {
    return new Promise ((resolve, reject) => {
      const parser = new ResponseParser;
      resolve('')
    });
  }
}

class ResponseParser {
  constructor() {

  }
  receive (string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
    receiveChar (char);
  }
}

void async function () {
  let req =  new Request ({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',
    headers: {
      ['X-Foo2']: 'cunstomed'
    },
    body: {
      name: 'yzy'
    }
  });
  let res = await request.send();
  console.log(res);
}