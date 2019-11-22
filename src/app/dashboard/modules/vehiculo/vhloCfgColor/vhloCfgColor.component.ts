import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { Http, Headers } from "@angular/http";
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloCfgColor.component.html'
})

export class VhloCfgColorComponent implements OnInit {
  public errorMessage;

  public id;
  public colores;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table: any;
  public color: any;

  constructor(
    private _ColorService: VhloCfgColorService,
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

    this._ColorService.index().subscribe(
      response => {
        this.colores = response.data;
        console.log(this.colores);

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
    )

    let timeoutId = setTimeout(() => {
      this.onInitTable();
    }, 100);
  }

  onInitTable() {
    let token = this._loginService.getToken();

    this.table = $('#dataTables-example').DataTable({
      processing: true,
      serverSide: true,
      ajax: this.colores,
      /* responsive: true,
      retrieve: true,
      paging: false, */
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
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  deleteColor(id: any) {
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
        this._ColorService.delete(token, id).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
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
    })
  }

  editColor(color: any) {
    this.color = color;
    this.formEdit = true;
    this.formIndex = false;
  }

  prueba() {
    /* let token = this._loginService.getToken();
    this._ColorService.pagination(1, token).subscribe(
      response => {
        this.colores = response.data;

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
    ); */
  }
}