import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttempComponent } from './testtemp.component';

describe('TesttempComponent', () => {
  let component: TesttempComponent;
  let fixture: ComponentFixture<TesttempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesttempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
