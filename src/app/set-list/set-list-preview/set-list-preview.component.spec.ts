import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { SetListPreviewComponent } from './set-list-preview.component';

describe('SetListPreviewComponent', () => {
  let component: SetListPreviewComponent;
  let fixture: ComponentFixture<SetListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetListPreviewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetListPreviewComponent);
    component = fixture.componentInstance;
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
    component.sets=[{title:'', cards:[], itemNum:0, creator:''}]
    let compiled= fixture.debugElement.nativeElement;
    fixture.detectChanges()
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
});
