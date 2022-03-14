-- Drop and recreate Answers table (Example)

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id),
  is_correct BOOLEAN DEFAULT FALSE,
  value TEXT
  );
