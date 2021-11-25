import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CheckinRepository } from "./checkin.repository";
import { UserRole } from "../users/user-roles.enum";
import { CreateCheckinDto } from "./dtos/create-checkin.dto";
import { UpdateCheckinDto } from "./dtos/update-checkin.dto";
import { Checkin } from "./checkin.entity";

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckinRepository)
    private checkinRepository: CheckinRepository
  ) {}

  async createCheckin(createCheckinDto: CreateCheckinDto): Promise<Checkin> {
    return this.checkinRepository.createCheckin(
      createCheckinDto,
      UserRole.MANAGER
    );
  }

  async findAll() {
    return this.checkinRepository.find({
      order: {
        createdAt: "ASC",
      },
      relations: ["key_result"],
    });
  }

  async findOne(checkinId: string): Promise<Checkin> {
    const check = await this.checkinRepository.findOne(checkinId, {
      select: ["current_value", "date", "id"],
    });

    if (!check) throw new NotFoundException("Check-in não encontrado");

    return check;
  }

  async findKeyResult(id: string): Promise<Checkin[]> {
    const keyResult = await this.checkinRepository.findKeyResult(id);

    if (!keyResult)
      throw new NotFoundException("Resultado-chave não encontrado");

    return keyResult;
  }

  async updateCheckin(
    updateCheckinDto: UpdateCheckinDto,
    id: string
  ): Promise<Checkin> {
    const check = await this.findOne(id);
    const { date, current_value, comment, color } = updateCheckinDto;
    check.current_value = current_value ? current_value : check.current_value;
    check.date = date ? date : check.date;
    check.comment = comment ? comment : check.comment;
    check.color = color ? color : check.color;

    try {
      await check.save();
      return check;
    } catch (error) {
      throw new InternalServerErrorException(
        "Erro ao atualizar os dados no banco de dados"
      );
    }
  }

  async deleteCheckin(checkinId: string) {
    const result = await this.checkinRepository.delete({ id: checkinId });
    if (result.affected === 0) {
      throw new NotFoundException(
        "Não foi encontrado um check-in com o ID informado"
      );
    }
  }
}
