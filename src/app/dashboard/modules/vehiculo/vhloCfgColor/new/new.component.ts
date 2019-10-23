import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgColor} from '../vhloCfgColor.modelo';
import {VhloCfgColorService} from '../../../../../services/vhloCfgColor.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgcolor',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public color: VhloCfgColor;
public errorMessage;
public respuesta;

constructor(
  private _ColorService: VhloCfgColorService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.color = new VhloCfgColor(null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._ColorService.register(this.color,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        
        if(this.respuesta.status == 'success'){
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
            text: 'El color '+ this.color.nombre +' ya se encuentra registrado',
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