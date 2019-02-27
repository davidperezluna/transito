import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgClase} from '../vhloCfgClase.modelo';
import {VhloCfgClaseService} from '../../../services/vhloCfgClase.service';
import {LoginService} from '../../../services/login.service';
import {VhloCfgTipoVehiculoService} from '../../../services/vhloCfgTipoVehiculo.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() clase:any = null;
public errorMessage;
public respuesta;
public tiposVehiculo:any;
public tipoVehiculoSelected:any;
// public tipoIdentificacion: Array<any>

constructor(
  private _ClaseService:  VhloCfgClaseService,
  private _loginService: LoginService,
  private _TipoVehiculoService: VhloCfgTipoVehiculoService,
  ){}

  ngOnInit() {

    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;
        setTimeout(() => {
          this.tipoVehiculoSelected = [this.clase.tipoVehiculo.id];
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
    this.clase.idTipoVehiculo = this.tipoVehiculoSelected;
		this._ClaseService.editClase(this.clase,token).subscribe(
			response => {
        if (response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
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