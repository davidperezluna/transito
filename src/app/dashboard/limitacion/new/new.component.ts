import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Limitacion} from '../limitacion.modelo';
import {LimitacionService} from '../../../services/limitacion.service';
import {LoginService} from '../../../services/login.service';
import {ModuloService} from '../../../services/modulo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public limitacion: Limitacion;
public errorMessage;
public respuesta;
public modulos:any;
public moduloSelected:any;

constructor(
  private _LimitacionService: LimitacionService,
  private _loginService: LoginService,
  private _moduloService: ModuloService,
  ){}

  ngOnInit() {
    this.limitacion = new Limitacion(null,null,null,null);

    this._moduloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
      }, 
      error => {
        this.errorMessage = <any>error; 

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.limitacion.moduloId = this.moduloSelected;

		this._LimitacionService.register(this.limitacion,token).subscribe(
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
            text: 'El limitacion '+ this.limitacion.nombre +' ya se encuentra registrado',
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