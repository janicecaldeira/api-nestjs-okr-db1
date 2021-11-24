import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Objective } from './objective.entity';
import { CreateObjectiveDto } from './dtos/create-objective.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(Objective)
export class ObjectiveRepository extends Repository<Objective> {
  async createObjective({
    createObjectiveDto,
    role,
  }: {
    createObjectiveDto: CreateObjectiveDto;
    role: UserRole;
  }): Promise<Objective> {
    const {
      objective,
      type,
      initial_date,
      end_date,
      unity,
      team,
      owner,
      key_results,
      objective_related,
      year,
      quarter,
    } = createObjectiveDto;
    const obj = this.create();
    obj.objective = objective;
    obj.type = type;
    obj.initial_date = initial_date;
    obj.end_date = end_date;
    obj.unity = unity;
    obj.team = team;
    obj.owner = owner;
    obj.key_results = key_results;
    obj.objective_related = objective_related;
    obj.year = year;
    obj.quarter = quarter;

    try {
      await obj.save();
      return obj;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Objetivo já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o objetivo no banco de dados',
        );
      }
    }
  }

  async findKeyResult(id: string): Promise<any> {
    const query = this.createQueryBuilder('objective');
    query.where('objective.id = :id', { id });
    query.innerJoinAndSelect('objective.key_results', 'key_results');
    query.innerJoinAndSelect('key_results.owner', 'owner');
    query.select(['objective.id', 'key_results', 'owner']);
    query.orderBy('key_results.createdAt', 'ASC');
    return await query.getOne();
  }
}
