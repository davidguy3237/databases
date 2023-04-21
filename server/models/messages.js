var db = require('../db');
var users = require('./users.js');
module.exports = {
  getAll: function (callback) {
    const queryString = 'SELECT * FROM messages';

    db.query(queryString, (err, results) => {
      callback(err, results);
    });
  }, // a function which produces all the messages

  create: function (messageObj, callback) {
    messageObj.createdAt = new Date().toUTCString();
    const { username, message, roomname, createdAt } = messageObj;
    const queryString = 'INSERT INTO messages(username, message, roomname, createdAt) VALUES(?, ?, ?, ?)';
    const queryArgs = [username, message, roomname, createdAt];

    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        throw err;
      } else {
        const queryString = 'SELECT * FROM messages ORDER BY id DESC LIMIT 1';
        db.query(queryString, (err, results) => {
          callback(err, results);
        });
      }
    });
  } // a function which can be used to insert a message into the database
};