import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CuentaService} from '../../services/cuenta.service';
import {LoginService} from '../../services/login.service';
import {Cuenta} from './cuenta.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './cuenta.component.html'
})
export class CuentaComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public cuentas;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public cuenta: Cuenta;

  constructor(
		private _CuentaService: CuentaService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
		this._CuentaService.getCuenta().subscribe(
				response => {
          this.cuentas = response.data;
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
  deleteCuenta(id:any){

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
        this._CuentaService.deleteCuenta(token,id).subscribe(
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

  editCuenta(cuenta:any){
    this.cuenta = cuenta;
    this.formEdit = true;
    this.formIndex = false;
  }

}