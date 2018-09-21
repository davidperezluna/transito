import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Vehiculo } from '../vehiculo/vehiculo.modelo';
import { LoginService } from '../../services/login.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { CiudadanoVehiculoService } from '../../services/ciudadanoVehiculo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-automotor',
  templateUrl: './buscarAutomotor.component.html'
})
export class buscarAutomotorComponent implements OnInit {
  public parametro:any;
  public vehiculo: any;
  public errorMessage;
  public respuesta;
  public mensaje = '';
  public tipoError=200;
  public error=false;
  public msj='';
  public vehiculoSuccess = false;
  public formShow:any;
  public vehiculos: any;
  public resumen = {};     public datos = {
    'numeroPlaca': null,
    'numeroVIN': null,
    'numeroSerie': null,
    'numeroMotor': null,
    'numeroChasis': null,
    'propietario': null,
};


constructor(
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
){}

  ngOnInit() {
    this.vehiculo = new Vehiculo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);    
  }
  onCancelar(){
  }
  onEnviar(){
  }
  
  onKeyValidateVehiculo(){
    this.formShow = false;
    this.msj = '';
    this.mensaje = '';
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    let token = this._loginService.getToken();

     this._VehiculoService.showVehiculoParametro(token, this.datos).subscribe(
            response => {
                if (response.status == 'error') {
                    if (response.code == 401) {
                        this.msj = response.msj;
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: response.msj
                        })
                    } else if (response.code == 400) {
                        this.msj = response.msj;
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: response.msj
                        })
                    }
                    this.error = true;
                    this.vehiculoSuccess = false;
                } else {
                    this.vehiculos = response.data;
                    this.vehiculoSuccess = true;  
                    swal.close();                  
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
  }

  onShowVehiculo(vehiculo:any){
    this.vehiculo = vehiculo;
    this.formShow = true;
  }

  cerrarForm(isForm:any){
    this.formShow = isForm;
  }
}