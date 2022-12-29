import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestDetailComponent } from './test-detail.component';

const MOCK_TEST= {sets:[]}
const MOCK_USER={role:'',email:"",username:''}

describe('TestDetailComponent', () => {
  let component: TestDetailComponent;
  let fixture: ComponentFixture<TestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDetailComponent ],
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

    fixture = TestBed.createComponent(TestDetailComponent);
    component = fixture.componentInstance;
    component.user=MOCK_USER;
    component.test=MOCK_TEST;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('not enough cards', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Not enough cards');
  });
  it('enough cards', () => {
    component.moreThan4=true
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Take test');
  });
  it('student attempts', () => {
    component.user.role='student'
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4')).toBeFalsy();
  });
  it('teacher 0 attempt', () => {
    component.user.role='teacher'
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tp').textContent).toContain('No student has completed the test yet.');
  });
  it('teacher more attempts', () => {
    component.user.role='teacher'
    component.attempts= [{mistakes:0, student:{emai:'', role:'', username:''}}]
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tp')).toBeFalsy();
  });
});
