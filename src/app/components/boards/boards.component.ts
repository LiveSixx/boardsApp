import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePageComponent } from './../home-page/home-page.component';
import { Board } from './../../board';
import { List } from './../../list';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})

export class BoardsComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private homePage: HomePageComponent) {}

  addListBtn = false;
  color:string = GlobalConstants.ripplerColor;
  addListForm!: FormGroup;
  listName!:string;
  listsData: List[] = [];
  boardLists: List[] = [];
  list!: List;
  boardListsIdsArray: any[] = [];
  board!: Board;
  selectedList = -1;

  ngOnInit(): void {
    this.getBoard();
    this.getBoardLists();
    this.addListForm = this.fb.group({
      listItem:['',Validators.required]
    });
  }
  
  addList(): void {
    const listName = this.addListForm.get('listItem')?.value;

    if (!listName) return;

    this.list = {
      listTitle:listName,
      listId: this.listsData.length + 1, 
      uBoardId: Number(this.route.snapshot.paramMap.get('id')),
    } as List;

    this.listsData.push(this.list);
    this.boardLists.push(this.list);
    localStorage.setItem('lists', JSON.stringify(this.listsData));
    this.getArrayOfListsIds(this.boardLists);
    this.clear();
  }
  
  getBoard(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.board = this.homePage.getBoard( Number(id) ) as Board;
  }

  getArrayOfListsIds(listsOfBorad:List[]): void {
    for (let i in listsOfBorad) {
      let j = listsOfBorad[i].listId;
      this.boardListsIdsArray.push( String(Number(j)) )
    };
  }

  getBoardLists(): void {
    if (localStorage.getItem("lists") === null) return;
    
    const id = this.route.snapshot.paramMap.get('id');
    let localData:any = localStorage.getItem('lists');
    this.listsData = JSON.parse(localData);
    this.boardLists = this.listsData.filter( x => x.uBoardId === Number(id) );
    this.getArrayOfListsIds(this.boardLists);
  }
  
  addListBtnPressed(status: boolean): void {
    this.addListBtn = status;
  }

  clear(): void {
    this.addListForm.get('listItem')?.setValue('');
  }
}
