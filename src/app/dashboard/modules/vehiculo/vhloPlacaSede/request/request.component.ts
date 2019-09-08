import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { VhloPlacaSedeService } from '../../../../../services/vhloPlacaSede.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-request-vhloplacasede',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() organismoTransito: any = null;
  public errorMessage;

  public solicitudes: any;

  public formSearch: any;
  public formIndex: any;

  public table: any = null;

  public search: any = {
    'idOrganismoTransito': null,
  }

  constructor(
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _PlacaSedeService: VhloPlacaSedeService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.onInitForms();

    swal({
      title: 'Cargando formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.formSearch = true;
    swal.close();
  }

  onInitForms(){
    this.formSearch = false;
    this.formIndex = false;
  }

  onSearch() {
    this.onInitForms();

    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this.search.idOrganismoTransito = this.organismoTransito.id;

    this._PlacaSedeService.searchRequestByOrganismoTransito(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.solicitudes = response.data;

          this.formSearch = true;
          this.formIndex = true;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        } else {
          this.solicitudes = null;

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

  onInitTable() {
    this.table = $('#dataTables-example').DataTable({
      retrieve: true,
      paging: false,
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
}
