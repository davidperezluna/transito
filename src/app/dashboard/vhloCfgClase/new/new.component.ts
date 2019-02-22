import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgClase} from '../vhloCfgClase.modelo';
import {VhloCfgClaseService} from '../../../services/vhloCfgClase.service';
import {LoginService} from '../../../services/login.service';
import {ModuloService} from '../../../services/modulo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public clase: VhloCfgClase;
public errorMessage;
public respuesta;
public modulos:any;
public moduloSelected:any;

constructor(
  private _ClaseService: VhloCfgClaseService,
  private _loginService: LoginService,
  private _moduloService: ModuloService,
  ){}

  ngOnInit() {
    this.clase = new VhloCfgClase(null,null,null,null);

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
    this.clase.moduloId = this.moduloSelected;

		this._ClaseService.register(this.clase,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El clase '+ this.clase.nombre +' ya se encuentra registrado',
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