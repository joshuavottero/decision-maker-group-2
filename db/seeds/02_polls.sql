-- Polls table seeds
INSERT INTO polls (creator_id, title, description, vote_link, result_link)
VALUES (1, 'Movies', '2022/12/02' , 'http://localhost:8080/polls/1', 'http://localhost:8080/polls/1/result');

INSERT INTO polls (creator_id, title, description, vote_link, result_link)
VALUES (1, 'Italian Restaurant', '2022/12/02', 'http://localhost:8080/polls/2', 'http://localhost:8080/polls/2/results');

INSERT INTO polls (creator_id, title, description, vote_link, result_link)
VALUES (2, 'Summer Vacation 2022', '2021/08/02' , 'http://localhost:8080/polls/3', 'http://localhost:8080/polls/3/results');

INSERT INTO polls (creator_id, title, description, vote_link, result_link)
VALUES (3, 'Rank these Studio Ghibli films!', '2022-01-16', 'http://localhost:8080/polls/4','http://localhost:8080/polls/4/results');
