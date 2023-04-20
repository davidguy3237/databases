var db = require('../db');

module.exports = {
  getAll: function () {
    db.connect();
    const queryString = 'SELECT * FROM messages';
    const queryArgs = [];

    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        return results;
      }
    });

    db.end();
  }, // a function which produces all the messages

  create: function ({username, message, roomname, createdAt}) {
    db.connect();
    const queryString = `INSERT INTO messages(username, message, roomname, createdAt),
    VALUES(${username}, ${message}, ${roomname}, ${createdAt})`;

    db.query(queryString, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    });
    db.end();
  } // a function which can be used to insert a message into the database
};
let test = {
  username: 'bob',
  message: 'this is working',
  roomname: 'lobby',
  createdAt: 'nasa'
};
module.exports.create(test);
/*

message = {
  username:
  message:
  roomname:
  createdAt:
}

*/