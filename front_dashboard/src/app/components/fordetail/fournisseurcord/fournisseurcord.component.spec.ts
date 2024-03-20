import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurcordComponent } from './fournisseurcord.component';

describe('FournisseurcordComponent', () => {
  let component: FournisseurcordComponent;
  let fixture: ComponentFixture<FournisseurcordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurcordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurcordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
