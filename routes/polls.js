/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const email = 'user2@decisions.com';
    req.session.email = email;

    let query = `
    SELECT * FROM polls
    JOIN users ON users.id = creator_id
    WHERE email = $1
    `;
    console.log(query);
    db.query(query, [req.session.email])
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
  return router;
};
