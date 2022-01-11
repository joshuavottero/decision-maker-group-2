const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query (`SELECT * FROM polls WHERE creator_id=$1;`, [1])
    .then(data => {
      const polls = data.rows;
      const templateVars = { polls };

      res.render('polls', templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.get('/:id', (req, res) => {
    const pollId = req.params.id;

    db.query (`
    SELECT title, description, options.*
    FROM polls
    JOIN options ON polls.id = poll_id
    WHERE poll_id = $1;
    `, [pollId])
    .then(data => {
      const poll = data.rows;
      const templateVars = { poll };

      res.render('vote', templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.post('/:id', (req, res) => {
    const pollId = req.params.id;
    const points = Object.values(JSON.parse(req.body.vote));
    console.log(points);

    db.query (`
    SELECT * FROM options
    WHERE poll_id = $1
    ORDER BY id;
    `, [pollId])
    .then(data => {
      const options = data.rows;
      console.log(options);

      for (let i = 0; i < options.length; i++) {
        db.query (`
        UPDATE options
        SET points = $1
        WHERE poll_id = $2 AND id = $3;
        `, [points[i] + options[i].points, pollId, options[i].id])
        .catch(err => {
          res
          .status(504)
          .json({ error: err.message });
        });
      }

      res.redirect('/');
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};
