import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { List } from 'src/app/list';
import { Task } from './../../task';

import { ListComponent } from './../list/list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy{

  constructor(public listComp: ListComponent) { }
  
  
  @Input() task!: Task;
  @Input() list!:List;

  private oldTasks: Task[]=[];
  private tasks: Task[]=[];
  ngOnInit(): void {
    //this.getTasksStatus()
  }
  toogleState(){
    this.task.status = !this.task.status
    console.log(JSON.stringify(this.task) + '<================= This task')
    this.tasks = JSON.parse(localStorage.getItem('tasks')as any)
    //this.oldTasks = this.tasks.filter(x => x.ulistId === Number(this.list.listId)) 
    //this.oldTasks.splice(this.task.taskId-1, 1)
    //this.tasks.slice(this.task)
    //this.tasks.push(this.task)
  
    localStorage.setItem('tasks',JSON.stringify( this.tasks))
    
  }

  ngOnDestroy(): void {
    
    console.log('comp destoed')
  }
}
