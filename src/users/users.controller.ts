import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: User,
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users records',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: [User],
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: User,
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === userId' doesn't exist.",
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: User,
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === userId' doesn't exist.",
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden error. "OldPassword" is wrong.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete user by id',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
    schema: {
      $ref: getSchemaPath('true'),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === userId' doesn't exist.",
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
