import { Injectable } from '@angular/core';
import { Task } from '../shared/model/task.model';
import { HttpResponse } from '../shared/model/response.model';
import { HttpClient } from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class TaskService {
  public tasks: Array<Task> = [];

  constructor(private http: HttpClient) {}

  getAll(pageNum:number, sortField:string, sortType:string) {
      return this.http.get<HttpResponse>('/?developer=skoyev&page=' + pageNum +'&sort_field=' + sortField + '&sort_direction=' + sortType);
  }

  getById(id: number) {
      return this.http.get('/api/tasks/' + id);
  }

  create(task: Task, file:File) {
      let taskFormData = this.createTaskFormData(task, file);
      return this.http.post<HttpResponse>('/create/?developer=skoyev',taskFormData);
  }

  update(task: Task) {
      let taskFormData = this.createTaskFormData(task, null);
      return this.http.post<HttpResponse>('/edit/' + task.id + '/?developer=skoyev', taskFormData);
  }

  delete(id: number) {
      return this.http.delete('/api/tasks/' + id);
  }

  createTaskFormData(task: Task, file:File):FormData{
    let taskFormData: FormData = new FormData();
    taskFormData.append('status', task.status.toString());
    taskFormData.append('text', task.text);

    if(task.id > 0){
      let queryParams   = 'status=' + task.status + '&text=' + task.text + '&token=beejee';
      //let queryParams   = 'status=' + task.status + '&token=beejee';
      //let encodedParams = encodeURIComponent(queryParams);
      let hash = new Md5().appendStr(queryParams).end().toString();
      console.log(hash);
      taskFormData.append('token', 'beejee');
      taskFormData.append('signature', hash);
    } else {
      taskFormData.append('email', task.email);
      taskFormData.append('username', task.username);
      taskFormData.append('image', file);
    }

    return taskFormData;
  }
}
