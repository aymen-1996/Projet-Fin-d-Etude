import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FordetailComponent } from './fordetail.component';

describe('FordetailComponent', () => {
  let component: FordetailComponent;
  let fixture: ComponentFixture<FordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FordetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
