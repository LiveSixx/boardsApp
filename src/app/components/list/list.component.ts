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

  @Input() list!: List;
  formStatus = false;
  addTaskForm!: FormGroup;
  task!: Task;
  tasks: Task[] = [];
  listTasks: Task[] = [];
  isListEmpty:boolean = true;
  

  onDrop(event: CdkDragDrop<Task[]>):void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    
  }

  addTask():void {
    const taskName = this.addTaskForm.get('item')?.value
    if(!taskName) { return; }
    this.task = {
      taskTitle:taskName,
      ulistId: this.list.listId,
      status: true,
      taskId: this.listTasks.length + 1
    }
    this.tasks.push(this.task)
    this.listTasks.push(this.task)
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
    this.clear()
  }
  getListTasks():void{
    if (localStorage.getItem("tasks") === null) { return }
    let localData:any = localStorage.getItem('tasks')
    this.tasks = JSON.parse(localData)
    this.listTasks = this.tasks.filter(x => x.ulistId === Number(this.list.listId))
    if (this.listTasks.length == 0){this.isListEmpty = true}
  }
  formOpen(status: boolean) :void{
    this.formStatus = status;
  }
  constructor(private fb: FormBuilder, public boards:BoardsComponent) { }
  
  ngOnInit(): void {
    this.getListTasks()
    this.addTaskForm = this.fb.group({  
      item:['',Validators.required]
    })
    
  }

  clear():void{
    this.addTaskForm.get('item')?.setValue('')
  }

}
