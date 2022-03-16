/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    db.query(`SELECT * FROM quizzes WHERE isPrivate = FALSE;`)
      .then(data => {
        const templateVars = {quizzes: data.rows, user_id: req.params.user_id};
        res.render('../views/home', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:user_id/makequiz", (req, res) => {
    let templateVar = { user_id: req.params.user_id };
    res.render('../views/makeQuiz', templateVar);
  })
  return router;
};
