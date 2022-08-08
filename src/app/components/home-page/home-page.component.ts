import { Component, Injectable, OnInit} from '@angular/core';
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

  boardsList: Board[] = [];
  smileState = "sentiment_satisfied"

  ngOnInit(): void {
    this.getBoards()
  
  }

  getBoards():void {
    if (localStorage.getItem("boards") === null) { return }
    let localData:any = localStorage.getItem('boards');
    this.boardsList = JSON.parse(localData)
  }

  getBoard(id:Number):Board {
    let localData:any = localStorage.getItem('boards');
    this.boardsList = JSON.parse(localData)
    return this.boardsList.find(x => x.boardId === id) as Board
  }

  addBoard(name:string):void {
    this.boardsList.push({
      boardTitle:name,
      boardId: this.boardsList.length + 1,    
    });
    localStorage.setItem('boards',JSON.stringify(this.boardsList))
  }
}
