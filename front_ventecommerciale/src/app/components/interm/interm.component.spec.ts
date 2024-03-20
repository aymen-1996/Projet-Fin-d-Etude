import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermComponent } from './interm.component';

describe('IntermComponent', () => {
  let component: IntermComponent;
  let fixture: ComponentFixture<IntermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
