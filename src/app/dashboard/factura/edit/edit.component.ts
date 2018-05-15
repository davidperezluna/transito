import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Factura } from '../factura.modelo';
import { FacturaService } from '../../../services/factura.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { LoginService } from '../../../services/login.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() factura:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public vehiculos: Array<any>
public ciudadanos: any;
public sedesOperativas: any;
public vehiculoSelected: Array<any>; // ng-select [(ngModel)]
public solicitanteSelected: Array<any>; // ng-select [(ngModel)]
public apoderadoSelected: Array<any>; // ng-select [(ngModel)]
public sedeOperativaSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _FacturaService: FacturaService,
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _CiudadanoService: CiudadanoService,
  private _SedeOperativaService: SedeOperativaService,
  ){}

  ngOnInit(){
    
    
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
        setTimeout(() => {
          this.sedeOperativaSelected = [this.factura.sedeOperativa.id];
          this.formReady = true;
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.factura.sedeOperativaId = this.sedeOperativaSelected;
		this._FacturaService.editFactura(this.factura,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
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