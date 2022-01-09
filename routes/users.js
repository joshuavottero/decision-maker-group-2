/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [req.session.email])
      .then(dbRes => {
        if (dbRes.rows[0]) {
          res.redirect('/polls');
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/login', (req,res) => {

  });

  router.post('/login', (req, res) => {
    const email = req.body.email;

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(dbRes => {
        if (dbRes.rows.length > 0) {
          req.session.email = email;
          res.cookie('email', email);
          res.redirect('/polls');
        }
        else {
          res.status(403).send('Email does not exist in Database');
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/logout', (req,res) => {
    res.clearCookie('email');
    res.redirect('/');
  });

  return router;
};


