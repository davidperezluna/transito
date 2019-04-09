import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloPropietarioService} from '../../../../services/vhloPropietario.service';
//import { VhloActaTraspasoService } from '../../../../services/vhloActaTraspaso.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { DatePipe } from '@angular/common';
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
  @Input() idPropietario: any = null;
  public errorMessage; 
  
  public autorizado: any = false;
  public tramiteSolicitud: any = null;

  public date:any;
  public entidadesJudiciales:any;    
  public vehiculos: any = false;
  public propietario;

  public table:any;    

  public tipos =[
    {'value': "Declaración", 'label': "Declaración"},
    {'value': "Manifestación", 'label': "Manifestación"}
  ];

  public datos = {
    'permiso': true,
    'fecha': null,
    'fechaActa': null,
    'numeroActa': null,
    'tipoPropiedad': 2,
    'tipoTraspaso': null,
    'idFuncionario': null,
    'idVehiculo': null,
    'idEntidadJudicial': null,
    'idPropietario': null,
    'idCiudadano': null,
    'idEmpresa': null,
    'idTramiteFactura': null,
  };

  constructor(
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TramiteFacturaService: FroFacTramiteService,
    private _CfgEntidadJudicialService: CfgEntidadJudicialService,
    //private _ActaTraspasoService: VhloActaTraspasoService,
    private _PropietarioService: VhloPropietarioService,
    private _CiudadanoService: UserCiudadanoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
            if (response.status == 'success') {
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
                  this._CfgEntidadJudicialService.select().subscribe( 
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
                  
                  this.date = new Date();
                  var datePiper = new DatePipe(this.date);
                  this.datos.fecha = datePiper.transform(this.date,'yyyy-MM-dd');
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
  

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.datos.idVehiculo = this.vehiculo.id;
    this.datos.idTramiteFactura = this.tramiteFactura.id;

    this._PropietarioService.show({ 'id': this.idPropietario }, token ).subscribe(
      response => {
          this.propietario = response.data;
          this.datos.idPropietario = this.propietario.id;

          let datos = {
            'identificacion': 99,
            'idTipoIdentificacion': 1,
          }

          this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
              if (response.code == 200) {
                if (response.data.ciudadano) {
                  this.datos.idCiudadano = response.data.ciudadano.id;

                  this._TramiteSolicitudService.validations(this.datos, token).subscribe(
                    response => {
                      if (response.code == 200) {
                        this._PropietarioService.update(this.datos, token).subscribe(
                          response => {
                            if (response.code == 200) {
                              let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;
    
                              this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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
              } else {
                this.datos.idCiudadano = null;

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
                      alert('Error en la petición');
                  }
              }
          }
        );
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