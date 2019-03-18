import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvRegistroIpatService } from '../../services/msvRegistroIpat.service';
import { MsvConsecutivoService } from '../../services/msvConsecutivo.service';
import { MsvRegistroIpat } from './msvRegistroIpat.modelo';
import { LoginService } from '../../services/login.service';
import { MsvConsecutivo } from '../msvConsecutivo/msvConsecutivo.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvRegistroIpat.component.html'
})
export class MsvRegistroIpatComponent implements OnInit {
  public msvRegistroIpat: MsvRegistroIpat;
  public TramiteLimitacionService:any;
  public errorMessage;

  public tramitesInscripcion;
  public consecutivos;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public formShow = false;
  public table: any = null;
  public tramiteInscripcion: any;
  public consecutivo: MsvConsecutivo;

  constructor(
    private _MsvRegistroIpatService: MsvRegistroIpatService,
    private _MsvConsecutivoService: MsvConsecutivoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();
    let identity = this._loginService.getIdentity();

    let datos = {
      'identificacionUsuario': identity.identificacion,
    };

    this._MsvConsecutivoService.showBySede(token, datos).subscribe(
      response => {
        if (response) {
          this.consecutivos = response.data;
          console.log(this.consecutivos);
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
          }, 100);
          swal.close();
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
        this._MsvRegistroIpatService.deleteMsvRegistroIpat(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            })
            this.table.destroy();
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

  editCfgPlaca(tramiteInscripcion: any) {
    this.tramiteInscripcion = tramiteInscripcion;
    this.formEdit = true;
    this.formIndex = false;
  }

  onShow(consecutivo: any) {
    this.consecutivo = consecutivo;
    this.formIndex = false;
    this.formNew = false;
    this.formShow = true;
    if (this.table) {
      this.table.destroy();
    }
  }

}