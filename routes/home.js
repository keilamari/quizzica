const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //home page to see public quizzes
  router.get('/', (req, res) => {
    db.query(`
    SELECT * FROM quizzes WHERE isPrivate = FALSE;
    `)
    .then(data => {
      const templateVar = {quizzes: data.rows, user_id: req.params.user_id};
      res.redirect('/users/1');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
