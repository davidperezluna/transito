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
  public datos = {
  'fechaDesde': null,
  'fechaHasta': null,
};

  constructor(
    private _loginService: LoginService,
    private _VehiculoService: VehiculoService,
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _CiudadanoVehiculoService: CiudadanoVehiculoService,

  ) { }

  ngOnInit() {
    let token = this._loginService.getToken();
    this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculo(token, this.vehiculo.id).subscribe(
      response => {
        this.tramiteSolicitud = response.data;
        console.log(this.tramiteSolicitud);
        if (this.tramiteSolicitud.length>0) {
          //entra aquí si encuentra tramites
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
}