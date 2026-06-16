import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

/** REST endpoints for managing users. */
@ApiTags('users')
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  /**
   * Registers a user.
   * @param dto - The registration payload.
   * @returns The created user.
   */
  @ApiCreatedResponse({ type: User })
  @Post()
  public register(@Body() dto: CreateUserDto): User {
    return this.usersService.register(dto);
  }

  /**
   * Lists all users.
   * @returns Every user.
   */
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  public findAll(): User[] {
    return this.usersService.findAll();
  }
}
