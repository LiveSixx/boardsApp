import { Component, OnInit  } from '@angular/core';
import { Injectable } from '@angular/core';
import { Board } from './../../board';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class HomePageComponent implements OnInit {
  
  constructor() { }
  
  boardsList: Board[] = [];
  dataBoard!: Board;
  expansionItem: any;
  smileState = "sentiment_satisfied"


  
  ngOnInit(): void {
    this.getBoards()
  
  }

  getBoards(){
    if (localStorage.getItem("boards") === null) { return }
    let localData:any = localStorage.getItem('boards');
    this.boardsList = JSON.parse(localData)
  }

  getBoard(id:Number){
    let localData:any = localStorage.getItem('boards');
    this.boardsList = JSON.parse(localData)
    return this.boardsList.find(x => x.boardId === id);
  }

  addBoard(name:string){
    this.boardsList.push({
      boardTitle:name,
      boardId: this.boardsList.length + 1,    
    });
    localStorage.setItem('boards',JSON.stringify(this.boardsList))
  }

  clearBords(){
    localStorage.clear()
    alert('Local storge cleared')
  }
  
}
