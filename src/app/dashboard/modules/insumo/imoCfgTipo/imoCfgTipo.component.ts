import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImoCfgTipoService } from '../../../../services/imoCfgTipo.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './imoCfgTipo.component.html'
})
export class ImoCfgTipoComponent implements OnInit {
  public errorMessage;
  public id;
  public tiposInsumo;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table: any = null;
  public tipoInsumo: any;

  constructor(
    private _TipoService: ImoCfgTipoService,
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

    this._TipoService.index().subscribe(
      response => {
        if (response) {
          this.tiposInsumo = response.data;
          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
          swal.close()
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
 

  onEdit(tipoInsumo: any) {
    this.tipoInsumo = tipoInsumo;
    this.formEdit = true;
    this.formIndex = false;
  }

}