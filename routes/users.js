/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/login/:id', (req,res) => {
    res.clearCookie('email');
    res.clearCookie('user_id');
    db.query(`SELECT * FROM users WHERE id = $1`, [req.params.id])
    .then(dbRes => {
      if (dbRes.rows.length > 0) {
        const email = dbRes.rows[0].email;
        req.session.email = dbRes.rows[0].email;
        req.session.user_id = req.params.id;
        res.cookie('email', email);
        res.cookie('user_id', req.params.id);
        res.redirect('/polls');
      } else {
        res.status(403).send('User does not exist in Database');
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};

