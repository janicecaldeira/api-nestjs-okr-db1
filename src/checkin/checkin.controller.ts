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
import { CreateCheckinDto } from "./dtos/create-checkin.dto";
import { ReturnCheckinDto } from "./dtos/return-checkin.dto";
import { UpdateCheckinDto } from "./dtos/update-checkin.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "../auth/role.decorator";
import { UserRole } from "../users/user-roles.enum";
import { CheckinService } from "./checkin.service";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/users/user.entity";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Checkin")
@Controller("checkin")
@UseGuards(AuthGuard(), RolesGuard)
export class CheckinController {
  constructor(private checkinService: CheckinService) {}

  @Post()
  @ApiOperation({ summary: "Cria checkins" })
  @ApiCreatedResponse({ description: "Check-in cadastrado com sucesso" })
  @ApiInternalServerErrorResponse({
    description: "Erro ao salvar o checkin no banco de dados",
  })
  async createCheckin(
    @Body(ValidationPipe) createCheckinDto: CreateCheckinDto
  ): Promise<ReturnCheckinDto> {
    const checkin = await this.checkinService.createCheckin(createCheckinDto);
    return {
      checkin,
      message: "Check-in cadastrado com sucesso",
    };
  }

  @Get()
  @ApiOperation({ summary: "Busca todos os checkins" })
  @ApiOkResponse({ description: "Sucesso" })
  async findAll() {
    return this.checkinService.findAll();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca check-in pelo id" })
  @ApiOkResponse({ description: "Check-in encontrado" })
  @ApiNotFoundResponse({ description: "Check-in não encontrado" })
  async findOne(@Param("id") id: string): Promise<ReturnCheckinDto> {
    const checkin = await this.checkinService.findOne(id);
    return {
      checkin,
      message: "Check-in encontrado",
    };
  }

  @Get("/key_result/:id")
  @ApiOperation({
    summary: "Busca checkins de um resultado-chave especificado pelo id",
  })
  @ApiOkResponse({ description: "Sucesso" })
  @ApiNotFoundResponse({ description: "Resultado-chave não encontrado" })
  async findCheckin(@Param("id") id: string) {
    return await this.checkinService.findKeyResult(id);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Aplica alterações parciais dos dados" })
  @ApiOkResponse({ description: "Check-in atualizado com sucesso!" })
  @ApiInternalServerErrorResponse({
    description: "Erro ao atualizar os dados no banco de dados",
  })
  @ApiForbiddenResponse({
    description: "Você não tem autorização para acessar esse recurso",
  })
  async updateCheckin(
    @Body(ValidationPipe) updateCheckinDto: UpdateCheckinDto,
    @GetUser() user: User,
    @Param("id") id: string
  ) {
    if (user.role != UserRole.MANAGER)
      throw new ForbiddenException(
        "Você não tem autorização para acessar esse recurso"
      );
    else {
      return this.checkinService.updateCheckin(updateCheckinDto, id);
    }
  }

  @Delete("/:id")
  @HttpCode(204)
  @ApiOperation({ summary: "Exclui ckeck-in pelo id" })
  @ApiOkResponse({ description: "Check-in excluído com sucesso" })
  @ApiNotFoundResponse({
    description: "Não foi encontrado um check-in com o ID informado",
  })
  @Role(UserRole.MANAGER)
  async deleteCheckin(@Param("id") id: string) {
    await this.checkinService.deleteCheckin(id);
    return { message: "Check-in excluído com sucesso" };
  }
}
