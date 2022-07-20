import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';
import { HomePageComponent } from './components/home-page/home-page.component';

import { Board } from './board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trello 3.0';
  
  constructor (
    private titleService: Title, 
    private router: Router, 
    private activePage: ActivatedRoute, 
    private homePageComp: HomePageComponent){}
  
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          this.activePage = this.router.routerState.root;
          let routeTitle = '';
          let activeBoard!: Board;
          while (this.activePage!.firstChild) {
            this.activePage = this.activePage.firstChild;
          }
          if (this.activePage.snapshot.data['title']) {
            routeTitle = this.activePage!.snapshot.data['title'];
          }
          if (this.activePage.snapshot.data['boardTitle']){
            activeBoard = this.homePageComp.getBoard(Number(this.activePage.snapshot.paramMap.get('id'))) as Board
            routeTitle = String('Доска - '+ activeBoard.boardTitle)
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }

}


