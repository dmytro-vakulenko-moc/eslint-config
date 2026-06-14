import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

/** Payload for creating a task. */
export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  public title: string;

  @IsOptional()
  @IsUUID()
  public assigneeId?: string;
}
