import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { TaskComponent } from './task.component';

const routes: Routes = [
  Route.withShell([
    { path: 'task/:id', component: TaskComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TaskRoutingModule { }
