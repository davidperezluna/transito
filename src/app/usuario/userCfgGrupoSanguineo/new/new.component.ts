import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgGrupoSanguineo } from '../userCfgGrupoSanguineo.modelo';
import { UserCfgGrupoSanguineoService } from '../../../services/userCfgGrupoSanguineo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public grupoSanguineo: UserCfgGrupoSanguineo;
public errorMessage;
public respuesta;

constructor(
  private _UserCfgGrupoSanguineoService: UserCfgGrupoSanguineoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.grupoSanguineo = new UserCfgGrupoSanguineo(null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.grupoSanguineo);
		this._UserCfgGrupoSanguineoService.register(this.grupoSanguineo,token).subscribe(
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
            text: 'El grupoSanguineo '+  +' ya se encuentra registrado',
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