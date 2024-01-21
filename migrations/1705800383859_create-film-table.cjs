/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE film (
      uuid UUID PRIMARY KEY,
      imdb_id TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      release_date DATE,
      title_vector tsvector,
      created_at TIMESTAMPTZ DEFAULT current_timestamp,
      updated_at TIMESTAMPTZ DEFAULT current_timestamp
    );

    CREATE INDEX idx_imdb_id ON film (imdb_id);
    CREATE INDEX idx_release_date ON film (release_date);
    CREATE INDEX idx_title_vector ON film USING gin(title_vector);
`)
};

exports.down = pgm => {
  pgm.sql(`
    DROP INDEX IF EXISTS idx_title_vector;
    DROP INDEX IF EXISTS idx_release_date;
    DROP INDEX IF EXISTS idx_imdb_id;
    
    DROP TABLE IF EXISTS film; 
  `)
};
