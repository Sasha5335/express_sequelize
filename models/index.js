const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const config = require('../config/db.json');

const currentFileName = path.basename(__filename);

const dbConfig = config[process.env.NODE_ENV || 'development'];
const client = new Client(dbConfig);

client.connect();
process.on('beforeExit', () => client.end());

const db = {
  client,
};

fs.readdirSync(__dirname)
  .filter(fileName => /.js$/.test(fileName) && fileName !== currentFileName)
  .forEach(fileName => {
    const absPathToFile = path.resolve(__dirname, fileName);
    const Model = require(absPathToFile);
    Model.client = client;
    db[Model.name] = Model;
  });

module.exports = db;
