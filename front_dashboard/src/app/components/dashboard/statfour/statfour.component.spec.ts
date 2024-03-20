import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatfourComponent } from './statfour.component';

describe('StatfourComponent', () => {
  let component: StatfourComponent;
  let fixture: ComponentFixture<StatfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatfourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
