import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenavfootComponent } from './updatenavfoot.component';

describe('UpdatenavfootComponent', () => {
  let component: UpdatenavfootComponent;
  let fixture: ComponentFixture<UpdatenavfootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatenavfootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatenavfootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
