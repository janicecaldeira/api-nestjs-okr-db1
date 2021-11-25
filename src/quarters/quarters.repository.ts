import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Quarter } from "./quarter.entity";
import { CreateQuarterDto } from "./dtos/create-quarter.dto";
import { UserRole } from "../users/user-roles.enum";

@EntityRepository(Quarter)
export class QuarterRepository extends Repository<Quarter> {
  async createQuarter(
    createQuarterDto: CreateQuarterDto,
    role: UserRole
  ): Promise<Quarter> {
    const { quarter } = createQuarterDto;
    const quarters = this.create();
    quarters.quarter = quarter;

    try {
      await quarters.save();
      return quarters;
    } catch (error) {
      if (error.code.toString() === "23505") {
        throw new ConflictException("Quarter já cadastrado!");
      } else {
        throw new InternalServerErrorException(
          "Erro ao salvar o ano no banco de dados"
        );
      }
    }
  }

  async findObjectiveByQuarter(quarter: string): Promise<any> {
    const query = this.createQueryBuilder("quarter");
    query.where("quarter.quarter = :quarter", { quarter });
    query.innerJoinAndSelect("quarter.objectives", "objectives");
    query.innerJoinAndSelect("objectives.team", "team");
    query.innerJoinAndSelect("objectives.owner", "owner");
    query.select(["quarter.quarter", "objectives", "team", "owner.username"]);
    return await query.getMany();
  }

  async findObjectiveByQuarterByTeam(
    quarter: string,
    id: string
  ): Promise<any> {
    const query = this.createQueryBuilder("quarter");
    query.where("quarter.quarter = :quarter", { quarter });
    query.andWhere("team.id = :id", { id });
    query.innerJoinAndSelect("quarter.objectives", "objectives");
    query.innerJoinAndSelect("objectives.team", "team");
    query.innerJoinAndSelect("objectives.owner", "owner");
    query.select(["quarter.quarter", "objectives", "team", "owner.username"]);
    return await query.getMany();
  }
}
