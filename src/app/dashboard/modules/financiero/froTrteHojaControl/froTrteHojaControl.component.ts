import { Component, OnInit } from '@angular/core';
import { FroTrteHojaControlService } from '../../../../services/froTrteHojaControl.service';
import { environment } from 'environments/environment';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-fro-trte-hoja-control',
  templateUrl: './froTrteHojaControl.component.html',
})
export class FroTrteHojaControlComponent implements OnInit {
  public errorMessage;

  public apiUrl = environment.apiUrl + 'financiero/frotrtehojacontrol';

  public vehiculoEncontrado;

  public formSearch: any;
  public formIndex: any;

  public table: any = null;

  public filtro = null;

  constructor(
    private _FroTrteHojaControlService: FroTrteHojaControlService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.onInitForms();
    this.formSearch = true;
  }

  ngAfterViewInit() {
    swal.close();
  }

  onInitForms() {
    this.formSearch = false;
    this.formIndex = false;
  }

  onInitTable() {
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      retrieve: true,
      paging: false,
      pageLength: 10,
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

  onSearch() {
    let token = this._LoginService.getToken();

    this.onInitForms();

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      type: 'info',
      showConfirmButton: false,
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._FroTrteHojaControlService.searhByFilter({ 'filtro': this.filtro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculoEncontrado = response.data;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.onInitForms();
          this.formSearch = true;
          this.formIndex = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
            swal.close();
          }, 200);
        } else {
          this.formSearch = true;

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
      this.ngOnInit();
      this.formSearch = true;
      this.formIndex = true;
      /* this.onSearch(); */
    }
  }
}
