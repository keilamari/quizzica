-- Drop and recreate Attempts table (Example)
DROP TABLE IF EXISTS quiz_attempts CASCADE;
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id)  ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  score INTEGER
);
