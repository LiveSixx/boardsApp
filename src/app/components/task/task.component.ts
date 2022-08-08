import { Component, Input } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { List } from 'src/app/list';
import { Task } from './../../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() isListHasTasks!: boolean;
  @Input() task!: Task;
  @Input() list!: List;
  
  color:string = GlobalConstants.ripplerColor;

  toogleState(): void {
    this.task.status = !this.task.status;
  }
}
