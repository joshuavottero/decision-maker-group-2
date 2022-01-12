-- Options table seeds
INSERT INTO options (poll_id, label, label_description, points)
VALUES (1,'movie1', 'a girl that lost her teddy bear', 10),
       (1,'movie2', 'a dog that lost its blue ball', 5),
       (1,'movie3', 'a cat that lost its cardboard box', 1);

INSERT INTO options (poll_id, label, label_description, points)
VALUES (2,'Mamma Mia', NULL, 8),
       (2,'Nonna Giovannina', NULL, 4),
       (2,'Paolos', NULL, 2);

INSERT INTO options (poll_id, label, label_description, points)
VALUES (3,'Beach', 'Cancun', 1),
       (3,'Camping', 'Muskoka', 2),
       (3,'Lake', 'Lake Louise', 3),
       (3,'Adventure', 'Africa Safari', 4);

INSERT INTO options (poll_id, label, label_description)
VALUES (4, 'Spirited Away', 'A girl falls into the spirit world.'),
       (4, 'Princess Mononoke', 'A boy is cursed and saves humanity from itself.'),
       (4, 'Castle in the Sky', 'A girl is the last descendant of the people of the sky.'),
       (4, 'The Tale of Princess Kaguya', 'The Japanese folk story of the moon princess.'),
       (4, 'My Neighbour Totoro', 'A family moves into a new home with floof forest spirits for neighbours'),
       (4, 'Howl`s Moving Castle', 'A girl is cursed into old age by a witch and falls in love with a wizard');
