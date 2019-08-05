import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvIpatTalonario } from './svIpatTalonario.modelo';
import { SvIpatTalonarioService } from '../../services/svIpatTalonario.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svIpatTalonario.component.html'
})

export class SvIpatTalonarioComponent implements OnInit {
 // @Output() ready = new EventEmitter<any>();
  public talonario: SvIpatTalonario;
  public errorMessage;

  public formSearch = true;
  public formNew = false;
  public formEdit = false;
  public formIndex = false;
  public formShow = false;

  public talonarios: any;
  public organismosTransito: any;
  public table: any = null;

  public filtros = {
    'idOrganismoTransito': null,
    'fecha': null,
  }

  constructor(
    private _TalonarioService: SvIpatTalonarioService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.talonario = new SvIpatTalonario(null, null, null, null,  null, null);

    swal({
      title: 'Cargando sedes operativas!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });


    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        if (response) {
          this.organismosTransito = response;

          swal.close();
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

  onSearch() {
    this.formIndex = false;
    this.formNew = false;
    this.formEdit = false;
    
    swal({
      title: 'Buscando registros!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._TalonarioService.searchByOrganismoTransitoAndFecha(this.filtros, token).subscribe(
      response => {
        if (response.code == 200) {
          this.talonarios = response.data;
          this.formIndex = true;
          this.formNew = false;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          this.talonarios = null;
          this.formIndex = false;
          this.formSearch = false;
          this.formNew = false;

          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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

  onShow(talonario: any){
    this.talonario = talonario;
    this.formIndex = false;
    this.formNew = false;
    this.formSearch = false;
    this.formShow = true;
    this.table.destroy();
  }
  
  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
    this.formShow = false;
  }

  ready(isCreado: any) {
    if (isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = false;
      this.formShow = false;
      this.formSearch = true;

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
        let token = this._LoginService.getToken();

        this._TalonarioService.delete({ 'id': id },token).subscribe(
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

  onEdit(talonario: any) {    
    this.talonario = talonario;
    this.formEdit = true;
    this.formIndex = false;
  }

}