/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();

    const tablename = 'Messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
    // dbConnection.query('truncate messages', done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM Messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // console.log('RESULTS: ', results);
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].message).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
    const username = 'bob';
    const message = 'hello';
    const roomname = 'lobby';
    const queryString = 'INSERT INTO Messages(username, message, roomname, createdAt) VALUES(?, ?, ?, ?)';
    const queryArgs = [username, message, roomname, 'test'];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[1].message).toEqual(message);
          expect(messageLog[1].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  it('should return the message that was posted with an id property', (done) => {
    const username = 'Loki';
    const message = 'I think this will work correctly.';
    const roomname = 'lobby';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/messages`, { username, message, roomname })
      .then((response) => {
        expect(response.data[0].id).toBeTruthy();
        done();
      })
      .catch(err => {
        throw err;
      });
  });

  it('should return the message that was posted with an createdAt property', (done) => {
    const username = 'WOOPER';
    const message = 'LOOK AT THE DATE';
    const roomname = 'lobby';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/messages`, { username, message, roomname })
      .then((response) => {
        console.log(response.data[0].createdAt);
        expect(response.data[0].createdAt).toBeTruthy();
        done();
      })
      .catch(err => {
        throw err;
      });
  });
});
