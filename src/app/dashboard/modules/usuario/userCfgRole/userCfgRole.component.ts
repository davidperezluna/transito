import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCfgRoleService } from '../../../../services/userCfgRole.service';
import { LoginService } from '../../../../services/login.service';
import { UserCfgRole } from './userCfgRole.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './UserCfgRole.component.html'
})
export class UserCfgRoleComponent implements OnInit {
  public errorMessage;
	public id;

  public roles: any = null;
  
	public formNew = false;
	public formEdit = false;
  public formIndex = true;

  public table:any; 
  public role: UserCfgRole;

  constructor(
    private _UserCfgRoleService: UserCfgRoleService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {    
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._UserCfgRoleService.index().subscribe(
				response => {         
          this.roles = response.data;
          let timeoutId = setTimeout(() => {  
            this.iniciarTabla();
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

  iniciarTabla(){
    $('#dataTables-example').DataTable({
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
   this.table = $('#dataTables-example').DataTable();
  }
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onDelete(id:any){
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
        this._UserCfgRoleService.delete({ 'id': id }, token).subscribe(
          response => {
              swal({
                title: 'Eliminado!',
                text:'Registro eliminado correctamente.',
                type:'success',
                confirmButtonColor: '#15d4be',
              });
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

  onEdit(role:any){
    this.role = role;
    this.formEdit = true;
    this.formIndex = false;
  }
}