import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { DataStudent } from '../../interfaces/data.interface';
import { AsistenciasService } from '../../services/asistencias.service';

const convertirFecha = (fecha: string): any => {
  const partes = fecha.split('/'); // Dividir la fecha en partes: día, mes y año
  if (partes.length === 3) {
    const dia = partes[0].padStart(2, '0');
    const mes = partes[1].padStart(2, '0'); // Asegura que el mes tenga dos dígitos
    const anio = partes[2];

    return `${anio}-${mes}-${dia}`;
  }
}

@Component({
  selector: 'app-qr-dinamico-student',
  imports: [QRCodeComponent],
  templateUrl: './qr-dinamico-student.component.html',
  styleUrl: './qr-dinamico-student.component.css'
})
export class QrDinamicoStudentComponent implements OnInit, OnDestroy {

  @Input({ required: true }) dataStudent!: DataStudent;

  private asistencia = inject(AsistenciasService);

  public qrCodeUrl = '';     // 👈 propiedad para mostrar el QR
  private intervalId: any;  // 👈 para guardar el setInterval

  public fecha = new Date().toLocaleDateString('es-CO', { timeZone: 'America/Bogota' });
  public fechaActual = convertirFecha(this.fecha);

  ngOnInit() {
    this.loadQr();
    this.intervalId = setInterval(() => this.loadQr(), 50000); // cada 60s
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // limpiar cuando el componente se destruya
    }
  }

  loadQr() {
    this.asistencia.getDynamicQrToken(this.dataStudent.identification).subscribe(res => {
      // const url = `token=${res.token}&sig=${res.signature}`;
      // Creamos el objeto con token y signature
      const payload = {
        token: res.token,
        sig: res.signature,
        cedulaStudent: this.dataStudent.identification
      };

      // Lo pasamos a string para el QR
      this.qrCodeUrl = JSON.stringify(payload);
    });
  }


}
