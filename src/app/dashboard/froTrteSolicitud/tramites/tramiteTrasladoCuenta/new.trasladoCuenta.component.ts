import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { TramiteTrasladoService } from '../../../../services/tramiteTraslado.service';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-traslado-cuenta',
  templateUrl: './new.trasladoCuenta.component.html'
})
export class NewTrasladoCuentaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Output() onReadyTramite = new EventEmitter<any>();
  @Input() vehiculo: any = null;
  @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
  public errorMessage; 
  
  public realizado: any = false;
  public organismosTransito: any;
  public tramitesFactura: any = null;
  public tramiteSolicitud: any;

  public datos = {
    'documentacion': true,
    'observacion': null,
    'fechaSalida': null,
    'numeroGuia': null,
    'nombreEmpresa': null,
    'campos': null,
    'idFuncionario': null,
    'idOrganismoTransitoOld': null,
    'idOrganismoTransitoNew': null,
    'idVehiculo': null,
    'idTramiteFactura': null,
  };

constructor(
  private _TramiteTrasladoService: TramiteTrasladoService,
  private _TramiteSolicitudService: FroTrteSolicitudService,
  private _TramiteFacturaService: FroFacTramiteService,
  private _VehiculoService: VhloVehiculoService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.datos.idFuncionario  = this.funcionario.id;
        
    if ( this.tramitesRealizados.length > 0) {
        this.tramitesRealizados.forEach(tramiteRealizado => {
            tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                return tramiteRealizado[key];
            });
            
            if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                this.realizado = true;
            }
        });
    }

    if (this.realizado) {
        swal({
            title: 'Atención!',
            text: 'El trámite seleccionado ya fue realizado.',
            type: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }else{
      this._OrganismoTransitoService.selectSedes().subscribe(
        response => {
          this.organismosTransito = response;
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
  }
  
  onEnviar(){  
    this.datos.campos = ['organismoTransito'];
    this.datos.idVehiculo = this.vehiculo.id;
    this.datos.idOrganismoTransitoOld = this.vehiculo.organismoTransito.id;
    this.datos.idTramiteFactura = this.tramiteFactura.id;

    let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
    '<br/><b>Organismo transito anterior: </b>' + this.vehiculo.organismoTransito.nombre +
    '<br/><b>Organismo transito nuevo: </b>' + this.datos.idOrganismoTransitoNew;

    this.realizado = true;

    this.onReadyTramite.emit(
      {
        'documentacion':this.datos.documentacion, 
        'observacion':this.datos.observacion, 
        'foraneas':this.datos, 
        'resumen':resumen,
        'idTramiteFactura': this.tramiteFactura.id,
      }
    );

    /*this._TramiteSolicitudService.validations(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this._VehiculoService.update(this.datos,token).subscribe(
            response => {
                response = response; 
                if(response.status == 'success'){
                  
                  
                  
                    this._TramiteTrasladoService.register(this.datos, token).subscribe(response => {
                    if (response.status == 'success') {
                      
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
          );
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
          }
      }
    ); */
  }

}