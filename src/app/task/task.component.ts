import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TaskService } from "../service/task.service";
import { Task } from "../shared/model/task.model";
import { Option } from "./option.model";
import { PreviewTaskComponent } from "./preview.task.component";
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'task-form',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public isView:boolean = true;
  public task:Task = new Task(0, '', '', '', 0, ''); // new task
  public errors:string = ''; // form errors
  private formStatus:string = ''; // action status
  public selectedFile: File;
  public filePreview:any;
  public hasPreviewDone: boolean = false;
  public isLoading: boolean = false;
  public modalReference:NgbModalRef;
  options = [
     new Option(0, 'New' ),
     new Option(10, 'Done' )
  ];

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      let id = params['id'];
      this.isView = id.length > 0;

      if(this.isView) {
        let tasks:Array<Task> = JSON.parse(window.sessionStorage.getItem("user_tasks"));
        this.task = tasks.find(t => t.id == id);
        this.filePreview = true;
      }
    });
  }

  onSelectFile($event:any) { // called each time file input changes
      this.selectedFile = $event.target.files[0];
      var reader:FileReader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(this.selectedFile);
  }

  _handleReaderLoaded(e:any) {
      var reader = e.target;
      this.filePreview = reader.result;
  }

  onPreview(content:any) {
    this.hasPreviewDone = true;
    this.modalReference = this.modalService.open(content);
  }

  onSave() {
    this.errors = '';
    this.isLoading = true;
    this.taskService.create(this.task, this.selectedFile).subscribe(params => {
      if(params.status == 'ok') {
        this.router.navigate(['home']);
      } else {
        for(let v in params.message){
          this.errors += v + ': ' + params.message[v];
        }
      }
      this.isLoading = false;
    });
  }

  onUpdate() {
    this.isLoading = true;
    this.taskService.update(this.task).subscribe(params => {
      if(params.status == 'ok') {
        this.router.navigate(['home']);
      } else {
        console.log(params);
      }
      this.isLoading = false;
    });
  }

  onCancel(){
    this.router.navigate(['home']);
  }
}
