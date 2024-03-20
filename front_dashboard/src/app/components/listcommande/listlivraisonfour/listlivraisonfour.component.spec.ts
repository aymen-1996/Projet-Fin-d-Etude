import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlivraisonfourComponent } from './listlivraisonfour.component';

describe('ListlivraisonfourComponent', () => {
  let component: ListlivraisonfourComponent;
  let fixture: ComponentFixture<ListlivraisonfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListlivraisonfourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListlivraisonfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
