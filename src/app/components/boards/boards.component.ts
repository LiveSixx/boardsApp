import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePageComponent } from './../home-page/home-page.component';
import { Board } from './../../board';
import { List } from './../../list';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, AfterViewInit {

  boardName = '';
  addListBtn = false;

  addListForm!: FormGroup;

  listName!:string;
  listsData: List[] = [];
  boardLists: List[] = [];
  list!: List;
  boardListsArray: any[]=[]

  board!: Board;
  selectedList = -1;
  
  addList(){
    this.list = {
      listTitle:this.addListForm.value.listItem,
      listId: this.listsData.length + 1, 
      uBoardId: Number(this.route.snapshot.paramMap.get('id')),
    } as List
    this.listsData.push(this.list)
    this.boardLists.push(this.list)
    localStorage.setItem('lists',JSON.stringify(this.listsData))
    for (let i in this.boardLists) {
      let j = this.boardLists[i].listId 
      this.boardListsArray.push(String(Number(j)))
    }
  }
  getBoard(){
    const id = this.route.snapshot.paramMap.get('id');
    this.board = this.homePage.getBoard(Number(id)) as Board;
  }

  getBoardLists(){
    if (localStorage.getItem("lists") === null) { return }
    const id = this.route.snapshot.paramMap.get('id');
    let localData:any = localStorage.getItem('lists')
    this.listsData = JSON.parse(localData)
    this.boardLists = this.listsData.filter(x => x.uBoardId === Number(id))  
    for (let i in this.boardLists) {
      let j = this.boardLists[i].listId 
      this.boardListsArray.push(String(Number(j)))
    }
  }

 
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private homePage: HomePageComponent){ }
  
  ngAfterViewInit(): void {

  }
  addListBtnPressed(status: boolean) {
    this.addListBtn = status;
  }

  ngOnInit(): void {
    this.getBoard()
    this.getBoardLists()
    this.addListForm = this.fb.group({
      listItem:['',Validators.required]
    }
    )
    this.boardName = this.route.snapshot.params['id'];
    console.log(this.listsData)

  }
  clear(){
    this.listName = '';
  }

}
