// index.js
const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const dbFile = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public')
});

const port = process.env.PORT || 4000;

server.use(middlewares);

server.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is listening on port ${port}`);
});
