import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Year } from "./year.entity";
import { CreateYearDto } from "./dtos/create-year.dto";
import { UserRole } from "../users/user-roles.enum";

@EntityRepository(Year)
export class YearRepository extends Repository<Year> {
  async createYear(
    createYearDto: CreateYearDto,
    role: UserRole
  ): Promise<Year> {
    const { year } = createYearDto;
    const ano = this.create();
    ano.year = year;

    try {
      await ano.save();
      return ano;
    } catch (error) {
      if (error.code.toString() === "23505") {
        throw new ConflictException("Ano já cadastrado!");
      } else {
        throw new InternalServerErrorException(
          "Erro ao salvar o ano no banco de dados"
        );
      }
    }
  }

  async findObjectiveByYear(year: string): Promise<any> {
    const query = this.createQueryBuilder("year");
    query.where("year.year = :year", { year });
    query.innerJoinAndSelect("year.objectives", "objectives");
    query.innerJoinAndSelect("objectives.team", "team");
    query.innerJoinAndSelect("objectives.owner", "owner");
    query.select(["year.year", "objectives", "team", "owner.username"]);
    return await query.getMany();
  }

  async findObjectiveByYearByTeam(year: string, id: string): Promise<any> {
    const query = this.createQueryBuilder("year");
    query.where("year.year = :year", { year });
    query.andWhere("team.id = :id", { id });
    query.innerJoinAndSelect("year.objectives", "objectives");
    query.innerJoinAndSelect("objectives.team", "team");
    query.innerJoinAndSelect("objectives.owner", "owner");
    query.select(["year.year", "objectives", "team", "owner.username"]);
    return await query.getMany();
  }
}
