import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Film {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({ type: 'text', unique: true, nullable: false })
  imdb_id: string

  @Column({ type: 'text', nullable: false })
  title: string

  @Column({ type: 'date', nullable: true })
  release_date: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date
}
