import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitud.modelo';
import { Vehiculo } from '../../vehiculo/vehiculo.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { Factura } from 'app/dashboard/factura/factura.modelo';
import { error } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-new',
  templateUrl: './newRna.component.html'
})
export class NewRnaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: TramiteSolicitud;
  public vehiculo: Vehiculo;
  public errorMessage;
  public respuesta;
  public tramitesFactura: any;
  public tramiteFacturaSelected: any;
  public facturaSelected: any;
  public facturas: any;
  public factura: any;
  public isPagada = false;
  public tramiteSelected: any;
  public mensaje = '';
  public isError = false;
  public ciudadanosVehiculo=false;
  public isCiudadano=false;
  public ciudadano: any;
  public vehiculoSuccess=false;
  public tipoError=200;
  public error=false;
  public msj='';
  public tramites='';
  public tramitePreasignacion=false;
  public tramiteMatriculaInicial=false;
  public tramite=false;
  public sustrato=false;
  public isTramites:boolean=true;
  
  public cantidadSustrato = 1;

constructor(
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,
  private _tramiteFacturaService: TramiteFacturaService,
  private _facturaService: FacturaService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _ciudadanoService: CiudadanoService,
){}

  ngOnInit() {
    this.vehiculo = new Vehiculo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.tramiteSolicitud = new TramiteSolicitud(null, null, null, null, null,null,null);
    
    
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
            title: 'Perfecto!',
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

  changedFactura(id){
    this._tramiteFacturaService.getTramiteShowFactura(id).subscribe(
    response => {
      let active = true;
      this.factura = response[0].factura;
      this.tramitesFactura = response;
      console.log(this.tramitesFactura);
      this.tramitesFactura.forEach(tramiteFactura => {
        if (tramiteFactura.realizado == 0) {
          active = false;
        }
      });

      if (active) {
        this.isTramites = false;
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
  
  onKeyValidateVehiculo(){
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

    this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.tramiteSolicitud.vehiculoId).subscribe(
      response => {
        
        this.ciudadanosVehiculo = response.data;
        if (response.status == 'error' ) {
          this.vehiculoSuccess=false;
          this.msj= response.msj;
          this.error = true;
          this.tipoError = response.code; 
        }else{
          this.vehiculo = response.data[0].vehiculo;
          // se busca las faturas si el vehiculo fue encontrado
          let dato = {
            'vehiculo': this.vehiculo.id,
          };

          this._facturaService.showFacturaByVehiculo(token, dato).subscribe(
          response => {
            if (response.status == 'success') {
                this.facturas = response.data;
                this.vehiculoSuccess = true;
                this.msj ='vehiculo encontrado';
                this.error = false;
                this.isError = false;
                swal.close();
            } else {
              this.facturas = false;
              this.mensaje = 'Factura no se encuentra registrada en la base de datos';
              this.isError = true;
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

          
          response.data.forEach(element => {
            if (element.ciudadano) {
              this.isCiudadano = true;
            }else{
              this.isCiudadano = false;
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
  }
  readyTramite(datos:any){
    this.tramitesFactura.forEach(tramiteFactura => {
      if (tramiteFactura.tramitePrecio.tramite.id == datos.tramiteFactura) {
        this.tramiteSolicitud.tramiteFacturaId = tramiteFactura.id;
      }
    });
    this.tramiteSolicitud.datos=datos;
    this.tramiteSolicitud.vehiculoId=this.vehiculo.id;
    let token = this._loginService.getToken();
    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.error = false;
          this.changedFactura(this.factura.id)
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

  finalizarSolicitud(){

    this.tramitesFactura.forEach(tramiteFactura => {
      this.tramites = this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>' 
    });
    let token = this._loginService.getToken();

    console.log(this.tramiteSolicitud.solicitanteId);

    this._ciudadanoVehiculoService.showCiudadanoVehiculo(token,this.tramiteSolicitud.solicitanteId).subscribe(
      response =>{
        if (response.status == 'success') {
          this.ciudadano = response.data.ciudadano;
          console.log(response.data);
          var html = 'Se va a enviar la siguiente solicitud:<br>'+
                    'Factura: <b>'+this.factura.numero+'</b><br>'+
                    'Vehiculo: <b>'+this.vehiculo.placa+'</b><br>'+
                    'Solicitante: <b>'+this.ciudadano.usuario.identificacion+'</b><hr>'+
                    'Tramites:<br>'+
                    this.tramites  
          swal({
            title: 'Resumen',
            type: 'warning',
            html:html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Aceptar!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
          }).then((result) => {
            if (result.value) {

              } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
    
            }
          })
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );

          
  }

}