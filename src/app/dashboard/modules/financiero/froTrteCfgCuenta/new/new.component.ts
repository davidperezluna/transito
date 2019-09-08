import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {FroTrteCfgCuenta} from '../froTrteCfgCuenta.modelo';
import {FroTrteCfgCuentaService} from '../../../../../services/froTrteCfgCuenta.service';
import {LoginService} from '../../../../../services/login.service';
//import {BancoService} from '../../../../../services/banco.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public cuenta: FroTrteCfgCuenta;
public errorMessage;
//public bancos:any;
//public bancoSelected:any;

constructor(
  private _CuentaService: FroTrteCfgCuentaService,
  private _loginService: LoginService,
  //private _bancoService: BancoService,
  ){}

  ngOnInit() {
    this.cuenta = new FroTrteCfgCuenta(null,null,null);

    /* this._bancoService.getBancoSelect().subscribe(
        response => {
          this.bancos = response;
          console.log(this.bancos);
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      ); */
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();
    //this.cuenta.bancoId = this.bancoSelected;
		this._CuentaService.register(this.cuenta,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'la cuenta '+ this.cuenta.numero +' ya se encuentra registrado',
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