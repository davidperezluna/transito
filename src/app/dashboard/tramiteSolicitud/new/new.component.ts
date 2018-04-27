import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitud.modelo';
import { Vehiculo } from '../../vehiculo/vehiculo.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { Factura } from 'app/dashboard/factura/factura.modelo';
import { error } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: TramiteSolicitud;
  public vehiculo: Vehiculo;
  public errorMessage;
  public respuesta;
  public tramitesFactura: any;
  public tramitesFacturas: any;
  public tramiteFacturaSelected: any;
  public numeroFactura: any;
  public factura: any;
  public isPagada = false;
  public tramiteSelected: any;
  public mensaje = '';
  public isError = false;
  public ciudadanosVehiculo=false;
  public ciudadano=false;
  public tipoError=200;
  public error=false;
  public msj=false;
  public tramitePreasignacion=false;
  public tramiteMatriculaInicial=false;
  public tramite=false;

constructor(
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,
  private _tramiteFacturaService: TramiteFacturaService,
  private _facturaService: FacturaService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
){}

  ngOnInit() {
    this.vehiculo = new Vehiculo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.tramiteSolicitud = new TramiteSolicitud(null, null, null, null, null,null,null);
    this.numeroFactura = {
      'numeroFactura': this.numeroFactura,
    };
    
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;

		this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        this.respuesta = response;
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
            text: 'El tramiteSolicitud '+  +' ya se encuentra registrada',
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

  onKeyValidateFactura() {
    swal({
      title: 'Buscando Factura!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading();
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });

    let token = this._loginService.getToken();
        this._facturaService.showFacturaByNumero(token, this.numeroFactura).subscribe(
        response => {
          swal.close();
          if (response.status == 'success') {
            this.factura = response.data;

            if (this.factura.estado) {
              this.isError = false;
              
            }else{
              this.factura = false;
              this.isError = true;
              this.mensaje = 'La factura no se encuentra pagada';
            }
          } else {
            this.factura = false;
            this.mensaje = 'Factura no se encuentra registrada en la base de datos';
            this.isError = true;
          }
          console.log(this.factura);
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        });
  }
  changedTramiteFactura(e){
    console.log(this.tramiteSolicitud);
    let token = this._loginService.getToken();
    this._tramiteFacturaService.showTramiteFactura(token,e).subscribe(
      response => {
        this.respuesta = response;
        this.tramiteSelected = this.respuesta.data.id;
        console.log(this.respuesta.data.id);
        this.tramite = this.respuesta.data;
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      }); 


  }
  
  onKeyValidateVehiculo(){
    let token = this._loginService.getToken();
    this._tramiteFacturaService.getTramiteFacturaSelect(this.factura.numero).subscribe(
      response => {
         this.tramitesFacturas = response;
          this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.tramiteSolicitud.vehiculoId).subscribe(
            response => {
              this.ciudadanosVehiculo = response.data;
              this.vehiculo = response.data[0].vehiculo;
              if (response.status == 'error' ) {
                this.msj= response.msj;
                this.error = true;
                this.tipoError = response.code;
                if (this.tipoError == 401) {
                  this.tramitesFacturas.forEach(tramiteFactura => {
                    if (tramiteFactura.tramiteId == '56') {
                      this.tramitePreasignacion = tramiteFactura.value;
                    }
                  });
                  if (this.tramitePreasignacion) {
                      swal({
                        title: 'Factura!',
                        text: 'primero tramita PREREASIGNACIÓN VEHICULO',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                      })
                      let arrayPreasignacion = [
                        {value: this.tramitePreasignacion, label: 'PREASIGNACION VEHICULO'},
                      ];
                      this.tramitesFactura = arrayPreasignacion;
                  }else{
                    swal({
                      title: 'Factura!',
                      text: 'el tramite PREREASIGNACIÓN VEHICULO no se encuentra facturado o ya fu tramitado para el ingreso de este nuevo vehículo',
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                    })
                  }
                }else{
                  this.tramitesFacturas.forEach(tramiteFactura => {
                    if (tramiteFactura.tramiteId == '1') {
                      this.tramiteMatriculaInicial = tramiteFactura.value;
                    }
                  });
                  if (this.tramiteMatriculaInicial) {
                    swal({
                      title: 'Factura!',
                      text: 'primero tramita MATRICULA INICIAL',
                      type: 'success',
                      confirmButtonText: 'Aceptar'
                    })
                    let arrayPreasignacion = [
                      {value: this.tramiteMatriculaInicial, label: 'MATRICULA INICIAL'},
                    ];
                    this.tramitesFactura = arrayPreasignacion;
                  }else{
                    swal({
                      title: 'Factura!',
                      text: 'el tramite MATRICULA INICIAL no se encuentra facturado o ya fue tramitado para la asignación de propietarios',
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                    })
                  }
                }
              }else{
                this.error = false;
                this.tramitesFactura = this.tramitesFacturas;
                response.data.forEach(element => {
                  if (element.ciudadano) {
                    this.ciudadano = true;
                  }else{
                    this.ciudadano = false;
                  }
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
  readyTramite(datos:any,ready:boolean){
    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;
    this.tramiteSolicitud.datos=datos;
    console.log(this.tramiteSolicitud);
    let token = this._loginService.getToken();
    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.tramiteSolicitud.vehiculoId = null;
          this.tramiteSelected = false;
          this.error = false;
        } else {
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
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

  cancelarTramite(){
    this.tramiteSelected = false;
    this.error = false;
  }

}