import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';

import { BaseService } from '../base.service';
import { ClassEditComponent } from './class-edit.component';
import { FormBuilder } from '@angular/forms';

describe('ClassEditComponent', () => {
  let component: ClassEditComponent;
  let fixture: ComponentFixture<ClassEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassEditComponent],
      providers: [BaseService,FormBuilder],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassEditComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
