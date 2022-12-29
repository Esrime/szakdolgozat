import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController }from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SetDetailComponent } from './set-detail.component';

const MOCK_SET ={
  title:'string',
  cards:[],
  itemNum: 0,
  creator:''
}

describe('SetDetailComponent', () => {
  let component: SetDetailComponent;
  let fixture: ComponentFixture<SetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetDetailComponent],
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

    fixture = TestBed.createComponent(SetDetailComponent);
    component = fixture.componentInstance;
    component.set=MOCK_SET
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('too short', () => {
    component.isAuthenthicated=true
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tp').textContent).toContain('You need to have at least 5 cards in a set to start practice.');
  });
  it('long enough', () => {
    component.isAuthenthicated=true
    component.set.itemNum=5
    fixture.detectChanges();
    let compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#tb').textContent).toContain('Practice');
  });
});
