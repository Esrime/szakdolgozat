import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('logged out', () => {
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2')).toBeTruthy();
  });
  it('logged in', () => {
    component.isAuthenthicated=true;
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2')).toBeFalsy();
  });
});
