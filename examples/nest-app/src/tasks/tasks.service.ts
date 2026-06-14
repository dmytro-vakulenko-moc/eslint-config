import { randomUUID } from 'node:crypto';

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

/** In-memory store and business logic for tasks. */
@Injectable()
export class TasksService {
  private readonly tasks = new Map<string, Task>();

  /**
   * Creates and stores a new task in its initial, not-yet-started state.
   * @param dto - The task creation payload.
   * @returns The created task.
   */
  public create(dto: CreateTaskDto): Task {
    const task = new Task();

    task.id = randomUUID();
    task.title = dto.title;
    task.status = TaskStatus.TODO;
    task.assigneeId = dto.assigneeId;
    task.createdAt = new Date();
    this.tasks.set(task.id, task);

    return task;
  }

  /**
   * Lists every stored task.
   * @returns All tasks.
   */
  public findAll(): Task[] {
    return [...this.tasks.values()];
  }

  /**
   * Finds one task by its identifier.
   * @param id - The task identifier.
   * @returns The matching task.
   * @throws {NotFoundException} When no task has the given id.
   */
  public findOne(id: string): Task {
    const task = this.tasks.get(id);

    if (task === undefined) {
      throw new NotFoundException(`Task ${id} was not found`);
    }

    return task;
  }

  /**
   * Applies a partial update to an existing task.
   * @param id - The task identifier.
   * @param dto - The fields to change.
   * @returns The updated task.
   */
  public update(id: string, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    if (dto.title !== undefined) {
      task.title = dto.title;
    }

    if (dto.status !== undefined) {
      task.status = dto.status;
    }

    return task;
  }
}
