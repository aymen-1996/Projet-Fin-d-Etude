import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprodComponent } from './listprod.component';

describe('ListprodComponent', () => {
  let component: ListprodComponent;
  let fixture: ComponentFixture<ListprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
