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
@Unique(["year"])
export class Year extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "ID" })
  id: string;

  @Column({ nullable: false, type: "varchar", length: 50 })
  @ApiProperty({ description: "Anos do sistema de gestão" })
  year: string;

  @OneToMany(() => Objective, (objectives) => objectives.year, {
    cascade: true,
  })
  @ApiProperty({ description: "Objetivos de cada time" })
  objectives: Objective[];
}
