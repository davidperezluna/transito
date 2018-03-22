import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Ciudadano} from '../ciudadano.modelo';
import {CiudadanoService} from '../../../services/ciudadano.service';
import {LoginService} from '../../../services/login.service';
import {TipoIdentificacionService} from '../../../services/tipoIdentificacion.service';
import {MunicipioService} from '../../../services/municipio.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() ciudadano:any = null;
public errorMessage;
public respuesta;
public formReady = false;

public tiposIdentificacion: Array<any>
public tipoIdentificacionSelected: Array<any>; // ng-select [(ngModel)]

public municipios: Array<any>
public municipioNacimientoSelected: Array<any>; // ng-select [(ngModel)]
public municipioResidenciaSelected: Array<any>; // ng-select [(ngModel)]


constructor(
  private _ciudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _municipioService: MunicipioService,

  ){}

  ngOnInit(){
    console.log(this.ciudadano);

    this._municipioService.getMunicipioSelect().subscribe(
        response => {
          this.municipios = response;
          setTimeout(() => {
            this.municipioNacimientoSelected = [this.ciudadano.municipioNacimiento.id];
            this.municipioResidenciaSelected = [this.ciudadano.municipioResidencia.id];
          });
        }, 


        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
        response => {
          this.tiposIdentificacion = response;
          setTimeout(() => {
            this.tipoIdentificacionSelected = [this.ciudadano.tipoIdentificacion.id];
            this.formReady = true;
          });
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
    this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;
    this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
    this.ciudadano.tipoIdentificacionId = this.tipoIdentificacionSelected;
    console.log(this.ciudadano);
		this._ciudadanoService.editCiudadano(this.ciudadano,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Echo!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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