-- Drop and recreate Questions table (Example)

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz INTEGER REFERENCES quizzes(id),
  question TEXT
  );
