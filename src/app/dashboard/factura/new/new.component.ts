import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Factura } from '../factura.modelo';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public factura: Factura;
public errorMessage;
public respuesta;
public vehiculos: any;
public ciudadanos: any;
public sedesOperativas: any;
public vehiculoSelected: any;
public solicitanteSelected: any;
public apoderadoSelected: any;
public sedeOperativaSelected: any;

constructor(
  private _FacturaService: FacturaService,
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService,
  ){}

  ngOnInit() {
    this.factura = new Factura(null, null, null, null, null, null, null, null, null,null);

    this._VehiculoService.getVehiculoSelect().subscribe(
        response => {
          this.vehiculos = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      );

    this._CiudadanoService.getCiudadanoSelect().subscribe(
      response => {
        this.ciudadanos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
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
    this.factura.vehiculoId = this.vehiculoSelected;
    this.factura.solicitanteId = this.solicitanteSelected;
    this.factura.apoderadoId = this.apoderadoSelected;
    this.factura.sedeOperativaId = this.sedeOperativaSelected;
    
    console.log(this.factura);
		this._FacturaService.register(this.factura,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El factura '+ this.factura.numero +' ya se encuentra registrado',
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