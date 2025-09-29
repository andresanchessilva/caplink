import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Usuário criado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiOkResponse({
    type: [UserEntity],
    description: 'Lista de usuários retornada com sucesso',
  })
  @ApiQuery({
    name: 'includeDeleted',
    required: false,
    type: Boolean,
    description: 'Incluir usuários deletados (soft delete)',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Buscar usuário por email' })
  @ApiParam({
    name: 'email',
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Usuário removido com sucesso (soft delete)',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete(':id/hard')
  @ApiOperation({ summary: 'Remover usuário permanentemente (hard delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'a3f1c2e4-5b6d-7e8f-9a0b-1c2d3e4f5a6b',
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'Usuário removido permanentemente',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  hardDelete(@Param('id') id: string) {
    return this.usersService.hardDelete(id);
  }
}
