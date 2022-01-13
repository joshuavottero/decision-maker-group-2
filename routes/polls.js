/*
 * All routes for Polls are defined here
 * Since this file is loaded in server.js into api/polls,
 *   these routes are mounted onto /polls
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const { Template } = require('ejs');
const express = require('express');
const { Pool } = require('pg/lib');
const router  = express.Router();
const mailgunHelperFunction = require('../public/scripts/mailgun')

module.exports = (db, mailgun) => {
  router.get('/', (req, res) => {
    db.query (`SELECT *, to_char(description, 'dd-mm-yyyy') AS description, users.email, polls.id AS poll_id
    FROM polls
    JOIN users ON creator_id = users.id
    WHERE creator_id=$1`, [req.session.user_id])
    .then(data => {
      const polls = data.rows;
      const templateVars = { polls };

      return res.render('polls', templateVars);


      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/new', (req, res) => {
    res.render('poll-create');
  });

  router.get('/:id/results', (req, res) => {
    db.query(`SELECT title, description, users.name AS username, email, options.*
      FROM polls
      JOIN options ON polls.id = options.poll_id
      JOIN users ON users.id = creator_id
      WHERE polls.id = $1
      ORDER BY options.points DESC`, [req.params.id])
    .then(data => {
      const options = data.rows;
      let totalPoints = 0;

      for (const option of options) {
        totalPoints += Number(option.points);

        if (option.label_description) {
          option.fullLabel = `${option.label}: \n ${option.label_description}`;
        } else {
          option.fullLabel = option.label;
        }

        if (option.username) {
          option.userInfo = `${option.username} (${option.email})`;
        } else {
          option.userInfo = option.email;
        }
      }

      const totalVotes = totalPoints / (
        (options.length * (options.length / 2)) + (options.length - (options.length / 2))
        );
      const templateVars = { options, totalPoints, totalVotes };

      return res.render('results', templateVars);
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  // router.post('/:id', (req, res) => {

  // });

  router.post('/', async (req, res) => {
    let creatorId = -1;
    let pollId;
    let descriptionDate;
    let vote_link;
    let result_link;

    // select users by email
    // if exists set creatorId as res.rows.id
    await db.query(`SELECT * FROM users WHERE email=$1`, [req.body.email])
    .then(data => {
      if (data.rows.length>0){
        creatorId=data.rows[0].id;
      }
    })
    .catch(err => {
      res
      .status(501)
      .json({ error: err.message });
    });

    // else add user
      if (creatorId == -1){
    // add user
    await db.query(`INSERT INTO users (email) VALUES ($1) RETURNING *;`,[req.body.email])
    .then(data => {
      creatorId = data.rows[0].id;
    })
    .catch(err => {
      res
    .status(501)
    .json({ error: err.message });
    });
  };

      // add poll creator_id, title, description
      const valuesPolls = [creatorId, req.body.pollTitle, req.body.description, 'http://localhost:8080/polls/:id', 'http://localhost:8080/polls/:id/results']

      await db.query(`INSERT INTO polls (creator_id, title, description, vote_link, result_link) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,valuesPolls)
          .then(data => {
            pollId = data.rows[0].id;
          })
          await db.query(`SELECT to_char(description, 'dd-mm-yyyy') AS description FROM polls WHERE id = ${pollId}`)
          .then (data => {
            descriptionDate = data.rows[0].description;
          })
          .catch(err => {
            res
            .status(502)
            .json({ error: err.message });
          })
          .catch(err => {
            res
            .status(502)
            .json({ error: err.message });
          })


          // add id to links UPDATE poll table - only vote_link and result_link
         await db.query(`UPDATE polls SET vote_link = $1, result_link=$2 WHERE polls.id = $3`,[`http://localhost:8080/polls/${pollId}`, `http://localhost:8080/polls/${pollId}/results`, pollId])
          .then (data => {
          return  db.query(`SELECT * FROM polls WHERE id = ${pollId}`)
            .then(data => {
            vote_link = data.rows[0].vote_link;
            result_link = data.rows[0].result_link;

          })
          .catch (err => {
            res
            .status(503)
            .json({ error: err.message });});

          })
          .catch(err => {
            res
            .status(503)
            .json({ error: err.message });
          });

          // add options
          // the creator can add more several options. Add all options using for loop
            let arrLabels = Object.values(req.body).splice(4);
              for (let i= 0; i < arrLabels[0].length; i++) {
                let valuesOptions = [pollId, arrLabels[0][i], arrLabels[1][i]];
                await db.query(`INSERT INTO options (poll_id, label, label_description) VALUES ($1, $2, $3)`, valuesOptions)
              .catch(err => {
                 res
                 .status(504)
                 .json({ error: err.message });
                 });
               }

      // send emails
    let emailHTML = mailgunHelperFunction.sendEmail(req.body.email, req.body.pollTitle, req.body.name, vote_link, result_link, descriptionDate);

    mailgun.messages().send(emailHTML, (error, body) => {
      if(error) console.log(error)
      else console.log(body);
    });

    res.cookie('user_id', creatorId);
    req.session.user_id = creatorId;
    res.redirect('/polls');
    });

  router.get('/:id/delete', (req, res) => {
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
