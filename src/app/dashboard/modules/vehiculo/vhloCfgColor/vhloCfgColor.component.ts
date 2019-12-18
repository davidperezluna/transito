import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';

import { Http } from '@angular/http';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloCfgColor.component.html',
})

export class VhloCfgColorComponent implements OnInit {
  public errorMessage;
  
  public dtOptions: any;

  public id;
  public colores;
  public data;
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

    let timeoutId = setTimeout(() => {
      this.onInitTable();
    }, 100);

  }
  
  onInitTable() {

    let token = this._loginService.getToken();
    this.table = $('#dataTables-example').DataTable({
      processing: true,
      serverSide: true,
      responsive: true,
      retrieve: true,
      paging: false,
      pageLength: 8,
      ajax: (dataTablesParameters: any, callback) => {
        /* this._ColorService.prueba(this.dtOptions.pageLength, dataTablesParameters.start, token).subscribe(resp => { */
          this._ColorService.pagination(dataTablesParameters.start, token).subscribe(resp => {
            this.colores = resp.data;
            callback({
              recordsTotal: resp.cant,
              recordsFiltered: resp.cant,
              data: []
              
            });
            console.log(this.colores);
          });
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

  onDelete(id: any) {
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
        this._ColorService.delete({'id': id}, token).subscribe(
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

  onEdit(color: any) {
    this.color = color;
    this.formEdit = true;
    this.formIndex = false;
  }
}