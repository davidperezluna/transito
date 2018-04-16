import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteFactura } from '../tramiteFactura.modelo';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tramiteFactura: TramiteFactura;
public errorMessage;
public respuesta;

constructor(
  private _TramiteFacturaService: TramiteFacturaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tramiteFactura = new TramiteFactura(null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    console.log(this.tramiteFactura);
		this._TramiteFacturaService.register(this.tramiteFactura,token).subscribe(
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
            text: 'El tramiteFactura '+  +' ya se encuentra registrada',
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