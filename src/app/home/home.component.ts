import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TaskService } from "../service/task.service";
import { Task } from "../shared/model/task.model";
import { HttpResponse } from "../shared/model/response.model";
import { QuoteService } from './quote.service';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sortType:string  = "asc"; // defaoult value
  sortField:string = "id"; // defaoult value
  pageNum:number = 1;
  totalTasks: number;
  quote: string;
  isLoading: boolean;
  isAdmin: boolean = false;
  tasks:Array<Task>;

  constructor(private quoteService: QuoteService,
              private taskService: TaskService,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loadData();
    this.isAdmin = this.authenticationService.isAdmin();
  }

  sort($event:any, sortField:string, sortType:string){
    $event.preventDefault();
    this.sortField = sortField;
    this.sortType  = sortType;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.taskService.getAll(this.pageNum, this.sortField, this.sortType).subscribe(result => {
      if(result.status == 'ok') {
        this.tasks = result.message.tasks;
        this.totalTasks = result.message.total_task_count;
      }
      this.isLoading = false;;
    });
  }

  hasNextPage():boolean {
    return this.totalTasks > this.pageNum * 3;
  }

  onView(task:Task){
    // save tasks into session storage for view retrival by id on the next page,
    // as back end doesn't provide GET item by id API. It is a workaround option.
    window.sessionStorage.setItem("user_tasks", JSON.stringify(this.tasks));
    this.router.navigate(['task', task.id]);
  }

  previous($event:any){
    $event.preventDefault()
    --this.pageNum;
    this.loadData();
  }

  next($event:any){
    $event.preventDefault()
    ++this.pageNum;
    this.loadData();
  }

  onDelete(task:Task){
    //this.taskService.deleteTaskByName(task.name);
  }

  onNewTask(){
    window.sessionStorage.setItem("user_tasks", null);
    this.router.navigate(['task', '']);
  }

  onSearchTasks(keywords:string){
    //this.tasks = keywords.length > 0 ? this.taskService.findTasksByKeywords(keywords.split(',')) :  this.taskService.tasks;
  }
}
