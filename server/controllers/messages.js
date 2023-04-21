var models = require('../models');
const db = require('../db');

module.exports = {
  get: function (req, res) {

    // models.messages.getAll((err, results) => {
    //   if (err) {
    //     console.log('FAILED TO GET MESSAGES: ', err);
    //     res.sendStatus(500);
    //   } else {
    //     console.log('SUCCESS HERE ARE THE MESSAGES: ', results);
    // }
    //});
    db.messages.findAll()
      .then((results) => {
        // if (err) {
        //   console.log('FIND ALL ERROR: ', err);
        // } else {
        // }
        console.log('GET ALL RESULTS: ', results);
        res.json(results);
      });
  }, // a function which handles a get request for all messages
  post: function (req, res) {

    // models.messages.create(req.body, (err, results) => {
    //   if (err) {
    //     console.log('FAILED TO GET MESSAGES: ', err);
    //     res.sendStatus(500);
    //   } else {
    //     res.writeHead(201, {'Content-Type': 'application/json'});
    //     res.json(results);
    //   }
    // });

    // db.users.findOrCreate({username: req.body[username]})
    //   .complete((err, user) => {

    //   });
    req.body.createdAt = new Date().toUTCString();
    db.messages.create(req.body)
      .then((results) => {
        console.log('RESULTS: ', results);
      });
  } // a function which handles posting a message to the database
};