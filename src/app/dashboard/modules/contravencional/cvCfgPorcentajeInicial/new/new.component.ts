import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CvCfgPorcentajeInicial } from '../cvCfgPorcentajeInicial.modelo';
import { CvCfgPorcentajeInicialService } from '../../../../../services/cvCfgPorcentajeInicial.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvcfgporcentajeinicial',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public porcentaje: CvCfgPorcentajeInicial;
  public errorMessage;
  public anios = [];

  constructor(
    private _PorcentajeService: CvCfgPorcentajeInicialService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.porcentaje = new CvCfgPorcentajeInicial(null, null, null);

    let date = new Date(); 
    
    for (let i = 2000; i < date.getFullYear() + 1; i++) {
      let obj = {
        value: i,
        label: i
      };
      this.anios.push(obj);
    }
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this._PorcentajeService.register(this.porcentaje, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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
      }
    );
  }
}