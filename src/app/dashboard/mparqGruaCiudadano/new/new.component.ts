import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { MparqGruaCiudadano } from '../mparqGruaCiudadano.modelo';
import { MparqGruaCiudadanoService } from '../../../services/mparqGruaCiudadano.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() grua:any = null;
public gruaCiudadano: MparqGruaCiudadano;
public errorMessage;
public respuesta;

constructor(
  private GruaService: MparqGruaCiudadanoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.gruaCiudadano = new MparqGruaCiudadano(null, null, null, null, null, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();
    
		this.GruaService.register(this.gruaCiudadano,token).subscribe(
			response => {
        this.respuesta = response;
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
            text: 'El grua '+  +' ya se encuentra registrado',
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