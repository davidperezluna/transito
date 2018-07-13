import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { CiudadanoVehiculoService} from '../../../../services/ciudadanoVehiculo.service';

import swal from 'sweetalert2';
import { tokenKey } from '../../../../../../node_modules/@angular/core/src/view/util';

@Component({
    selector: 'appRna-traspaso-indeterminada',
    templateUrl: './newRna.traspasoIndeterminada.html',
})
export class NewRnaTraspasoIndeterminadaComponent implements OnInit {
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
  public date;
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
      'numeroDocumento': null};
      
      this.datos.codigoOrganismo = this.vehiculo.sedeOperativa.codigoDivipo;
      this.datos.tipoServicio = this.vehiculo.servicio.nombre;
      this.date = new Date();
      this.datos.fecha = this.date;
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
      this.datos.tramiteFactura =58;
      this.readyTramite.emit(this.datos);
  }
}