import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service'
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-vehiculo-showEntrega',
  templateUrl: './showRegistroEntregaProducto.component.html'
})
export class showRegistroEntregaProductoComponent implements OnInit {
  @Input() vehiculo: any;
  @Output() cerrarForm = new EventEmitter<any>();
  public tramiteSolicitud: any;
  public msj = '';
  public showT = false;
  public tramitesFecha: any = [];
  public anioMomento;
  public mesMomento;
  public diaMomento;
  public tramitesNombres;
  public tramitesEspecificos;
  public tramiteNombreSelected:any;
  public datos = {
  'fechaDesde': null,
  'fechaHasta': null,
  'idVehiculo': null,
  'tramiteNombreSelected': null,
};

  constructor(
    private _loginService: LoginService,
    private _VehiculoService: VehiculoService,
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _CiudadanoVehiculoService: CiudadanoVehiculoService,

  ) { }

  ngOnInit() {
    this.datos.idVehiculo = this.vehiculo.id;
    let token = this._loginService.getToken();
    this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculo(token, this.vehiculo.id).subscribe(
      response => {
        this.tramiteSolicitud = response;
        console.log(this.tramiteSolicitud);
        if (this.tramiteSolicitud.length>0) {
          //entra aquí si encuentra tramites
          this.tramitesNombres = response;
          // setTimeout(() => {
          //   this.tramiteNombreSelected = [this.linea.marca.id];
          // });
          this.showT = true;

      } else {
          swal({
              type: 'error',
              title: 'Oops...',
              text: '¡El Vehiculo no tiene certificados expedidos!'
          })
      }
      }
    );
  }

  onCancelar() {
    this.cerrarForm.emit(false);
  }

  buscarTramiteByFecha(){
    let token = this._loginService.getToken();
    this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculoAndDate(token,this.datos).subscribe(
      response => {
        console.log(response);
        this.tramiteSolicitud = response.data;
        if (this.tramiteSolicitud) {
          //entra aquí si encuentra tramites
          this.tramiteSolicitud.forEach(element => {

          if(element.tramiteFactura.tramitePrecio.tramite.id == this.datos.tramiteNombreSelected){
            this.tramitesEspecificos.push(element);
          }
          console.log(this.tramitesEspecificos);
            
          });
      } else {
          swal({
              type: 'error',
              title: 'Oops...',
              text: '¡El Vehiculo no tiene certificados expedidos entre esas fechas!'
          })
      }
      }
    );
  }
}