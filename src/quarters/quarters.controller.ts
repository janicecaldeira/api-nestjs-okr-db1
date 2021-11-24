import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Delete,
  Param,
  Get,
  Patch,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { QuartersService } from './quarters.service';
import { CreateQuarterDto } from './dtos/create-quarter.dto';
import { UpdateQuarterDto } from './dtos/update-quarter.dto';
import { ReturnQuarterDto } from './dtos/return-quarter.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('quarters')
@UseGuards(AuthGuard(), RolesGuard)
export class QuartersController {
  constructor(private quartersService: QuartersService) {}

  @Post()
  @Role(UserRole.MANAGER)
  async createQuarter(
    @Body(ValidationPipe) createQuarterDto: CreateQuarterDto,
  ): Promise<ReturnQuarterDto> {
    const quarter = await this.quartersService.createQuarter(createQuarterDto);
    return {
      quarter,
      message: 'Quarter cadastrado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return this.quartersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ReturnQuarterDto> {
    const quarter = await this.quartersService.findOne(id);
    return {
      quarter,
      message: 'Quarter encontrado',
    };
  }

  @Get('/:quarter/objectives')
  async findObjectiveByQuarter(@Param('quarter') quarter: string) {
    return await this.quartersService.findObjectiveByQuarter(quarter);
  }

  @Get('/:quarter/:id/objectives')
  async findObjectiveByQuarterByTeam(
    @Param('quarter') quarter: string,
    @Param('id') id: string,
  ) {
    return await this.quartersService.findObjectiveByQuarterByTeam(quarter, id);
  }

  @Patch(':id')
  async updateQuarter(
    @Body(ValidationPipe) updateQuarterDto: UpdateQuarterDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.quartersService.updateQuarter(updateQuarterDto, id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Role(UserRole.MANAGER)
  async deleteQuarter(@Param('id') id: string) {
    await this.quartersService.deleteQuarter(id);
    return { message: 'Quarter excluído com sucesso' };
  }
}
