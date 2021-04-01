/* 
  СЛУШАТЬ ПОРТ +
  РАБОТА С ЗАПРОСАМИ (СЛУШАТЬ\ОТВЕЧАТЬ )
  РАБОТА С БД
*/
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`APP started on port: ${port}`);
});
