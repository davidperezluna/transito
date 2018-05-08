import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {GestionDocumentos} from '../gestionDocumentos.modelo';
import {RegistroDocumento} from '../registroDocumento.modelo';
import {PeticionarioService} from '../../../services/peticionario.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public peticionario: GestionDocumentos; 
public registroDocumento: RegistroDocumento;
public errorMessage;
public respuesta;
public documentoEncontrado = false;
public crearDocumento = false;
public peticionarios:any;
public tiposIdentificacion:any;

constructor(
  private _PeticionarioService: PeticionarioService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  ){}

  ngOnInit() {
    this.peticionario = new GestionDocumentos(null,null,null,null,null,null,null,null);
    this.registroDocumento = new RegistroDocumento(null,null,null,null,null,null,null,null,null,null);

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
        response => {
          this.tiposIdentificacion = response;
        },
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      );
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onBuscarRegistros(){

    console.log(this.peticionario);
    let token = this._loginService.getToken();
		this._PeticionarioService.buscarPeticionario(this.peticionario,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
           this.documentoEncontrado = true;
           this.crearDocumento = false;
           this.peticionarios = response.data;
           console.log(this.peticionarios);
        }else{
          this.documentoEncontrado = false;
          this.crearDocumento = true;
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

  onCancelarRegistroDocumento(){
    this.crearDocumento = false;
  }

  onCancelarBusqudaRegistros(){
    this.documentoEncontrado = false;
  }

  oncrearNuevoRegistro(){
    this.documentoEncontrado = false;
    this.crearDocumento = true;
  }

}