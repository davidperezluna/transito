import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresa } from './userEmpresa.modelo';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { LoginService } from '../../services/login.service';
// import { NewEmpresaComponent } from './new/new.component';
import swal from 'sweetalert2';
declare var $: any;
 
@Component({
  selector: 'app-index',
  templateUrl: './userEmpresa.component.html',
  // providers: [NewEmpresaComponent],
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
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    }) 
		this._EmpresaService.index().subscribe(
				response => {
          this.empresas = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
          }, 100);
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
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: false,
      pageLength: 6,
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
   this.table = $('#dataTables-example').DataTable();
  }
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.formEdit = false;
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
  deleteEmpresa(id:any){

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

        this._EmpresaService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
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

  editEmpresa(empresa:any){
    this.empresa = empresa;
    this.formEdit = true;
    this.formIndex = false;
  }

  getSucursal(empresa:any){
    this.empresa = empresa;
    this.formShow = true;
    this.formIndex = false;
  }

  onNewSucursal(){
    
  }

}