import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {TipoDocumento} from '../tipoDocumento.modelo';
import {TipoDocumentoService} from '../../../services/tipoDocumento.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tipoDocumento: TipoDocumento;
public errorMessage;
public respuesta;
public servicios:any;
public organismosTransito:any;
public consumibles:any;
public clases:any;
public departamentoSelected:any;
public servicioSelected:any;
public organismoTransitoSelected:any;
public consumibleSelected:any;
public claseSelected:any;

constructor(
  private _TipoDocumentoService: TipoDocumentoService,
  private _loginService: LoginService,

  ){}

  ngOnInit() {
    this.tipoDocumento = new TipoDocumento(null,null,null,null,);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    console.log(this.tipoDocumento);
		this._TipoDocumentoService.register(this.tipoDocumento,token).subscribe(
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
            text: 'El tipoDocumento '+  +' ya se encuentra registrado',
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