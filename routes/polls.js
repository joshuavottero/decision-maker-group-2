/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, mailgun) => {
  router.get('/', (req, res) => {
        db.query (`SELECT * FROM polls WHERE creator_id=$1`, [req.session.user_id])
    .then(data => {
        const polls = data.rows;
        res.json({ polls });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.get('/new', (req, res) => {

  // });

  // router.get('/results', (req, res) => {

  // });

  // router.get('/:id', (req, res) => {

  // });

  // router.post('/:id', (req, res) => {

  // });

  router.post('/', (req, res) => {
let creatorId;
let pollId;

    // select users by email
    // if exists set creatorId as res.rows.id
    // else add user

  // add user
    db.query(`INSERT INTO users (email) VALUES ($1) RETURNING *;`,[req.body.email])
    .then(data => {
      creatorId = data.rows[0].id;

      // add poll creator_id, title, description
      const valuesPolls = [creatorId, req.body.pollTitle, req.body.description, 'http://localhost:8080/polls/:id', 'http://localhost:8080/polls/:id/results']

      db.query(`INSERT INTO polls (creator_id, title, description, vote_link, result_link) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,valuesPolls)
    .then(data => {
      pollId = data.rows[0].id;

           // add id to links UPDATE poll table - only vote_link and result_link
          db.query(`UPDATE polls SET vote_link = $1, result_link=$2 WHERE polls.id = $3`,[`http://localhost:8080/polls/${pollId}`, `http://localhost:8080/polls/${pollId}/results`, pollId])
            .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });

    // add options

    // the creator can add more several options. Add all options using for loop
    for (const option of req.body.options) {
      let valuesOptions = [pollId, option.label, option.labelDescription]
      db.query(`INSERT INTO options (poll_id, label, label_description) VALUES ($1,$2,$3) RETURNING *;`, valuesOptions)
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    }
    // send emails
      const emailData = {
      "from": `test@sandbox69151c28390c4cadbc23a0d1cb8d2b2c.mailgun.org`,
      "to": req.body.recipients.join(),
      "subject": req.body.pollTitle,
      "text": `http://localhost:8080/polls/${pollId}`
    };

    mailgun.messages().send(emailData, (error, body) => {
      if(error) console.log(error)
      else console.log(body);
    });

    res.cookie('user_id', creatorId);
    req.session.user_id = creatorId;
    res.redirect('/polls');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  router.post('/:id/delete', (req, res) => {
    db.query (`DELETE FROM polls WHERE creator_id=$1 AND id=$2`, [req.session.user_id, req.params.id])
    .then(data => {
        res.redirect('/polls');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  return router;
};