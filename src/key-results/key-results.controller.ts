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
import { CreateKeyResultDto } from "./dtos/create-key-result.dto";
import { ReturnKeyResultDto } from "./dtos/return-key-result.dto";
import { UpdateKeyResultDto } from "./dtos/update-key-result.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "../auth/role.decorator";
import { UserRole } from "../users/user-roles.enum";
import { KeyResultsService } from "./key-results.service";
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

@ApiTags("Key Result")
@Controller("key-results")
@UseGuards(AuthGuard(), RolesGuard)
export class KeyResultsController {
  constructor(private keyResultsService: KeyResultsService) {}

  @Post()
  @Role(UserRole.USER && UserRole.MANAGER)
  @ApiOperation({ summary: "Cria key results" })
  @ApiCreatedResponse({ description: "Resultado-chave cadastrado com sucesso" })
  @ApiInternalServerErrorResponse({
    description: "Erro ao salvar o resultado-chave no banco de dados",
  })
  async createKeyResult(
    @Body(ValidationPipe) createKeyResultDto: CreateKeyResultDto
  ): Promise<ReturnKeyResultDto> {
    const keyResult = await this.keyResultsService.createKeyResult(
      createKeyResultDto
    );
    return {
      keyResult,
      message: "Resultado-chave cadastrado com sucesso",
    };
  }

  @Get()
  @ApiOperation({ summary: "Busca todos os key results" })
  @ApiOkResponse({ description: "Sucesso" })
  async findAll() {
    return this.keyResultsService.findAll();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca key result pelo id" })
  @ApiOkResponse({ description: "Resultado-chave encontrado" })
  @ApiNotFoundResponse({ description: "Resultado-chave não encontrado" })
  async findOne(@Param("id") id: string): Promise<ReturnKeyResultDto> {
    const keyResult = await this.keyResultsService.findOne(id);
    return {
      keyResult,
      message: "Resultado-chave encontrado",
    };
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Aplica alterações parciais dos dados" })
  @ApiOkResponse({ description: "Key result atualizado com sucesso!" })
  @ApiInternalServerErrorResponse({
    description: "Erro ao atualizar os dados no banco de dados",
  })
  @ApiForbiddenResponse({
    description: "Você não tem autorização para acessar esse recurso",
  })
  async updateKeyResult(
    @Body(ValidationPipe) updateKeyResultDto: UpdateKeyResultDto,
    @GetUser() user: User,
    @Param("id") id: string
  ) {
    if (user.role == UserRole.ADMIN)
      throw new ForbiddenException(
        "Você não tem autorização para acessar esse recurso"
      );
    else {
      return this.keyResultsService.updateKeyResult(updateKeyResultDto, id);
    }
  }

  @Delete("/:id")
  @HttpCode(204)
  @ApiOperation({ summary: "Exclui key result por id" })
  @ApiOkResponse({ description: "Resultado-chave excluído com sucesso" })
  @ApiNotFoundResponse({
    description: "Não foi encontrado um resultado-chave com o ID informado",
  })
  async deleteKeyResult(@Param("id") id: string) {
    await this.keyResultsService.deleteKeyResult(id);
    return { message: "Resultado-chave excluído com sucesso" };
  }
}
