const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json()); // data stream -> json -> js object -> req.body
app.use(router);
app.use((err, req, res, next) => {
  // bad practice
  res.status(500).send(err);
});

module.exports = app;
