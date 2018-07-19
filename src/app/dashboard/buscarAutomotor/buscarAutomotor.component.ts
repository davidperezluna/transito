import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Vehiculo } from '../vehiculo/vehiculo.modelo';
import { LoginService } from '../../services/login.service';
import { VehiculoService } from '../../services/vehiculo.service';
import swal from 'sweetalert2';
import { Factura } from '../factura/factura.modelo';
import { error } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Response } from '@angular/http/src/static_response';

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
  public showV = false;

constructor(
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
){}

  ngOnInit() {
    this.vehiculo = new Vehiculo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);    
  }
  onCancelar(){
  }
  onEnviar(){
  }
  
  onKeyValidateVehiculo(){
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

    this._VehiculoService.showVehiculoParametro(token,this.parametro).subscribe(
      response => {
        if (response.status == 'error' ) {
          if(response.code ==401){
            this.msj= response.msj;
            swal.close();
          }else if(response.code == 400){
            this.msj= response.msj;
            swal.close();
          }
          this.error = true;
          swal({
            title: response.msj,
            onOpen: () => {
              swal.showLoading()
            }
          })
          swal.close();
          this.vehiculoSuccess = false;
        }else{          
          this.vehiculo = response.data;
          this.vehiculoSuccess = true;
          swal.close();
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

  showVehiculo(){
    this.showV = true;
    console.log(this.vehiculo);
  }
}