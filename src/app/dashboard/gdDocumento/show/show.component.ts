import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdDocumentoService } from '../../../services/gdDocumento.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() readyDocument = new EventEmitter<any>();
@Input() documento: any = null;
public errorMessage;
public respuesta;
public date: any;
public observaciones: any;
public aceptada: any;
public resumen = {};     public datos = {
  'observaciones': null,
  'aceptada': null,
  'documentoId': null,
};

constructor(
  private _DocumentoService: GdDocumentoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.date = new Date();
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onCrearReparto(){
    this.datos.observaciones = this.observaciones;
    this.datos.aceptada = this.aceptada;
    this.datos.documentoId = this.documento.id;

    let token = this._loginService.getToken();

		this._DocumentoService.process(this.datos, token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          if(this.respuesta.data.aceptada){
            this.readyDocument.emit(this.respuesta.data);
          }else{
            this.ready.emit(this.respuesta.data);
          }
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