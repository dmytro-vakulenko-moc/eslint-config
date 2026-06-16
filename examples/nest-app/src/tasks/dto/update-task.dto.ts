import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { TaskStatus } from '@/tasks/entities/task.entity';

/** Payload for updating a task; every field is optional. */
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  public title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  public status?: TaskStatus;
}
