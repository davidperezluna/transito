import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MparqCostoTrayecto } from '../mparqCostoTrayecto.modelo';
import { MparqCostoTrayectoService } from '../../../services/mparqCostoTrayecto.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public costoTrayecto: MparqCostoTrayecto;
public errorMessage;
public respuesta;

constructor(
  private CostoTrayectoService: MparqCostoTrayectoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.costoTrayecto = new MparqCostoTrayecto(null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    
		this.CostoTrayectoService.register(this.costoTrayecto,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El costoTrayecto '+  +' ya se encuentra registrado',
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