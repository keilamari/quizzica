/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get('/', (req, res) => {
    res.redirect('/home')
  })

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

  router.get("/:user_id/my_quizzes", (req, res) => {

    db.query(`SELECT * FROM quizzes WHERE quizzes.user_id = ${req.params.user_id};`)
    .then(data => {
      const templateVars = {quizzes: data.rows, user_id: req.params.user_id};
      res.render('../views/my-quizzes', templateVars);
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

  router.post("/:user_id/makequiz", (req, res) => {
    let query = `INSERT INTO quizzes (user_id, name, description, isPrivate)
                VALUES ($1, $2, $3, $4) RETURNING id,isPrivate`;
    let values = [req.params.user_id, req.body.name, req.body.description, req.body.isPrivate];
      db.query(query, values)
        .then(data => {
          const quiz = data.rows;
          let quiz_id = quiz[0].id
          res.redirect(`/quiz/${quiz_id}/questions`);
        })
      .catch(err => {
        res.send(`Err : ${err.message}`);
      });
    });
    router.post("/:user_id/delete/:quiz_id", (req, res) => {
      db.query(`DELETE FROM quizzes WHERE id = $1 AND user_id = $2;`,
      [req.params.quiz_id, req.params.user_id])
      .then(() => {
        res.redirect(`/users/${req.params.user_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
  return router;
};
