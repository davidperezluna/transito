import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TramiteLimitacionService } from '../../services/tramiteLimitacion.service';
import { VhloLimitacionService } from '../../services/vhloLimitacion.service';
import { RnmaTramiteInscripcionLimitacion } from './rnmaTramiteInscripcionLimitacion.modelo';
import { UserCiudadano } from '../userCiudadano/userCiudadano.modelo';

import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './rnmaTramiteInscripcionLimitacion.component.html'
})
export class RnmaTramiteInscripcionLimitacionComponent implements OnInit {
  public rnmaTramiteInscripcionLimitacion: RnmaTramiteInscripcionLimitacion;
  public TramiteLimitacionService:any;
  public errorMessage;
  public respuesta;
  public tramitesInscripcion;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table: any = null;
  public tramiteInscripcion: any;

  constructor(
    private _VehiculoLimitacionService: VhloLimitacionService,
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
    let datos = {
      'moduloId': 3,
    };
    this._VehiculoLimitacionService.index(datos).subscribe(
      response => {
        if (response) {

          console.log(response);
          this.tramitesInscripcion = response.data;
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
  onNew() {
    this.formNew = true;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }
  deleteCfgPlaca(id: any) {

    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();

        this._VehiculoLimitacionService.delete(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
            this.table.destroy();
            this.respuesta = response;
            this.ngOnInit();
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
    })
  }

  edit(tramiteInscripcion: any) {
    this.tramiteInscripcion = tramiteInscripcion;
    this.formEdit = true;
    this.formIndex = false;
  }

}