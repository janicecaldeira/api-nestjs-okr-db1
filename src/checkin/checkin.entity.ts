import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { KeyResult } from 'src/key-results/key-result.entity';

@Entity()
@Unique(['id'])
export class Checkin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  date: string;

  @Column({ nullable: false, type: 'float' })
  current_value: number;

  @Column({ nullable: true, type: 'varchar', length: 120 })
  comment: string;

  @JoinColumn({ name: 'key_result_id' })
  @ManyToOne(() => KeyResult, (key_result) => key_result.checkin, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  key_result: KeyResult;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  color: string;
}
