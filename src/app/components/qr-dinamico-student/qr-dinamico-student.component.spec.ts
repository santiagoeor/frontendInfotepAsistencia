import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDinamicoStudentComponent } from './qr-dinamico-student.component';

describe('QrDinamicoStudentComponent', () => {
  let component: QrDinamicoStudentComponent;
  let fixture: ComponentFixture<QrDinamicoStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrDinamicoStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrDinamicoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
