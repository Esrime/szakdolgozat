import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetComponent } from './cardset.component';

const MOCK_CARD={front:'',back:''};
const MOCK_CARDS=[{front:'',back:''}];

describe('CardsetComponent', () => {
  let component: CardsetComponent;
  let fixture: ComponentFixture<CardsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsetComponent);
    component = fixture.componentInstance;
    component.card=MOCK_CARD;
    component.cards=MOCK_CARDS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
