import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitudRpccc } from '../tramiteSolicitudRpccc.modelo';
import { TramiteSolicitudRpcccService } from '../../../services/tramiteSolicitudRpccc.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { Factura } from '../../factura/factura.modelo';
import { error } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-new',
  templateUrl: './newRpccc.component.html'
})
export class NewRpcccComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() solicitante: any = null;
  public tramiteSolicitud: TramiteSolicitudRpccc;
  public errorMessage;
  public respuesta;
  public tramitesFactura: any;
  public tramiteFacturaSelected: any;
  public factura: any;
  public numeroFactura: any;
  public isPagada = false;
  public tramiteSelected: any;
  public tipoError=200;
  public error=false;
  public msj='';
  public tramites='';
  public tramitePreasignacion=false;
  public tramiteMatriculaInicial=false;
  public tramite=false;
  public sustrato=false;
  public isTramites:boolean=true;
  public isMatricula:boolean=false;
  
  public cantidadSustrato = 1;

constructor(
  private _TramiteSolicitudRpcccService: TramiteSolicitudRpcccService,
  private _loginService: LoginService,
  private _TramiteFacturaService: TramiteFacturaService,
  private _FacturaService: FacturaService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _ciudadanoService: CiudadanoService,
){}

  ngOnInit() {
    this.tramiteSolicitud = new TramiteSolicitudRpccc(null, null, null, null, null,null,null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearchFactura(){
    let token = this._loginService.getToken();
    this._FacturaService.searchByNumero(token, {'numeroFactura':this.numeroFactura}).subscribe(
      response => {          
        if(response.status == 'success'){
          this.factura = response.data;
          
          swal({
            title: 'Perfecto',
            text: "¡Factura pagada!",
            type: 'info',
          });

          this._TramiteFacturaService.getTramitesByFacturaSelect(this.factura.id).subscribe(
            response => {
              let active = true;
              this.tramitesFactura = response;              
              this.tramitesFactura.forEach(tramiteFactura => {
                if (tramiteFactura.realizado == 0) {
                  active = false;
                }else{
                  //consultar tramite solicitud con el id de tramite factura
                  //hacer un push array para extraer todas las solicitudes en estado realizado
                }
                if (tramiteFactura.tramitePrecio.tramite.sustrato) {
                  this.sustrato = true;
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
        }else{
          swal({
            title: 'Alerta',
            text: "¡Factura pendiente de pago!",
            type: 'warning',
          });
        }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onEnviar(){
    let token = this._loginService.getToken();
    
    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;

		this._TramiteSolicitudRpcccService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
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
  
  readyTramite(datos:any){
    
    console.log(datos);
    this.tramitesFactura.forEach(tramiteFactura => {
      if (tramiteFactura.tramitePrecio.tramite.id == datos.tramiteFactura) {
        this.tramiteSolicitud.tramiteFacturaId = tramiteFactura.id;
      }
    });
    this.tramiteSolicitud.datos=datos;

    let token = this._loginService.getToken();
    this._TramiteSolicitudRpcccService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.error = false;
        } else {
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud '+ +' ya se encuentra registrada',
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
    let token = this._loginService.getToken();
    this.tramites='';
    this.tramitesFactura.forEach(tramiteFactura => {
      this.tramites = this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>' 
    });

    var html = 'Se va a enviar la siguiente solicitud:<br>'+
              'Factura: <b>'+this.factura.numero+'</b><br>'+
              'Solicitante: <b>'+this.solicitante.usuario.identificacion+'</b><hr>'+
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
        this.factura.estado = 'Finalizada';
        this.factura.sedeOperativaId = this.factura.sedeOperativa.id;
        this._FacturaService.editFactura(this.factura,token).subscribe(
          response => {
            error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          });
        } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {

      }
    });     
  }

}