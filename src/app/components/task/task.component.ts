import { Component, OnInit, Input } from '@angular/core';
import { List } from 'src/app/list';
import { Task } from './../../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{

  constructor() { }
  
  
  @Input() task!: Task;
  @Input() list!:List;

  ngOnInit(): void {
  }
  toogleState(){
    this.task.status = !this.task.status
    
  }
}
