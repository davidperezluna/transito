import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { LoginService } from '../../../../../services/login.service';
import { VhloCfgTipoVehiculoService } from '../../../../../services/vhloCfgTipoVehiculo.service';
import { VhloCfgTipoMaquinariaService } from '../../../../../services/vhloCfgTipoMaquinaria.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit-vhlocfgclase',
  templateUrl: './edit.component.html'
})

export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() clase:any = null;
public errorMessage;

public tiposVehiculo:any;
public tiposMaquinaria: any;

public tipoVehiculoSelected:any;
public tipoMaquinariaSelected:any = null;

constructor(
  private _ClaseService:  VhloCfgClaseService,
  private _TipoVehiculoService: VhloCfgTipoVehiculoService,
  private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
  private _LoginService: LoginService,
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

    this._TipoMaquinariaService.select().subscribe(
      response => {
        this.tiposMaquinaria = response;

        if(this.clase.tipoVehiculo.id == 5){
          setTimeout(() => {
            this.tipoMaquinariaSelected = [this.clase.tipoMaquinaria.id];
          });
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
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
    let token = this._LoginService.getToken();

    this.clase.idTipoVehiculo = this.tipoVehiculoSelected;
    this.clase.idTipoMaquinaria = this.tipoMaquinariaSelected;

		this._ClaseService.edit(this.clase,token).subscribe(
			response => {
        if (response.code == 200){
          this.ready.emit(true);

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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