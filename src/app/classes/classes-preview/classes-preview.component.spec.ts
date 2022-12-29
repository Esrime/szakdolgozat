import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';

import { ClassesPreviewComponent } from './classes-preview.component';

describe('ClassesPreviewComponent', () => {
  let component: ClassesPreviewComponent;
  let fixture: ComponentFixture<ClassesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesPreviewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('no sets', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('You currently have no classes.');
  });
  it('more classes', () => {
    component.classes=[{title:'', sets:[], students:[], creator:{email:'',role:'', username:''}}]
    let compiled= fixture.debugElement.nativeElement;
    fixture.detectChanges()
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
});
