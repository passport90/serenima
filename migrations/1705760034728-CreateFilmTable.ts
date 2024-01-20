import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFilmTable1705760034728 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX IF EXISTS idx_title_vector;
        DROP INDEX IF EXISTS idx_release_date;
        DROP INDEX IF EXISTS idx_imdb_id;
        
        DROP TABLE IF EXISTS film; 
    `)
  }
}
