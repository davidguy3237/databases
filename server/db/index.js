//var mysql = require('mysql2');
var Sequelize = require('sequelize');
//create a function that takes in paramters for a connection query

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

// module.exports = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat',
// });

// module.exports.connect((err) => {
//   if (err) {
//     console.log('CONNECTION ERROR: ', err);
//     throw err;
//   } else {
//     console.log('CONNECTION SUCCESS');
//   }
// });

const db = new Sequelize('chat', 'root', '', {
  dialect: 'mysql'
});

module.exports.messages = db.define('Messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
  createdAt: Sequelize.STRING
});

module.exports.users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.STRING
});


db.sync();

