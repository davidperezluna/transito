import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvIpatConsecutivoService } from '../../services/svIpatConsecutivo.service';
import { SvIpat } from './svIpat.modelo';
import { LoginService } from '../../services/login.service';
import { SvIpatConsecutivo } from '../svIpatConsecutivo/svIpatConsecutivo.modelo';
import { SvIpatService } from '../../services/svIpat.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svIpat.component.html'
})
export class SvIpatComponent implements OnInit {
  public ipat: SvIpat;
  public conductores: any = null;
  public vehiculos: any = null;
  public victimas: any = null;
  public errorMessage;

  public consecutivos;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public formShow = false;
  public table: any = null;
  public consecutivo: SvIpatConsecutivo;

  constructor(
    private _ConsecutivoService: SvIpatConsecutivoService,
    private _IpatService: SvIpatService,
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
    if(this.table) {
      this.table.destroy();
    }
    this.table =  $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
  }

  onNew(consecutivo: any) {
    this.consecutivo = consecutivo;

    this.formNew = true;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  onShow(consecutivo: any) {
    let token = this._LoginService.getToken();

    this._IpatService.getIpatByConsecutivo(consecutivo, token).subscribe(
      response => {
        if (response.code = 200) {
          console.log(response);
          this.ipat = response.data.ipat;
          this.conductores = response.data.conductores;
          this.vehiculos = response.data.vehiculos;
          this.victimas = response.data.victimas;
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
          this.formShow = false;
          swal.close();
            let timeoutId = setTimeout(() => {
              this.onInitTable();
              this.formShow = true;
              this.formNew = false;
              this.formIndex = false;
            }, 100);
                

          if (this.table) {
            this.table.destroy();
          }

        }
        else {
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formShow = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }
}