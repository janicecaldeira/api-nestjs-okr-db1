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
} from "@nestjs/common";
import { YearsService } from "./years.service";
import { CreateYearDto } from "./dtos/create-year.dto";
import { UpdateYearDto } from "./dtos/update-year.dto";
import { ReturnYearDto } from "./dtos/return-year.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "../auth/role.decorator";
import { UserRole } from "../users/user-roles.enum";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/users/user.entity";

@Controller("years")
@UseGuards(AuthGuard(), RolesGuard)
export class YearsController {
  constructor(private yearsService: YearsService) {}

  @Post()
  @Role(UserRole.MANAGER)
  async createYear(
    @Body(ValidationPipe) createYearDto: CreateYearDto
  ): Promise<ReturnYearDto> {
    const year = await this.yearsService.createYear(createYearDto);
    return {
      year,
      message: "Ano cadastrado com sucesso",
    };
  }

  @Get()
  async findAll() {
    return this.yearsService.findAll();
  }

  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<ReturnYearDto> {
    const year = await this.yearsService.findOne(id);
    return {
      year,
      message: "Ano encontrado",
    };
  }

  @Get("/:id/objectives")
  async findObjectiveByYear(@Param("id") id: string) {
    return await this.yearsService.findObjectiveByYear(id);
  }

  @Get("/:year/:id/objectives")
  async findObjectiveByYearByTeam(
    @Param("year") year: string,
    @Param("id") id: string
  ) {
    return await this.yearsService.findObjectiveByYearByTeam(year, id);
  }

  @Patch(":id")
  async updateYear(
    @Body(ValidationPipe) updateYearDto: UpdateYearDto,
    @GetUser() user: User,
    @Param("id") id: string
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        "Você não tem autorização para acessar esse recurso"
      );
    else {
      return this.yearsService.updateYear(updateYearDto, id);
    }
  }

  @Delete(":id")
  @HttpCode(204)
  @Role(UserRole.MANAGER)
  async deleteYear(@Param("id") id: string) {
    await this.yearsService.deleteYear(id);
    return { message: "Ano excluído com sucesso" };
  }
}
