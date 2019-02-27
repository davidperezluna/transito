import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitudRnrs.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { VehiculoService } from '../../../services/vehiculo.service';

@Component({
  selector: 'app-new',
  templateUrl: './newRnrs.component.html'
})
export class NewRnrsComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: TramiteSolicitud;
  public errorMessage;
  
  public tramitesFactura: any;
  public tramiteFacturaSelected: any;
  public facturaSelected: any;
  public facturas: any;
  public factura: any;
  public isPagada = false;
  public tramiteSelected: any;

  public isError = false;

  public vehiculo: any = null;
  public ciudadanosVehiculo: any = null;
  public ciudadano: any = null;
  public searchByIdentificacion=false;
  public isEmpresa=false;

  public tipoError=200;
  public error=false;
 
  public tramites='';
  public tramitePreasignacion=false;
  public tramiteMatriculaInicial=false;
  public tramite=false;
  public sustrato=false;
  public isTramites:boolean=true;
  public isMatricula:boolean=false;
  public apoderadoSelect=false;
  public frmApoderado=false;
  public identificacionApoderado=false;
  public apoderado:any=false;
  public apoderadoEncontrado=1
  public moduloId = 5;
  public cantidadSustrato = 1;
  public resumen = {};     public datos = {
    'moduloId': null,
    'idFactura': null,
    'vehiculoId': null,
  };
constructor(
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,
  private _tramiteFacturaService: TramiteFacturaService,
  private _facturaService: FacturaService,
  private _ciudadanoVehiculoService: CiudadanoVehiculoService,
  private _CiudadanoService: UserCiudadanoService,
  private _VehiculoService: VehiculoService,
){}

  ngOnInit() {
    this.tramiteSolicitud = new TramiteSolicitud(null, null, null, null, null,null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;
		this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        if(response.status == 'success'){
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

  onSearchFactura(numero){
    if (numero) {
      this.datos.idFactura = numero;
      this.datos.moduloId = this.moduloId;
      this.datos.vehiculoId = this.vehiculo.id;

      this._tramiteFacturaService.getTramiteShowFactura(this.datos).subscribe(
      response => {
        this.isMatricula=false;
        this.isTramites = true;
        let active = true;
        let token = this._loginService.getToken();
       
        this.tramitesFactura = response;
        this.tramitesFactura.forEach(tramiteFactura => {
          console.log(tramiteFactura.tramitePrecio.tramite.formulario);
          if (tramiteFactura.realizado == 0) {
            active = false;
          }else{
            //consultar tramite solicitud con el id de tramite factura
            //hacer un push array para extraer todas las solicitudes en estado realizado
          }
          if (tramiteFactura.tramitePrecio.tramite.sustrato) {
            this.sustrato = true;
          }
          if (tramiteFactura.tramitePrecio.tramite.formulario == 'rnrs-matriculainicial'){
            this.isMatricula = true;
          }
        });
        
        if (active) {
          this.isTramites = false;
        }
        if (this.tramiteSolicitud.solicitanteId) {
          this._ciudadanoVehiculoService.showCiudadanoVehiculo(token,this.tramiteSolicitud.solicitanteId).subscribe(
            responseCiudadano =>{
              if (responseCiudadano.status == 'success') {
                this.ciudadano = responseCiudadano.data.ciudadano;
                this.factura = response[0].factura;
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
        }else{         
          if(this.isMatricula){
            this.factura = response[0].factura;
          }else{
            this.factura = false;
            swal({
              title: 'Error!',
              text: 'Seleccionar solicitante',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
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
  }
  
  onSearchVehiculo(){
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    
    let token = this._loginService.getToken();

    this._VehiculoService.showVehiculoRnrs(this.tramiteSolicitud.vehiculoId,token).subscribe(
      response => {
        if (response.status == 'success' ) { 
          this.searchByIdentificacion = true
          this.vehiculo = response.vehiculo;
          this.ciudadanosVehiculo = response.propietarios;
          
          if (response.propietarios) {
            this.ciudadanosVehiculo = response.propietarios;
            swal.close();
          } else {
            swal({
              title: 'Alerta!',
              type: 'warning',
              text: response.message,
              confirmButtonText: 'Aceptar'
            });
          }

          this.error = false;
          this.isError = false;
        }else{
          swal({
            title: 'Alerta!',
            type: 'warning',
            text: response.message,
            confirmButtonText: 'Aceptar'
          });

          this.error = true;
          this.isError = true;
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
    this.tramiteSolicitud.ciudadanoId=this.apoderado.id;

    let token = this._loginService.getToken();

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') { 
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
            text: 'El tramiteSolicitud ya se encuentra registrada',
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

    if (this.ciudadano) {
      var html = 'Se va a enviar la siguiente solicitud:<br>' +
        'Factura: <b>' + this.factura.numero + '</b><br>' +
        'Vehiculo: <b>' + this.vehiculo.placa.numero + '</b><br>' +
        'Solicitante: <b>' + this.ciudadano.usuario.identificacion + '</b><hr>' +
        'Tramites:<br>' +
        this.tramites;
    } else {
      var html = 'Se va a enviar la siguiente solicitud:<br>' +
        'Factura: <b>' + this.factura.numero + '</b><br>' +
        'Vehiculo: <b>' + this.vehiculo.placa.numero + '</b><hr>' +
        'Tramites:<br>' +
        this.tramites;
    }
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
              console.log(this.factura);
              this.factura.estado = 'Finalizada';
              this.factura.sedeOperativaId = this.factura.sedeOperativa.id;
              this._facturaService.editFactura(this.factura,token).subscribe(
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

  agregarApoderado(){
    this.frmApoderado = true;
  }

  btnNewApoderado(){
    this.frmApoderado = false;
    this.apoderado = this.apoderadoSelect;
    this.apoderadoEncontrado = 1;
  }

  onKeyApoderado(){
    let token = this._loginService.getToken();
    let identificacion = {
  'numeroIdentificacion' : this.identificacionApoderado,
    };
    this._CiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
        response => {
   
            if(response.status == 'success'){
                this.apoderadoSelect = response.data;
                this.apoderadoEncontrado= 2;
                // this.ciudadanoNew = false;
        }else{
            this.apoderadoEncontrado=3;
            // this.ciudadanoNew = true;
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

  cerrarApoderado(){
    this.frmApoderado = false;
    this.apoderado = false; 
    this.apoderadoEncontrado = 1; 
  }

}