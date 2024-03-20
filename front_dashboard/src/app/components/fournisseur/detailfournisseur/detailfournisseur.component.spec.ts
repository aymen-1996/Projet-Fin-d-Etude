import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailfournisseurComponent } from './detailfournisseur.component';

describe('DetailfournisseurComponent', () => {
  let component: DetailfournisseurComponent;
  let fixture: ComponentFixture<DetailfournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailfournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailfournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
