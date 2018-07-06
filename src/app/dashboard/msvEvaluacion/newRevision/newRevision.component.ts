import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { msvRevision } from '../../msvRevision/msvRevision.modelo';
import { msvRevisionService } from '../../../services/msvRevision.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-newRevision',
  templateUrl: './newRevision.component.html'
})
export class NewRevisionComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public msvRevision: msvRevision;
public errorMessage;
public respuesta;

constructor(
  private _msvRevisionService: msvRevisionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvRevision = new msvRevision(null, null, null, null, null, null,null,null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.msvRevision);
		this._msvRevisionService.register(this.msvRevision,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'La revisión ya se encuentra registrado',
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