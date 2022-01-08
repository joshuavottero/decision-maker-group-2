-- Drop and recreate Options table

DROP TABLE IF EXISTS Options CASCADE;

CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  label VARCHAR(255) NOT NULL,
  label_description TEXT,
  points INTEGER NOT NULL,
  poll_id INTEGER REFERENCES polls(id) DELETE ON CASCADE
);
