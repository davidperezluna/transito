import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {GestionDocumentos} from '../gestionDocumentos.modelo';
import {PeticionarioService} from '../../../services/peticionario.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public peticionario: GestionDocumentos;
public errorMessage;
public respuesta;
public tipoPersona:any;
public tipoEntidad:any;

constructor(
  private _PeticionarioService: PeticionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.peticionario = new GestionDocumentos(null,null,null,null,null,null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    console.log(this.tipoPersona);
    

		this._PeticionarioService.register(this.peticionario,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El gestionDocumentos '+ this.peticionario.nombrePeticionario +' ya se encuentra registrado',
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