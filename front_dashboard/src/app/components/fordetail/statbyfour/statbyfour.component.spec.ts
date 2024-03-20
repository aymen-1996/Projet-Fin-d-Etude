import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatbyfourComponent } from './statbyfour.component';

describe('StatbyfourComponent', () => {
  let component: StatbyfourComponent;
  let fixture: ComponentFixture<StatbyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatbyfourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatbyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
