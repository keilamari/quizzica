-- Drop and recreate Quizzes table (Example)

DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  description VARCHAR(255),
  photo_url VARCHAR(255),
  is_public BOOLEAN DEFAULT true
  );
