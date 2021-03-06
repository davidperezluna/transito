import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PqoCfgTarifa } from '../pqoCfgTarifa.modelo';
import { PqoCfgTarifaService } from '../../../../../services/pqoCfgTarifa.service';
import { PqoCfgPatioService } from '../../../../../services/pqoCfgPatio.service';
import { VhloCfgTipoVehiculoService } from '../../../../../services/vhloCfgTipoVehiculo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-pqocfgtarifa',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tarifa: PqoCfgTarifa;
public errorMessage;

public patios: any;
public tiposVehiculo: any;

constructor(
  private _TarifaService: PqoCfgTarifaService,
  private _PatioService: PqoCfgPatioService,
  private _TipoVehiculoService: VhloCfgTipoVehiculoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tarifa = new PqoCfgTarifa(null, null, null, null, null, null);

    this._PatioService.select().subscribe(
      response => {
        this.patios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;
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
    let token = this._loginService.getToken();
    
		this._TarifaService.register(this.tarifa,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
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