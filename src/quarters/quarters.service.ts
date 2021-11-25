import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuarterRepository } from "./quarters.repository";
import { UserRole } from "../users/user-roles.enum";
import { CreateQuarterDto } from "./dtos/create-quarter.dto";
import { UpdateQuarterDto } from "./dtos/update-quarter.dto";
import { Quarter } from "./quarter.entity";

@Injectable()
export class QuartersService {
  constructor(
    @InjectRepository(QuarterRepository)
    private quarterRepository: QuarterRepository
  ) {}

  async createQuarter(createQuarterDto: CreateQuarterDto): Promise<Quarter> {
    return this.quarterRepository.createQuarter(
      createQuarterDto,
      UserRole.MANAGER
    );
  }

  async findAll() {
    return this.quarterRepository.find();
  }

  async findOne(quarterId: string): Promise<Quarter> {
    const quarter = await this.quarterRepository.findOne(quarterId, {
      select: ["quarter", "id"],
    });

    if (!quarter) throw new NotFoundException("Quarter não encontrado");

    return quarter;
  }

  async findObjectiveByQuarter(quarter: string): Promise<Quarter[]> {
    const quarters = await this.quarterRepository.findObjectiveByQuarter(
      quarter
    );

    if (!quarters) throw new NotFoundException("Quarter não possui objetivos");

    return quarters;
  }

  async findObjectiveByQuarterByTeam(
    quarter: string,
    id: string
  ): Promise<any> {
    const quarters = await this.quarterRepository.findObjectiveByQuarterByTeam(
      quarter,
      id
    );

    if (!quarters)
      throw new NotFoundException("Time não possui objetivos com esse quarter");

    return quarters;
  }

  async updateQuarter(
    updateQuarterDto: UpdateQuarterDto,
    id: string
  ): Promise<Quarter> {
    const quarters = await this.findOne(id);
    const { quarter } = updateQuarterDto;
    quarters.quarter = quarter ? quarter : quarters.quarter;

    try {
      await quarters.save();
      return quarters;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro ao atualizar os dados no banco de dados"
      );
    }
  }

  async deleteQuarter(quarterId: string) {
    const result = await this.quarterRepository.delete({ id: quarterId });
    if (result.affected === 0) {
      throw new NotFoundException(
        "Não foi encontrado um quarter com o ID informado"
      );
    }
  }
}
