import { Component, OnInit } from '@angular/core';
import { PnalAsignacion } from './pnalAsignacion.modelo';
import { PnalAsignacionService } from '../../services/pnalAsignacion.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './pnalAsignacion.component.html'
})

export class PnalAsignacionComponent implements OnInit {
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
  public resumen = {};     public datos = {
    'parametro' : null
  }
  public asignacion: PnalAsignacion;

  constructor(
    private _AsignacionService: PnalAsignacionService,
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

		this._AsignacionService.searchFuncionarioAgente(this.datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.funcionarios = response.data;
          this.iniciarTabla();

          swal({
            title: 'Perfecto',
            text: response.msj,
            type: 'info',
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
          });
        }else{
          swal({
            title: 'Atención',
            text: response.msj,
            type:'warning',
            confirmButtonColor: '#15d4be',
          });
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