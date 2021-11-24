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
import { User } from 'src/users/user.entity';
import { Objective } from 'src/objectives/objective.entity';
import { Checkin } from 'src/checkin/checkin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['id'])
export class KeyResult extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  @ApiProperty({ description: 'Especificar resultado-chave' })
  key_result: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty({ description: 'Tipo de resultado-chave' })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty({ description: 'Frequência de mensuração' })
  frequency: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty({ description: 'Classificação de prioridade' })
  rating: string;

  @Column({ nullable: false, type: 'float' })
  @ApiProperty({ description: 'Valor inicial' })
  initial_value: number;

  @Column({ nullable: false, type: 'float' })
  @ApiProperty({ description: 'Meta prevista' })
  goal_value: number;

  @Column({ nullable: true, type: 'float' })
  @ApiProperty({ description: 'Valor atual em porcentagem' })
  status: number;

  @Column({ nullable: true, type: 'varchar', length: 120 })
  @ApiProperty({ description: 'Comentários extras' })
  comment: string;

  @Column({ type: 'boolean' })
  @ApiProperty()
  done: boolean;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (owner) => owner.key_results, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: User;

  @ManyToOne(() => Objective, (objective) => objective.key_results, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  objective: Objective;

  @ManyToOne(() => Checkin, (checkin) => checkin.key_result, {
    cascade: true,
  })
  checkin: Checkin[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  @ApiProperty()
  color: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty()
  moonshot: string;
}
