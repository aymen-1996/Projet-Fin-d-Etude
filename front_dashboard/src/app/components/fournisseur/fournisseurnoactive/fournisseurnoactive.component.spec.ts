import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurnoactiveComponent } from './fournisseurnoactive.component';

describe('FournisseurnoactiveComponent', () => {
  let component: FournisseurnoactiveComponent;
  let fixture: ComponentFixture<FournisseurnoactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurnoactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurnoactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
