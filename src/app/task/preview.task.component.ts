import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Task } from "../shared/model/task.model";
import {NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'preview-task',
  templateUrl: './preview.task.component.html'
})
export class PreviewTaskComponent implements OnInit {
  @Input()
  public previewTask:Task;

  @Input()
  public modalReference:NgbModalRef;

  @Input()
  public selectedFile:File;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {}

  onPreview(content:any) {}

  onCancel(){
    this.modalReference.close();
  }
}
