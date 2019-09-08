import { Component, OnInit } from '@angular/core';
import { SvIpatAsignacion } from './svIpatAsignacion.modelo';
import { SvIpatAsignacionService } from '../../../../services/svIpatAsignacion.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svIpatAsignacion.component.html'
})

export class SvIpatAsignacionComponent implements OnInit {
  public asignacion: SvIpatAsignacion;
  public errorMessage;
	public id;
	public respuesta;
	public funcionarios;
	public funcionario: any;
	public formNew = false;
	public formEdit = false;
  public formShow = false;
  public formSearch = true;
  public table: any;
  public parametro: any;
  public datos = {
    'parametro' : null
  }

  constructor(
    private _AsignacionService: SvIpatAsignacionService,
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
    });

    $('[data-toggle="tooltip"]').tooltip();
  }
  
  onInitTable(){
    if (this.table) {
      this.table.destroy();
    }

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

  onShow(funcionario: any){
    this.funcionario = funcionario;
    this.formNew = false;
    this.formSearch = false;
    this.formShow = true;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formSearch = true;
      this.ngOnInit();
    }
  }

  readyNew(funcionario:any){
    this.funcionario = funcionario;
    this.formNew = true;
    this.formEdit = false;
    this.formShow = false;
    this.formSearch = false;
    this.ngOnInit();
  }

  delete(id:any){
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
        this._AsignacionService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
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

  onSearch(){
    let token = this._loginService.getToken();
    
    this.datos.parametro = this.parametro;

		/* this._AsignacionService.recordByTalonario(this.datos,token).subscribe( */
		this._AsignacionService.searchFuncionarioAgente(this.datos,token).subscribe(
			response => {
        if(response.code == 200){
          this.funcionarios = response.data;
          this.onInitTable();

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
		}); 
  }
}