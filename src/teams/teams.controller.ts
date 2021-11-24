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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { ReturnTeamDto } from './dtos/return-team.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('teams')
@UseGuards(AuthGuard(), RolesGuard)
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  @Role(UserRole.MANAGER)
  async createTeam(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ): Promise<ReturnTeamDto> {
    const team = await this.teamsService.createTeam(createTeamDto);
    return {
      team,
      message: 'Time cadastrado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<ReturnTeamDto> {
    const team = await this.teamsService.findOne(id);
    return {
      team,
      message: 'Check-in encontrado',
    };
  }

  @Get('/:id/objectives')
  async findObjectiveByTeam(@Param('id') id: string) {
    return await this.teamsService.findObjectiveByTeam(id);
  }

  @Get('/:id/users')
  async findUsersByTeam(@Param('id') id: string) {
    return await this.teamsService.findUsersByTeam(id);
  }

  @Patch(':id')
  async updateTeam(
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    else {
      return this.teamsService.updateTeam(updateTeamDto, id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @Role(UserRole.MANAGER)
  async deleteTeam(@Param('id') id: string) {
    await this.teamsService.deleteTeam(id);
    return { message: 'Time excluído com sucesso' };
  }
}
