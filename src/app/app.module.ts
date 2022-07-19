import { NgModule } from '@angular/core';
import { BrowserModule,  Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BoardsComponent } from './components/boards/boards.component';
import { ExpansionComponent } from './components/elements/expansion/expansion.component';
import { ExpansionItemComponent } from './components/elements/expansion/expansion-item.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { ListComponent } from './components/list/list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TaskComponent } from './components/task/task.component';


const routes: Routes = [

  {path: 'boards', component: HomePageComponent, data: {title: "Trello 2.0"}},
  {path: 'boards/board/:id', component: BoardsComponent, data: {boardTitle: 'Доска'}},
  {path: '**',redirectTo: 'boards'}
  ];

@NgModule({
  declarations: [
    ExpansionItemComponent,
    AppComponent,
    HomePageComponent,
    BoardsComponent,
    ExpansionComponent,
    HomeButtonComponent,
    ListComponent,
    TaskComponent,
  ],
  imports: [
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
