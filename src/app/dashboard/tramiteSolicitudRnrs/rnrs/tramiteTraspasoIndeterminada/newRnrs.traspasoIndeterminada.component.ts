import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CiudadanoVehiculoService} from '../../../../services/ciudadanoVehiculo.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';


@Component({
    selector: 'appRnrs-traspaso-indeterminada',
    templateUrl: './newRnrs.traspasoIndeterminada.html',
    providers: [DatePipe]
})
export class NewRnrsTraspasoIndeterminadaComponent implements OnInit {
  @Output() readyTramite = new EventEmitter<any>();
  @Input() vehiculo: any = null;
  @Input() factura: any = null;
  @Input() ciudadano: any = null;
  public errorMessage;
  public respuesta;
  public codigoOrganismo;
  public tipoServicio;
  public nombreApoderado;
  public tipoDocApoderado;
  public numeroDocumento;
  public date:any;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table:any;    
  public datos: any = null;
  public vehiculos: any = false;
  public propietarioVehiculo;
  public tipoSelected;
  public viewApoderado: boolean;
  public sinRegistro = "SIN REGISTRO";
  public tipos =[
    {'value': "Declaración",
    'label': "Declaración"},
    {'value': "Manifestación",
    'label': "Manifestación"}]    

  constructor(
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _loginService: LoginService,
    private _VehiculoService: VehiculoService,
    private _CiudadanoVehiculoService: CiudadanoVehiculoService,
    ){}
    
  ngOnInit() {
    this.datos = {
      'fecha': null,
      'codigoOrganismo': null,
      'tipoDocumentoSelected': null,
      'tipoServicio': null,
      'vehiculoId': null,
      'tipoDocApoderado': null,
      'nombreApoderado': null,
      'numeroDocumento': null,
      'tramiteFormulario': null,
      'facturaId': null,
      'solicitanteId': null,
      'personaTraslado': null};
      
      this.datos.codigoOrganismo = this.vehiculo.sedeOperativa.codigoDivipo;
      this.datos.tipoServicio = this.vehiculo.servicio.nombre;
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
    })  
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

  onEnviar(){
    let token = this._loginService.getToken();       
    this.datos.facturaId = this.factura.id;
    this.datos.tramiteFormulario = 'rnrs-trapasoindeterminada';
      this.readyTramite.emit(this.datos);
      this.datos.personaTraslado = this.sinRegistro;
      
      this._CiudadanoVehiculoService.eliminarVehiculoPropietario(token,this.datos).subscribe(
        response => {
          this.respuesta = response; 
          if(this.respuesta.status == 'success'){
            swal({
              title: 'Perfecto!',
              text: 'El registro se ha modificado con éxito',
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
      }
      );
  }
}