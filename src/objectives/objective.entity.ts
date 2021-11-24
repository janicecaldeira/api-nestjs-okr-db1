import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { KeyResult } from 'src/key-results/key-result.entity';
import { Team } from 'src/teams/team.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Year } from 'src/years/year.entity';
import { Quarter } from 'src/quarters/quarter.entity';

@Entity()
@Unique(['id'])
export class Objective extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 120 })
  @ApiProperty({ description: 'Especificar objetivo' })
  objective: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty({ description: 'Tipo de objetivo' })
  type: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Data inicial' })
  initial_date: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Data final' })
  end_date: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  @ApiProperty()
  unity: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (owner) => owner.objectives, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: User;

  @JoinColumn({ name: 'key_result_id' })
  @OneToMany(() => KeyResult, (key_results) => key_results.objective, {
    cascade: true,
  })
  key_results: KeyResult[];

  @JoinColumn({ name: 'objective_related_id' })
  @ManyToMany(
    () => Objective,
    (objective_related) => objective_related.objective,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  objective_related: Objective;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn({ name: 'year_id' })
  @ManyToOne(() => Year, (year) => year.objectives, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  year: Year;

  @JoinColumn({ name: 'quarter_id' })
  @ManyToOne(() => Quarter, (quarter) => quarter.objectives, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  quarter: Quarter;

  @JoinColumn({ name: 'team_id' })
  @ManyToOne(() => Team, (team) => team.objectives, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  team: Team;
}
