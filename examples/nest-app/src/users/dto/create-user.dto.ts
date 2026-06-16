import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

/** Payload for registering a user. */
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  public displayName: string;
}
