import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgClase } from '../vhloCfgClase.modelo';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgTipoVehiculoService } from '../../../../../services/vhloCfgTipoVehiculo.service';
import { VhloCfgTipoMaquinariaService } from '../../../../../services/vhloCfgTipoMaquinaria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgclase',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public clase: VhloCfgClase;
public errorMessage;

public tiposVehiculo:any;
public tiposMaquinaria: any;

constructor(
  private _ClaseService: VhloCfgClaseService,
  private _TipoVehiculoService: VhloCfgTipoVehiculoService,
  private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.clase = new VhloCfgClase(null, null, null, null, null);

    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;
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

		this._ClaseService.register(this.clase,token).subscribe(
			response => {

        if(response.code == 200){
          this.ready.emit(true);

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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