import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import { Objective } from "src/objectives/objective.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Unique(["quarter"])
export class Quarter extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "ID" })
  id: string;

  @Column({ nullable: false, type: "varchar", length: 50 })
  @ApiProperty({ description: "Quarters do sistema de gestão" })
  quarter: string;

  @OneToMany(() => Objective, (objectives) => objectives.quarter, {
    cascade: true,
  })
  @ApiProperty({ description: "Objetivos de cada time" })
  objectives: Objective[];
}
