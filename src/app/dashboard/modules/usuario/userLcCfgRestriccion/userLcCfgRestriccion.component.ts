import { Component, OnInit } from '@angular/core';
import { UserLcCfgRestriccionService } from './userLcCfgRestriccion.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-userlccfgrestriccion',
  templateUrl: './userLcCfgRestriccion.component.html'
})
export class UserLcCfgRestriccionComponent implements OnInit {
  public errorMessage;
  public restricciones: any;
  public restriccion: any;

  public formIndex: any;
  public formNew: any;
  public formEdit: any;

  public table: any;

  constructor(
    private _RestriccionService: UserLcCfgRestriccionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.onInitForms();

    this._RestriccionService.index().subscribe(
      response => {
        this.restricciones = response.data;

        let timeoutId = setTimeout(() => {
          this.onInitTable();
          this.formIndex = true;
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

    swal.close();
  }

  onInitForms(){
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
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

  ready(isCreado: any) {
    if (isCreado) {
      this.ngOnInit();
    }
  }

  onNew() {
    this.onInitForms();
     this.formNew = true;
  }

  onEdit(restriccion: any) {
    this.onInitForms(); 
    this.formEdit = true;
    this.restriccion = restriccion;
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
        let token = this._LoginService.getToken();

        this._RestriccionService.delete({ 'id': id }, token).subscribe(
          response => {
            swal({
              title: 'Eliminado!',
              text: 'Registro eliminado correctamente.',
              type: 'success',
              confirmButtonColor: '#15d4be',
            })

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
}
