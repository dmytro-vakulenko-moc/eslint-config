/** The lifecycle states a task can be in. */
export enum TaskStatus {
  DONE = 'done',
  IN_PROGRESS = 'in_progress',
  TODO = 'todo',
}

/** A task tracked by the service. */
export class Task {
  public id: string;

  public title: string;

  public status: TaskStatus;

  public assigneeId?: string;

  public createdAt: Date;
}
