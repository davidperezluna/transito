import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RnmaTramiteLimitacionService } from '../../services/rnmaTramiteLimitacion.service';
import { VehiculoLimitacionService } from '../../services/vehiculoLimitacion.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { RnmaTramiteLevantamientoLimitacion } from './rnmaTramiteLevantamientoLimitacion.modelo';
import { Ciudadano } from '../ciudadano/ciudadano.modelo';

import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './rnmaTramiteLevantamientoLimitacion.component.html'
})
export class RnmaTramiteLevantamientoLimitacionComponent implements OnInit {
  public rnmaTramiteLevantamientoLimitacion: RnmaTramiteLevantamientoLimitacion;
  public RnmaTramiteLimitacionService:any;
  public errorMessage;
  public respuesta;
  public tramitesLevantamiento;
  public table: any = null;
  public tramiteLevantamiento: any;
  public listaLimitacionVehiculo = false;
  public limitacionesVehiculo: any;
  public limitacionVehiculoMostrar: any;
  public limitacionVehiculoM=false;
  public formIndex = true;
  public placa: any;
  public limitacionVehiculoEncontrada = 1;

  constructor(
    private _VehiculoLimitacionService: VehiculoLimitacionService,
    private _VehiculoService: VehiculoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    this._VehiculoLimitacionService.getVehiculoLimitacion().subscribe(
      response => {
        if (response) {

          console.log(response);
          this.tramitesLevantamiento = response.data;
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
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
  }
  iniciarTabla() {
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
        }
      }
    });
    this.table = $('#dataTables-example').DataTable();
  }


  ready(isCreado: any) {
    if (isCreado) {
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onKeyPlaca() {
    let token = this._loginService.getToken();
    let placa = {
      'placa': this.placa,
    };

    this._VehiculoService.showVehiculoPlaca(token, placa).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          this.limitacionVehiculoEncontrada = 4;
          this._VehiculoLimitacionService.getTramiteLimitacionPlaca(placa, token).subscribe(
            response => {
              this.respuesta = response;
              if (this.respuesta.status == 'success') {
                this.limitacionesVehiculo = this.respuesta.data;
                this.limitacionVehiculoEncontrada = 2;
                this.listaLimitacionVehiculo = true;
              } else {
                this.limitacionVehiculoEncontrada = 3;
              }
              error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            });
        } else {
          this.limitacionVehiculoEncontrada = 5;
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

  enviarTramite(limitacionVehiculo:any) {
    let token = this._loginService.getToken();
    this._VehiculoLimitacionService.levantarLimitacion(limitacionVehiculo, token).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.listaLimitacionVehiculo = false;
          this.limitacionVehiculoM = false;
          this.limitacionVehiculoMostrar = null;
          this.limitacionVehiculoEncontrada = 1;
        } else {
          this.limitacionVehiculoEncontrada = 3;
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

  onCancelar() {
    this.listaLimitacionVehiculo = true;
    this.limitacionVehiculoM = false;
  }

  ver(limitacionVehiculoP: any): void {
    this.limitacionVehiculoM = true;
    this.limitacionVehiculoMostrar = limitacionVehiculoP;
    this.listaLimitacionVehiculo = false;
  }

}