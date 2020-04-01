import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FroTrteCarpetaService } from '../../../../services/froTrteCarpeta.service';
import { FroTrteCarpeta } from './froTrteCarpeta.modelo';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-fro-trte-carpeta',
  templateUrl: './froTrteCarpeta.component.html'
})

export class FroTrteCarpetaComponent implements OnInit, AfterViewInit {
  public errorMessage;

  public tramitesCarpeta;

  public formIndex: any;
  public formNew: any;
  public formEdit: any;
  
  public tramiteCarpeta: FroTrteCarpeta;
  public table: any = null;

  constructor(
    private _FroTrteCarpetaService: FroTrteCarpetaService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.onInitForms();
    this.formIndex = true;
    
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardará unos segundos, por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading();
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });
    this._FroTrteCarpetaService.index().subscribe(
      response => {
        this.tramitesCarpeta = response.data;
        let timeoutId = setTimeout(() => {
          this.onInitTable();
        }, 100);
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

  onInitForms() {
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
  }

  onInitTable() {
    this.table = $('#dataTables').DataTable({
      destroy: true,
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

  ngAfterViewInit() {
    swal.close();
  }

  onNew() {
    this.onInitForms();
    this.formNew = true;
  }

  ready() {
    this.ngOnInit();
  }

  onDelete(id: any) {
    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminará este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._FroTrteCarpetaService.delete({ 'id': id }, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: response.message,
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
    });
  }

  onEdit(tramiteCarpeta: any) {
    this.tramiteCarpeta = tramiteCarpeta;
    this.formEdit = true;
    this.formIndex = false;

  }
}
