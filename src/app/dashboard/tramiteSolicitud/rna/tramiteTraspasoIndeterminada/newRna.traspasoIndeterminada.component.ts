import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-traspaso-indeterminada',
    templateUrl: './newRna.traspasoIndeterminada.html',
})
export class NewRnaTraspasoIndeterminadaComponent implements OnInit {
  @Input() vehiculo: any = null;
  @Input() factura: any = null;
  public errorMessage;
  public id;
  public respuesta;
  public codigoOrganismo;
  public tipoServicio;
  public date;
  public formNew = false;
  public formEdit = false;
  public formIndex = true;
  public table:any;    
  public datos: any = null;
  public vehiculos: any;
  public tipoSelected;
  public viewApoderado = false;
  public tipos =[
    {'value': "Declaración",
    'label': "Declaración"},
    {'value': "Manifestación",
    'label': "Manifestación"}]    

  constructor(
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _loginService: LoginService,
    private _VehiculoService: VehiculoService,
    ){}
    
  ngOnInit() {

    this.datos = {
      'fecha': null,
      'codigoOrganismo': null,
      'tipoDocumentoSelected': null,
      'tipoServicio': null,
      'vehiculoId': null};
      
      this.datos.codigoOrganismo = this.vehiculo.sedeOperativa.codigoDivipo;
      this.datos.tipoServicio = this.vehiculo.servicio.nombre;
      this.date = new Date();
      this.datos.fecha = this.date;

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
}