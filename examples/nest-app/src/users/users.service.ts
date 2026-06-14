import { randomUUID } from 'node:crypto';

import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

/** In-memory store and business logic for users. */
@Injectable()
export class UsersService {
  private readonly users = new Map<string, User>();

  /**
   * Registers a new user, rejecting a duplicate email.
   * @param dto - The registration payload.
   * @returns The created user.
   * @throws {ConflictException} When the email is already registered.
   */
  public register(dto: CreateUserDto): User {
    const email = dto.email.toLowerCase();
    const isAlreadyRegistered = [...this.users.values()].some((user) => user.email === email);

    if (isAlreadyRegistered) {
      throw new ConflictException(`Email ${email} is already registered`);
    }

    const user = new User();

    user.id = randomUUID();
    user.email = email;
    user.displayName = dto.displayName.trim();
    user.createdAt = new Date();
    this.users.set(user.id, user);

    return user;
  }

  /**
   * Lists every registered user.
   * @returns All users.
   */
  public findAll(): User[] {
    return [...this.users.values()];
  }
}
