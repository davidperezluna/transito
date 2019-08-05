import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvCfgClaseAccidenteService } from '../../../../services/svCfgClaseAccidente.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svCfgClaseAccidente.component.html'
})
export class SvCfgClaseAccidenteComponent implements OnInit {
  public errorMessage;
  public id;
  public clasesAccidente;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table: any = null;
  public claseAccidente: any;

  constructor(
    private _ClaseAccidenteService: SvCfgClaseAccidenteService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardará unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._ClaseAccidenteService.index().subscribe(
      response => {
        if (response) {
          this.clasesAccidente = response.data;
          let timeoutId = setTimeout(() => {
            this.iniciarTabla();
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
  iniciarTabla() {
    $('#dataTables-example').DataTable({
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
    this.table = $('#dataTables-example').DataTable();
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
        this._ClaseAccidenteService.delete({ 'id': id }, token).subscribe(
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

  onEdit(claseAccidente: any) {
    this.claseAccidente = claseAccidente;
    this.formEdit = true;
    this.formIndex = false;
  }

}