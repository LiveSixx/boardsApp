import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state, trigger, style, transition, animate } from '@angular/animations';

import { HomePageComponent } from './../../home-page/home-page.component';

@Component({
  selector: 'app-expansion-item',
  templateUrl: './expansion-item.component.html',
  styleUrls: ['./expansion-item.component.scss'],
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
export class ExpansionItemComponent implements OnInit {

  constructor(public homePage: HomePageComponent, private fb: FormBuilder) { }


  @Input() title ='title'
  @Input() icon = 'add_circle'
  formSatus = false;
  
  borderName!:string;
  addBoardForm!: FormGroup;

   addBoard(name: string) {
    this.borderName = '';
    name = name.trim();
    this.homePage.addBoard(name)
    
   }
   
  ngOnInit(): void {

    this.addBoardForm = this.fb.group({  
    item:['',Validators.required]
  }
  )
  }

  formOpen(status: boolean) {
    this.formSatus = status;
  }

  clear(){
    this.borderName = '';
  }

}