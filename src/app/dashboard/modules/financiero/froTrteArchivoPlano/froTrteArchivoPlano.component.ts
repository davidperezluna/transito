import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-fro-trte-archivo-plano',
  templateUrl: './froTrteArchivoPlano.component.html'
})

export class FroTrteArchivoPlanoComponent implements OnInit, AfterViewInit {
  public errorMessage;

  public tiposReporte = [
    { value: '1', label: 'INFORMACIÓN DE VEHICULOS' },
    { value: '2', label: 'PROPIETARIOS ACTUALES' },
    { value: '3', label: 'TRAMITES' },
    { value: '4', label: 'MEDIDA CAUTELAR' },
    { value: '5', label: 'CANCELACIÓN MATRICULA' },
    { value: '6', label: 'PRENDAS' },
    { value: '7', label: 'RADICADOS DE CUENTA' },
  ];

  public datos = {
    'tipoReporte': null,
    'fechaInicial': null,
    'fechaFinal': null,
  }

  constructor(
    private _FroTrteSolicitudService: FroTrteSolicitudService,
    private _LoginService: LoginService,
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    swal.close();
  }

  onEnviar() {
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    if (this.datos.tipoReporte) {
      this._FroTrteSolicitudService.createFile(this.datos, token).subscribe(
        response => {
          if (response.type) {
            var fileURL = URL.createObjectURL(response);
            window.open(fileURL);
          } else {
            swal({
              title: 'Error!',
              text: 'No existen registros para la generación del archivo plano en el rango de las fechas estipuladas.',
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }else{

    }
  }
}
