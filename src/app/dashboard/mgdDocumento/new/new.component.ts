import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MgdDocumentoService } from '../../../services/mgdDocumento.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() readyPrint = new EventEmitter<any>();
@Input() documento: any = null;
public errorMessage;
public respuesta;
public descripcion:any;
public datos = {
  'descripcion': null,
  'documentoId': null,
};


constructor(
  private _DocumentoService: MgdDocumentoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    this.datos.descripcion = this.descripcion;
    this.datos.documentoId = this.documento.id;

    let token = this._loginService.getToken();
		this._DocumentoService.response(this.datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.readyPrint.emit(this.respuesta.data);
          swal({
            title: 'Perfecto!',
            text: this.respuesta.msj,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El documento ya se encuentra registrado',
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