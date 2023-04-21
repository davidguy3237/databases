var models = require('../models');
const db = require('../db');

module.exports = {
  get: function (req, res) {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify(models.users.getAll()));
    db.users.findAll()
      .then((results) => {
        res.json(results);
      });
  },
  post: function (req, res) {
    // let data = [];
    // data.push(req.body);
    // models.users.create(req.body);
    // res.writeHead(201, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify(data));

    db.users.create({username: req.body.username})
      .then((results) => {
        res.json(results);
      });
  }
};
