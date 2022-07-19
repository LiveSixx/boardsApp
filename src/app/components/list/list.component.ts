import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state, trigger, style, transition, animate } from '@angular/animations';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { BoardsComponent } from './../boards/boards.component';
import { List } from './../../list';
import { Task } from './../../task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('smoothClose', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden',
      })),
      state('final', style({
        overflow: 'hidden'
      })),
      transition('initial<=>final', animate('250ms ease-out'))
    ])
  ]
})
export class ListComponent implements OnInit {
  
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onDrop(event: CdkDragDrop<Task[]>){
    console.log(String(this.list.listId)+ ' this list id')
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(JSON.stringify(event.previousContainer.data) + ' event.previousContainer.data')
    }
    
  }
  @Input() list!: List;
  formSatus = false;
  addTaskForm!: FormGroup;
  taskName = '';
  task!: Task;
  tasks: Task[] = [];
  listTasks: Task[] = [];
  listTasksTest: Task[] = [];

  addTask(taskName: string){
    if(!taskName) { return; }
    this.task = {
      taskTitle:taskName,
      ulistId: this.list.listId,
      status: true,
      taskId: this.listTasks.length + 2
    }
    let localData:any = localStorage.getItem('tasks')
    if ( localData === null) {
      this.tasks = []
    }
    else{
      this.tasks = JSON.parse(localData) 
    }
    this.tasks.push(this.task)
    this.listTasks.push(this.task)
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
  }
  getListTasks(){
    if (localStorage.getItem("tasks") === null) { 
      this.task = {
        taskTitle:'FakeTask',
        ulistId: this.list.listId,
        status: true,
        taskId: this.listTasks.length + 1
      }
      return 
    }
    let localData:any = localStorage.getItem('tasks')
    this.tasks = JSON.parse(localData)
    this.listTasks = this.tasks.filter(x => x.ulistId === Number(this.list.listId)) 
  }
  formOpen(status: boolean) {
    this.formSatus = status;
  }
  constructor(private fb: FormBuilder, public boards:BoardsComponent) { }
  
  ngOnInit(): void {
    this.getListTasks()
    this.addTaskForm = this.fb.group({  
      item:['',Validators.required]
    })
    
  }

  clear(){
    this.taskName = '';
  }

}
