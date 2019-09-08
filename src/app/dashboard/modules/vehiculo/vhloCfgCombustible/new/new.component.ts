import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgCombustible} from '../vhloCfgCombustible.modelo';
import {VhloCfgCombustibleService} from '../../../../../services/vhloCfgCombustible.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public combustible: VhloCfgCombustible;
public errorMessage;

constructor(
  private _CombustibleService: VhloCfgCombustibleService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.combustible = new VhloCfgCombustible(null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._CombustibleService.register(this.combustible,token).subscribe(
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
            text: 'El combustible '+ this.combustible.nombre +' ya se encuentra registrado',
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