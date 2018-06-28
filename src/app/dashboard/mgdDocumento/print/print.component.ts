import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MgdDocumentoService } from '../../../services/mgdDocumento.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
})
export class PrintComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() documento: any = null;
public errorMessage;
public respuesta;
public date: any;
public correoCertificadoEnvio: any;
public nombreTransportadoraEnvio: any;
public fechaEnvio: any;
public numeroGuia: any;
public numeroCarpeta: any;
public medioEnvio: any;
public datos = {
  'correoCertificadoEnvio': null,
  'nombreTransportadoraEnvio': null,
  'fechaEnvio': null,
  'numeroGuia': null,
  'numeroCarpeta': null,
  'medioEnvio': null,
  'documentoId': null,
};

constructor(
  private _DocumentoService: MgdDocumentoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.date = new Date();
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    this.datos.correoCertificadoEnvio = this.correoCertificadoEnvio;
    this.datos.nombreTransportadoraEnvio = this.nombreTransportadoraEnvio;
    this.datos.fechaEnvio = this.fechaEnvio;
    this.datos.numeroGuia = this.numeroGuia;
    this.datos.numeroCarpeta = this.numeroCarpeta;
    this.datos.medioEnvio = this.medioEnvio;
    this.datos.documentoId = this.documento.id;

    let token = this._loginService.getToken();

		this._DocumentoService.print(this.datos, token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: this.respuesta.msj,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: this.respuesta.msg,
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