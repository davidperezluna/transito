import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCfgGrupoEtnicoService } from '../../../../services/userCfgGrupoEtnico.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './userCfgGrupoEtnico.component.html'
})
export class UserCfgGrupoEtnicoComponent implements OnInit {
  public errorMessage;
  public id;
  public gruposEtnicos;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table: any = null;
  public grupoEtnico: any;

  constructor(
    private _GrupoEtnicoService: UserCfgGrupoEtnicoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardará unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._GrupoEtnicoService.index().subscribe(
      response => {
        if (response) {
          this.gruposEtnicos = response.data;
          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
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
          sFirst: '<<',
          sPrevious: '<',
          sNext: '>',
          sLast: '>>'
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
        let token = this._loginService.getToken();
        this._GrupoEtnicoService.delete({ 'id': id }, token).subscribe(
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
    })
  }

  onEdit(grupoEtnico: any) {
    this.grupoEtnico = grupoEtnico;
    this.formEdit = true;
    this.formIndex = false;
  }

}