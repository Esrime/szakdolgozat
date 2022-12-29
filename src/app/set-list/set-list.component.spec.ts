import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SetListComponent } from './set-list.component';

describe('SetListComponent', () => {
  let component: SetListComponent;
  let fixture: ComponentFixture<SetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetListComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetListComponent);
    component = fixture.componentInstance;
    component.setList=[]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('no sets', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('There are not sets yet.');
  });
  it('more sets', () => {
    component.setList=[{title:'', cards:[], itemNum:0, creator:''}]
    let compiled= fixture.debugElement.nativeElement;
    fixture.detectChanges()
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
  it('logged out', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeFalsy();
  });
  it('logged in', () => {
    component.isAuthenthicated=true;
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a')).toBeTruthy();
  });
});
