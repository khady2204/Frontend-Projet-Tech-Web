import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordEtudiantComponent } from './dashbord-etudiant.component';

describe('DashbordEtudiantComponent', () => {
  let component: DashbordEtudiantComponent;
  let fixture: ComponentFixture<DashbordEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
