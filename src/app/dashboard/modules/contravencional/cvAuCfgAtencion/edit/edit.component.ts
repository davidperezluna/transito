import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvAuCfgAtencionService } from '../../../../../services/cvAuCfgAtencion.service';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cvaucfgatencion',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() atencion: any = null;
  public diaSelected: any;
  public errorMessage;

  public dias = [
    { 'value': 1, 'label': 'Lunes' },
    { 'value': 2, 'label': 'Martes' },
    { 'value': 3, 'label': 'Miercoles' },
    { 'value': 4, 'label': 'Jueves' },
    { 'value': 5, 'label': 'Viernes' },
  ];

  public formReady = false;

  constructor(
    private _AtencionService: CvAuCfgAtencionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.diaSelected = [this.atencion.dia];
  }

  onCancelar() { this.ready.emit(true); }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.atencion.dia = this.diaSelected;

    this._AtencionService.edit(this.atencion, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
  }
}