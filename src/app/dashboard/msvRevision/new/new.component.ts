import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MsvRevision } from '../msvRevision.modelo';
import { MsvRevisionService } from '../../../services/msvRevision.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public msvRevision: MsvRevision;
public errorMessage;
public respuesta;

constructor(
  private _MsvRevisionService: MsvRevisionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvRevision = new MsvRevision(null, null, null, null, null, null, null, null, null, null, null,null,null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.msvRevision);
		this._MsvRevisionService.register(this.msvRevision,token).subscribe(
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