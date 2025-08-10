import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QrDinamicoStudentComponent } from './components/qr-dinamico-student/qr-dinamico-student.component';
import { DataStudent } from './interfaces/data.interface';
import { ValidatorsService } from './services/validators.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, QrDinamicoStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private fb = inject(FormBuilder);
  private valitarorsService = inject(ValidatorsService);

  public activateQrDinamico = signal<boolean>(false);
  public dataStudentIdentification!: DataStudent;

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(this.valitarorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
  });

  isValidField(field: string) {
    return this.valitarorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string) {
    return this.valitarorsService.getFieldError(this.myForm, field);
  }

  public dataStudents = signal<DataStudent[]>([
    {
      identification: 1002652662,
      name: 'Santiago Orozco',
      carrera: 'Ingeniería En Sistemas',
      semestre: 9
    },
    {
      identification: 1111539520,
      name: 'Juan Orozco',
      carrera: 'Ingeniería En Sistemas',
      semestre: 9
    },
    {
      identification: 1221965207,
      name: 'Robert Lopez',
      carrera: 'Ingeniería En Sistemas',
      semestre: 9
    },
    {
      identification: 1023366368,
      name: 'Dayanna Montes',
      carrera: 'Ingeniería En Sistemas',
      semestre: 9
    },
  ]);

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    } else {
      let dataStudent = this.dataStudents().find(row => row.identification === Number(this.myForm.value.password));
      if (dataStudent) {
        this.dataStudentIdentification = dataStudent;
        this.activateQrDinamico.set(true);
      }
    }
  }

}
