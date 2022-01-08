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

  router.post('/login', (req, res) => {
    const email = req.body.email;

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(dbRes => {
        if (dbRes.rows) {
          req.session.email = email;
          res.redirect('/polls');
        }
        // email does not match error message
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    req.session.email = email;
  });
  return router;
};
