CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id integer NOT NULL AUTO_INCREMENT,
  username text NOT NULL,
  message text NOT NULL,
  roomname text NOT NULL,
  createdAt text NOT NULL,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id integer NOT NULL AUTO_INCREMENT,
  name text NOT NULL,
  PRIMARY KEY (id)
);

-- ALTER TABLE messages ADD FOREIGN KEY (id_user) REFERENCES users(id);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

