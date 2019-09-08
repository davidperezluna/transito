import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresa } from './userEmpresa.modelo';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;
 
@Component({
  selector: 'app-index',
  templateUrl: './userEmpresa.component.html',
})
export class UserEmpresaComponent implements OnInit {
  public empresa: UserEmpresa;
  public errorMessage;

  public empresas;
  
	public formNew: any;
	public formEdit: any;
  public formIndex: any;
  public formShow: any;
  public formSearch: any;

  public table:any; 

  public search: any = {
    'tipoFiltro': null,
    'filtro': null,
  }

  public tiposFiltro = [
    { 'value': '1', 'label': 'NIT' },
    { 'value': '2', 'label': 'Nombre' },
  ];

  constructor(
		private _EmpresaService: UserEmpresaService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    this.onInitForms();

    this.formSearch = true;
  }

  onInitForms(){
    this.formNew = false;
    this.formEdit = false;
    this.formShow = false;
    this.formIndex = false;
    this.formSearch = false;

    return true;
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

    this._EmpresaService.searchByFiltros(this.search, token).subscribe(
      response => {
        if (response.code == 200) {
          this.empresas = response.data;

          swal({
            title: response.title,
            text:response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
          
          this.onInitForms();
          this.formIndex = true;
          this.formSearch = true;

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        }else{
          this.empresas = null;

          swal({
            title: response.title,
            text:response.message,
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

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
      destroy: true,
      responsive: false,
      pageLength: 10,
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

  onNew(){
    this.onInitForms();
    this.formNew = true;
  }

  ready(isCreado:any){
      if(isCreado) {
        this.ngOnInit();
      }
  }

  onEdit(empresa:any){
    this.empresa = empresa;
    this.onInitForms();
    this.formEdit = true;
  }

  onShow(empresa:any){
    this.empresa = empresa;
    this.onInitForms();
    this.formShow = true;
  }

  onDelete(id:any){
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

        this._EmpresaService.delete({ 'id':id }, token).subscribe(
          response => {
              swal({
                title: 'Eliminado!',
                text: response.message,
                type:'success',
                confirmButtonText: 'Aceptar'
              });

              this.onSearch();
            }, 
          error => {
            this.errorMessage = <any>error;

            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    });
  }

  onActive(id:any){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se activara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._LoginService.getToken();

        this._EmpresaService.active({ 'id':id }, token).subscribe(
          response => {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });

              this.onSearch();
            }, 
          error => {
            this.errorMessage = <any>error;

            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    });
  }
}