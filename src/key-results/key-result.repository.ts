import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { KeyResult } from './key-result.entity';
import { CreateKeyResultDto } from './dtos/create-key-result.dto';
import { UserRole } from '../users/user-roles.enum';

@EntityRepository(KeyResult)
export class KeyResultRepository extends Repository<KeyResult> {
  async createKeyResult(
    createKeyResultDto: CreateKeyResultDto,
    role: UserRole,
  ): Promise<KeyResult> {
    const {
      key_result,
      type,
      frequency,
      rating,
      initial_value,
      goal_value,
      status,
      comment,
      done,
      owner,
      objective,
      color,
      moonshot,
    } = createKeyResultDto;
    const kr = this.create();
    kr.key_result = key_result;
    kr.type = type;
    kr.frequency = frequency;
    kr.rating = rating;
    kr.initial_value = initial_value;
    kr.goal_value = goal_value;
    kr.status = status;
    kr.comment = comment;
    kr.done = done;
    kr.owner = owner;
    kr.objective = objective;
    kr.color = color;
    kr.moonshot = moonshot;

    try {
      await kr.save();
      return kr;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Resultado-chave já cadastrado!');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o resultado-chave no banco de dados',
        );
      }
    }
  }
}
