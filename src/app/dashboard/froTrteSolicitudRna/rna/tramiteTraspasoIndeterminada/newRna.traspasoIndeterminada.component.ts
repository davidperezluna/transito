import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CiudadanoVehiculoService} from '../../../../services/ciudadanoVehiculo.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
import { VhloActaTraspasoService } from '../../../../services/vhloActaTraspaso.service';
import { DatePipe } from '@angular/common';
import { FroTrteSolicitudRna } from '../../froTrteSolicitudRna.modelo';
import swal from 'sweetalert2';
 

@Component({
    selector: 'appRna-traspaso-indeterminada',
    templateUrl: './newRna.traspasoIndeterminada.html',
    providers: [DatePipe]
})
export class NewRnaTraspasoIndeterminadaComponent implements OnInit {
  @Output() readyTramite = new EventEmitter<any>();
  @Input() vehiculo: any = null; 
  @Input() tramiteFactura: any = null;
  @Input() ciudadano: any = null;
  public errorMessage;
  public codigoOrganismo;
  public tipoServicio;
  public nombreApoderado;
  public tipoDocApoderado;
  public idTramiteSolicitud;
  public numeroDocumento;
  public date:any;
  public tramiteSolicitud: FroTrteSolicitudRna;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table:any;    
  public entidadesJudiciales:any;    
  public entidadJudicialSelected:any;    
  public datos: any = null;
  public vehiculos: any = false;
  public propietarioVehiculo;
  public tipoSelected;
  public viewApoderado: boolean;
  public sinRegistro = "SIN REGISTRO";
  public acta = {
    'fecha':null,
    'numero':null,
    'tramiteSolicitud':null,
    'entidadJudicial':null,
  }
  public tipos =[
    {'value': "Declaración",
    'label': "Declaración"},
    {'value': "Manifestación",
    'label': "Manifestación"}];
  public resumen = {};  

  constructor(
    private _CfgEntidadJudicialService: CfgEntidadJudicialService,
    private _VhloActaTraspasoService: VhloActaTraspasoService,
    private _loginService: LoginService,
    private _VehiculoService: VehiculoService,
    private _CiudadanoVehiculoService: CiudadanoVehiculoService,
    private _TramiteSolicitudService: TramiteSolicitudService,
    ){}
    
  ngOnInit() {
    this.tramiteSolicitud = new FroTrteSolicitudRna(null,null, null, null, null, null, null, null, null);
    this._CfgEntidadJudicialService.getEntidadJudicialSelect().subscribe( 
      response => {
        this.entidadesJudiciales = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this.datos = {
      'fecha': null,
      'codigoOrganismo': null,
      'tipoDocumentoSelected': null,
      'tipoServicio': null,
      'vehiculoId': null,
      'tipoDocApoderado': null,
      'nombreApoderado': null,
      'numeroDocumento': null,
      'solicitanteId': null,
      'tramiteFormulario': null,
      'idTramiteFactura': null,
      'personaTraslado': null};
      
      this.datos.codigoOrganismo = this.vehiculo.sedeOperativa.codigoDivipo;
      if (this.vehiculo.servicio) {
        this.datos.tipoServicio = this.vehiculo.servicio.nombre;
      }
      this.date = new Date();
      var datePiper = new DatePipe(this.date);
      this.datos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');
      this.datos.vehiculoId = this.vehiculo.id;

    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      this.codigoOrganismo = this.datos.codigoOrganismo;
      this.tipoServicio = this.datos.tipoServicio;
      this.date = this.datos.fecha;
    });  
    this.datos.nombreApoderado = this.ciudadano.usuario.primerNombre+" "+this.ciudadano.usuario.segundoNombre+" "+this.ciudadano.usuario.primerApellido;
    this.datos.tipoDocApoderado = this.ciudadano.usuario.tipoIdentificacion.nombre;
    this.datos.numeroDocumento = this.ciudadano.usuario.identificacion;   

    this.nombreApoderado = this.datos.nombreApoderado;
    this.tipoDocApoderado = this.datos.tipoDocApoderado;
    this.numeroDocumento = this.datos.numeroDocumento;
    this.datos.solicitanteId= this.ciudadano.id;
  }
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onEnviar() {
    let token = this._loginService.getToken();

     this.datos.idTramiteFactura = this.tramiteFactura.id;
    this.datos.tramiteFormulario = 'rna-traspasoindeterminada';
    this.datos.personaTraslado = this.sinRegistro;

    this.tramiteSolicitud.datos = { 'foraneas': this.datos, 'resumen': this.resumen };
    this.tramiteSolicitud.idVehiculo = this.vehiculo.id;
    this.tramiteSolicitud.idCiudadano = this.ciudadano.id;

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      responseTramiteSolicitud => {
        if (responseTramiteSolicitud.status == 'success') {
          this.idTramiteSolicitud = responseTramiteSolicitud.idTramiteSolicitud;
          this._CiudadanoVehiculoService.eliminarVehiculoPropietario(token, this.datos).subscribe(
            responseCiudadano => {
              if (responseCiudadano.status == 'success') {
                this.acta.tramiteSolicitud = this.idTramiteSolicitud;
                this.acta.entidadJudicial = this.entidadJudicialSelected;
                this._VhloActaTraspasoService.register(this.acta, token).subscribe(
                  responseActaTraspaso => {
                    if (responseActaTraspaso.status == 'success') {
                      swal({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                      })
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
                  }
                );
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