import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvRegistroIpatService } from '../../services/msvRegistroIpat.service';
import { SvIpatConsecutivoService } from '../../services/svIpatConsecutivo.service';
import { MsvRegistroIpat } from './msvRegistroIpat.modelo';
import { LoginService } from '../../services/login.service';
import { SvIpatConsecutivo } from '../svIpatConsecutivo/svIpatConsecutivo.modelo';
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
  public consecutivo: SvIpatConsecutivo;

  constructor(
    private _ConsecutivoService: SvIpatConsecutivoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    let datos = {
      'identificacionUsuario': identity.identificacion,
    };

    this._ConsecutivoService.showBySede(datos, token).subscribe(
      response => {
        if (response) {
          this.consecutivos = response.data;
          console.log(this.consecutivos);
          let timeoutId = setTimeout(() => {
            this.onInitTable();
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

  onInitTable() {
    this.table =  $('#dataTables-example').DataTable({
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
}