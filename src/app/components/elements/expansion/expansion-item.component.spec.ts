import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionItemComponent } from './expansion-item.component';

describe('ExpansionItemComponent', () => {
  let component: ExpansionItemComponent;
  let fixture: ComponentFixture<ExpansionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
