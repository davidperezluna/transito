import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../../../services/cfgOrganismoTransito.service';
//import { TramiteTrasladoService } from '../../../../../../services/tramiteTraslado.service';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-traslado-cuenta',
  templateUrl: './newTrasladoCuenta.component.html'
})
export class NewTrasladoCuentaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Output() readyTramite = new EventEmitter<any>();
  @Input() vehiculo: any = null;
  @Input() tramiteFactura: any = null;
  public errorMessage; 
  
  public autorizado: any = false;
  public organismosTransito: any;
  public tramitesFactura: any = null;
  public tramiteSolicitud: any;

  public datos = {
    'fechaSalida': null,
    'numeroRunt': null,
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
  //private _TramiteTrasladoService: TramiteTrasladoService,
  private _TramiteSolicitudService: FroTrteSolicitudService,
  private _TramiteFacturaService: FroFacTramiteService,
  private _VehiculoService: VhloVehiculoService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.datos.idFuncionario = response.data.id;
          this.autorizado = true;

          this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.tramiteFactura = response.data;

                swal.close();
              } else {
                this.tramiteFactura = null;

                swal({
                  title: 'Error!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
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

          if (this.tramiteFactura.realizado) {
            this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
              response => {
                if (response.code == 200) {
                  this.tramiteSolicitud = response.data;
                } else {
                  this.tramiteSolicitud = null;

                  swal({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  });
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
          } else {
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
        } else {
          this.autorizado = false;

          swal({
            title: 'Error!',
            text: 'Usted no tiene permisos para realizar tramites',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
    this.datos.campos = ['organismoTransito'];
    this.datos.idVehiculo = this.vehiculo.id;
    this.datos.idOrganismoTransitoOld = this.vehiculo.organismoTransito.id;
    this.datos.idTramiteFactura = this.tramiteFactura.id;

    this._TramiteSolicitudService.validations(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this._VehiculoService.update(this.datos,token).subscribe(
            response => {
                response = response; 
                if(response.code == 200){
                  let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
                    '<br/><b>Organismo transito anterior: </b>' + this.vehiculo.organismoTransito.nombre +
                    '<br/><b>Organismo transito nuevo: </b>' + this.datos.idOrganismoTransitoNew;
      
                  /*this._TramiteTrasladoService.register(this.datos, token).subscribe(response => {
                    if (response.code == 200) {
                      this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                    }
                    error => {
                      this.errorMessage = <any>error;
      
                      if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                      }
                    }
                  }
                );*/
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
    ); 
  }

}