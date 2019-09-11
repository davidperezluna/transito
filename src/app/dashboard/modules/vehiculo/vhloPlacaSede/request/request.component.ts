import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloPlacaSedeService } from '../../../../../services/vhloPlacaSede.service';
import { VhloCfgPlacaService } from '../../../../../services/vhloCfgPlaca.service';
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
    private _PlacaSedeService: VhloPlacaSedeService,
    private _PlacaService: VhloCfgPlacaService,
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

    let token = this._LoginService.getToken();

    this.search.idOrganismoTransito = this.organismoTransito.id;

    this._PlacaSedeService.searchRequestByOrganismoTransito(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.solicitudes = response.data;

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

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.onCancelar();
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

    swal.close();
  }

  onInitForms(){
    this.formSearch = false;
    this.formIndex = false;
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

  onCancelar() {
    this.ready.emit(true);
  }

  onMake(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se enviaran las placas a fabricación!",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._PlacaService.state({ 'id': id, 'estado': 'FABRICADA' }, token).subscribe(
          response => {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonColor: '#15d4be',
            });

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
    });
  }
}
