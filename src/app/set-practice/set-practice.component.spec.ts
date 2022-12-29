import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SetPracticeComponent } from './set-practice.component';

const MOCK_SET = {title:'',cards:[{front:'',back:''}], itemNum:1,creator:''};
// timed: boolean = false;
// ind = 0;
const MOCK_ANSWER= [{text:'',ind:0},{text:'',ind:1},{text:'',ind:2},{text:'',ind:3}]// answers: { text: string, ind: number }[] = [];
// question: string = null;
// countDown: Subscription = null;
// counter = 0;
// tick = 1000;
// multiplier =1;
// isWrong =false;

describe('SetPracticeComponent', () => {
  let component: SetPracticeComponent;
  let fixture: ComponentFixture<SetPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetPracticeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: 123 })
            }
          }
        }
      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetPracticeComponent);
    component = fixture.componentInstance;
    component.set=MOCK_SET
    component.answers=MOCK_ANSWER
    component.question=''
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
