import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CvCfgPorcentajeInicialService } from '../../../../../services/cvCfgPorcentajeInicial.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cvcfgporcentajeinicial',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() porcentaje: any = null;
  public errorMessage;
  public anioSelected;
  public formReady = false;
  public anios = [];

  constructor(
    private _PorcentajeService: CvCfgPorcentajeInicialService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.anioSelected = [this.porcentaje.anio];
    let date = new Date();

    for (let i = 2000; i < date.getFullYear() + 1; i++) {
      let obj = {
        value: i,
        label: i
      };
      this.anios.push(obj);
    }

  }

  onCancelar() { this.ready.emit(true); }

  onEnviar() {
    let token = this._loginService.getToken();

    this.porcentaje.anio = this.anioSelected;
    this._PorcentajeService.edit(this.porcentaje, token).subscribe(
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