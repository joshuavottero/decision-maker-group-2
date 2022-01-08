-- Users table seeds
INSERT INTO users (email) VALUES ('user1@decisions.com');
INSERT INTO users (email) VALUES ('user2@decisions.com');


-- Polls table seeds
INSERT INTO polls (title, description, creator_id) VALUES ('MOVIES', 'What is the best drama movie?', 1);
INSERT INTO polls (title, description, id) VALUES ('Italian Restaurant', 2);
INSERT INTO polls (title, description, id) VALUES ('Summer Vacation 2022', 'Planning our next trip!', 2);

-- Options table seeds
INSERT INTO options (poll_id, label, label_description)
VALUES (2,'Mamma Mia'),
       (2,'Nonna Giovannina'),
       (2,'Paolos');

INSERT INTO options (poll_id, label, label_description)
VALUES (3,'Beach', 'Cancun'),
       (3,'Camping', 'Muskoka'),
       (3,'Lake', 'Lake Louise');

INSERT INTO options (poll_id, label, label_description)
VALUES (1,'movie1', 'a girl that lost her teddy bear'),
       (1,'movie2', 'a dog that lost its blue ball'),
       (1,'movie3', 'a cat that lost its cardboard box');
