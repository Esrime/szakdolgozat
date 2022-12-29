import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ClassComponent } from './class.component';


const MOCK_CLASS ={
  title:'string',
  sets: [],
  students: [],
  creator: {email:'', role:'',username:''},
  id:'string',
  tests:{}
}

describe('ClassComponent', () => {
  let component: ClassComponent;
  let fixture: ComponentFixture<ClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassComponent],
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
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassComponent);
    component = fixture.componentInstance;
    component.class=MOCK_CLASS
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
