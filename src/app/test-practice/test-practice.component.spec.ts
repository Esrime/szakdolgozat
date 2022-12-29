import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestPracticeComponent } from './test-practice.component';

const MOCK_ANSWER= [{text:'',ind:0},{text:'',ind:1},{text:'',ind:2},{text:'',ind:3}]
const MOCK_CARDS = [{front:'',back:''}];

describe('TestPracticeComponent', () => {
  let component: TestPracticeComponent;
  let fixture: ComponentFixture<TestPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPracticeComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: '123' })
            }
          }
        }
      ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPracticeComponent);
    component = fixture.componentInstance;
    component.cards=MOCK_CARDS
    component.answers=MOCK_ANSWER
    component.question=''
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
