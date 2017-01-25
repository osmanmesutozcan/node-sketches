const http = require('http');
const PORT = process.env.PORT || 3000;

const logger = require('./util.js').logger;
const router = require('./router.js')();
const Websocket = require('./websocket/server.js');

router.addRoute('/', __dirname + '/../index.html');
router.addRoute('/websocket', __dirname + '/websocket/index.html');

const server = http.createServer((req, res) => {
  router.listen(req, res);
  logger(req, res);
}).listen(3000, () => console.log('Running on: ' + PORT));

const ws = new Websocket(server);
ws.on('connection', (ws) => {
  ws.on('message', (data) => {
    ws.send(data, data => console.log(data));
  });
  ws.emit('message', 'Lorem ipsum dolor sit amet');  
});
