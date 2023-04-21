var db = require('../db');

module.exports = {
  getAll: function () {
    const queryString = 'SELECT name FROM users';
    db.query(queryString, (err, results) => {
      if (err) {
        console.log('Couldnt get USERS');
      } else {
        console.log('HERE ARE THE USERNAMES: ', results);
        return results;
      }
    });
  },
  create: function (messageObj) {
    // how to check for duplicate usernames?
    const {username} = messageObj;
    const queryString = 'INSERT INTO users (name) VALUES(?)';
    const queryArgs = [username];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log('invalid username', err);
      } else {
        console.log('successfully added username:', results);
      }
    });

  }
};