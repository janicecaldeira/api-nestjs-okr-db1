import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TeamRepository } from "./teams.repository";
import { UserRole } from "../users/user-roles.enum";
import { CreateTeamDto } from "./dtos/create-team.dto";
import { UpdateTeamDto } from "./dtos/update-team.dto";
import { Team } from "./team.entity";

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamRepository.createTeam(createTeamDto, UserRole.MANAGER);
  }

  async findAll() {
    return this.teamRepository.find({
      relations: ["users"],
    });
  }

  async findOne(teamId: string): Promise<Team> {
    const team = await this.teamRepository.findOne(teamId, {
      select: ["team", "id"],
    });

    if (!team) throw new NotFoundException("Time não encontrado");

    return team;
  }

  async findObjectiveByTeam(teamId: string): Promise<Team[]> {
    const objectives = await this.teamRepository.findObjectiveByTeam(teamId);

    if (!objectives) throw new NotFoundException("Time não possui objetivos");

    return objectives;
  }

  async findUsersByTeam(teamId: string): Promise<Team[]> {
    const team = await this.teamRepository.findUsersByTeam(teamId);

    if (!team) throw new NotFoundException("Time não possui usuários");

    return team;
  }

  async updateTeam(updateTeamDto: UpdateTeamDto, id: string): Promise<Team> {
    const tm = await this.findOne(id);
    const { team } = updateTeamDto;
    tm.team = team ? team : tm.team;

    try {
      await tm.save();
      return tm;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro ao atualizar os dados no banco de dados"
      );
    }
  }

  async deleteTeam(teamId: string) {
    const result = await this.teamRepository.delete({ id: teamId });
    if (result.affected === 0) {
      throw new NotFoundException(
        "Não foi encontrado um time com o ID informado"
      );
    }
  }
}
