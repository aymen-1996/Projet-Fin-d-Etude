import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcmdComponent } from './detailcmd.component';

describe('DetailcmdComponent', () => {
  let component: DetailcmdComponent;
  let fixture: ComponentFixture<DetailcmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcmdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
