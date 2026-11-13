CREATE TABLE users (
  id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email    TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);


CREATE TABLE vacancies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  company TEXT,
  salary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
