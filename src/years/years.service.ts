import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YearRepository } from './years.repository';
import { UserRole } from '../users/user-roles.enum';
import { CreateYearDto } from './dtos/create-year.dto';
import { UpdateYearDto } from './dtos/update-year.dto';
import { Year } from './year.entity';

@Injectable()
export class YearsService {
  constructor(
    @InjectRepository(YearRepository)
    private yearRepository: YearRepository,
  ) {}

  async createYear(createYearDto: CreateYearDto): Promise<Year> {
    return this.yearRepository.createYear(createYearDto, UserRole.MANAGER);
  }

  async findAll() {
    return this.yearRepository.find();
  }

  async findOne(yearId: string): Promise<Year> {
    const year = await this.yearRepository.findOne(yearId, {
      select: ['year', 'id'],
    });

    if (!year) throw new NotFoundException('Ano não encontrado');

    return year;
  }

  async findObjectiveByYear(year: string): Promise<Year[]> {
    const years = await this.yearRepository.findObjectiveByYear(year);

    if (!years) throw new NotFoundException('Ano não possui objetivos');

    return years;
  }

  async findObjectiveByYearByTeam(year: string, id: string): Promise<any> {
    const years = await this.yearRepository.findObjectiveByYearByTeam(year, id);

    if (!years)
      throw new NotFoundException('Time não possui objetivos com esse ano');

    return years;
  }

  async updateYear(updateYearDto: UpdateYearDto, id: string): Promise<Year> {
    const ano = await this.findOne(id);
    const { year } = updateYearDto;
    ano.year = year ? year : ano.year;

    try {
      await ano.save();
      return ano;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar os dados no banco de dados',
      );
    }
  }

  async deleteYear(yearId: string) {
    const result = await this.yearRepository.delete({ id: yearId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um ano com o ID informado',
      );
    }
  }
}
