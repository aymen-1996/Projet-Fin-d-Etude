import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitcategorieComponent } from './produitcategorie.component';

describe('ProduitcategorieComponent', () => {
  let component: ProduitcategorieComponent;
  let fixture: ComponentFixture<ProduitcategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitcategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
