import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

/** REST endpoints for managing tasks. */
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  public constructor(private readonly tasksService: TasksService) {}

  /**
   * Creates a task.
   * @param dto - The creation payload.
   * @returns The created task.
   */
  @ApiCreatedResponse({ type: Task })
  @Post()
  public create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  /**
   * Lists all tasks.
   * @returns Every task.
   */
  @ApiOkResponse({ type: Task, isArray: true })
  @Get()
  public findAll(): Task[] {
    return this.tasksService.findAll();
  }

  /**
   * Fetches a single task.
   * @param id - The task identifier.
   * @returns The task.
   */
  @ApiOkResponse({ type: Task })
  @Get(':id')
  public findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  /**
   * Applies a partial update to a task.
   * @param id - The task identifier.
   * @param dto - The update payload.
   * @returns The updated task.
   */
  @ApiOkResponse({ type: Task })
  @Patch(':id')
  public update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    return this.tasksService.update(id, dto);
  }
}
