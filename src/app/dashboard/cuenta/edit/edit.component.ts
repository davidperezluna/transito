import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Cuenta} from '../cuenta.modelo';
import {CuentaService} from '../../../services/cuenta.service';
import {BancoService} from '../../../services/banco.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() cuenta:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public bancos: Array<any>
public bancoSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _cuentaService: CuentaService,
  private _loginService: LoginService,
  private _bancoService: BancoService,
  ){}

  ngOnInit(){
    

    console.log(this.bancoSelected);
    this._bancoService.getBancoSelect().subscribe(
        response => {
          this.bancos = response;
          setTimeout(() => {
            this.bancoSelected = [this.cuenta.banco.id];
            this.formReady = true;
          });
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

  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.cuenta.bancoId = this.bancoSelected;
		this._cuentaService.editCuenta(this.cuenta,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Echo!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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