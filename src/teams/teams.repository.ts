import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Team } from "./team.entity";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { UserRole } from "../users/user-roles.enum";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async createTeam(
    createTeamDto: CreateTeamDto,
    role: UserRole
  ): Promise<Team> {
    const { team } = createTeamDto;
    const tm = this.create();
    tm.team = team;

    try {
      await tm.save();
      return tm;
    } catch (error) {
      if (error.code.toString() === "23505") {
        throw new ConflictException("Time já cadastrado!");
      } else {
        throw new InternalServerErrorException(
          "Erro ao salvar o time no banco de dados"
        );
      }
    }
  }

  async findObjectiveByTeam(id: string): Promise<any> {
    const query = this.createQueryBuilder("team");
    query.where("team.id = :id", { id });
    query.innerJoinAndSelect("team.objectives", "objectives");
    query.innerJoinAndSelect("objectives.owner", "owner");
    query.innerJoinAndSelect("objectives.year", "year");
    query.innerJoinAndSelect("objectives.quarter", "quarter");
    query.select(["team", "objectives", "owner", "year", "quarter"]);
    return await query.getMany();
  }

  async findUsersByTeam(id: string): Promise<any> {
    const query = this.createQueryBuilder("team");
    query.where("team.id = :id", { id });
    query.innerJoinAndSelect("team.users", "users");
    query.select(["team.id", "users"]);
    return await query.getMany();
  }
}
