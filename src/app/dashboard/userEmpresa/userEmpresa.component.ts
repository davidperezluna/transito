import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresa } from './userEmpresa.modelo';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;
 
@Component({
  selector: 'app-index',
  templateUrl: './userEmpresa.component.html',
})
export class UserEmpresaComponent implements OnInit {
  public errorMessage;
	public id;

	public empresas;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public formShow = false;
  public table:any; 
  public empresa: UserEmpresa;

  constructor(
		private _EmpresaService: UserEmpresaService,
		private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

		this._EmpresaService.index().subscribe(
      response => {
        this.empresas = response.data;

        let timeoutId = setTimeout(() => {  
          this.onInitTable();
        }, 100);

        swal.close();
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

  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
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
    this.formNew = true;
    this.formIndex = false;
    this.formEdit = false;
    this.formShow = false;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.formShow = false;
        
        this.ngOnInit();
      }
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

        this._EmpresaService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text: response.message,
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.ngOnInit();
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
    })
  }

  onEdit(empresa:any){
    this.empresa = empresa;
    this.formEdit = true;
    this.formIndex = false;
  }

  onShow(empresa:any){
    this.empresa = empresa;
    this.formShow = true;
    this.formIndex = false;
  }
}