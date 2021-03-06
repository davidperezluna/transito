import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloLimitacionService } from '../../../../services/vhloLimitacion.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloLimitacion.component.html'
})

export class VhloLimitacionComponent implements OnInit {
  public errorMessage;

  public inscripciones;
  
  public formSearch: any;
  public formIndex: any;
  public formNew: any;

  public table: any = null;

  public search: any = {
    'numero': null,
    'idModulo': 2
  }

  constructor(
    private _LimitacionService: VhloLimitacionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;
  }

  onInitForms(){
    this.formSearch = false;
    this.formIndex = false;
    this.formNew = false;
  }

  onSearch() {
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    
    this._LimitacionService.searchByPlacaOrIdentificacion(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.inscripciones = response.data;
          this.formIndex = true;
          
          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);

          swal.close();
        }else{
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
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
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

  onNew() {
    this.onInitForms();

    this.formNew = true;
  }

  onReady(isCreado: any) {
    if (isCreado) {
      this.ngOnInit();
    }
  }
}