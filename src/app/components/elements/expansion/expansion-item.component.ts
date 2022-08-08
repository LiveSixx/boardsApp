import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { GlobalConstants } from 'src/app/common/global-constants';

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

  constructor(private fb: FormBuilder) {}
  
  @Input() title = 'title';
  @Input() icon = 'add_circle';

  @Output() onBoardAdd = new EventEmitter<string>();

  color: string = GlobalConstants.ripplerColor;
  formSatus = false;
  addBoardForm!: FormGroup;

   addBoard(): void {
    const boardName: string = this.addBoardForm.get('item')?.value.trim();
    if (!boardName) return;

    this.onBoardAdd.emit(boardName);
    this.clear();
   }

  ngOnInit(): void {
    this.addBoardForm = this.fb.group({  
    item:['',Validators.required]
    });
  }

  toggleForm(status: boolean): void {
    this.formSatus = status;
  }

  clear(): void {
    this.addBoardForm.get('item')?.setValue('');
  }

  clearLocalStorage(): void {
    localStorage.clear();
    alert('Локальное хранилище очищено');
  }
}