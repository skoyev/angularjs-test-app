import { Task } from './task.model';

export class Message {
  total_task_count: number;
  tasks: Array<Task>;

  constructor(total_task_count:number,tasks: Array<Task>) {
    this.tasks = tasks;
    this.total_task_count = total_task_count;
  }
}

export class HttpResponse {
  status: string;
  message:Message

  constructor(status:string) {
    this.status = status;
  }
}
