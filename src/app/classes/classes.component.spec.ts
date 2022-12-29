import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';

import { ClassesComponent } from './classes.component';

const MOCK_USER={email:'',role:'', username:''}
const MOCK_CLASSLIST=[]

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    component.classList=MOCK_CLASSLIST;
    component.user=MOCK_USER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('no class', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('You currently have no classes.');
  });
  it('more class', () => {
    component.classList=[{title:'',sets: [], students: [], creator:{email:'', username:'', role:""}, }]
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
  it('student add', () => {
    component.user={email:'', role:'student', username:''}
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeFalsy();
  });
  it('teacher add', () => {
    component.user={email:'', role:'teacher', username:''}
    fixture.detectChanges()
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeTruthy();
  });
});
