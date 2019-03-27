import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloPropietarioService} from '../../../../services/vhloPropietario.service';
import { VhloActaTraspasoService } from '../../../../services/vhloActaTraspaso.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
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
  @Input() propietario: any = null;
  public errorMessage; 
  
  public autorizado: any = false;
  public tramiteSolicitud: any = null;

  public date:any;
  public entidadesJudiciales:any;    
  public vehiculos: any = false;
  public propietarioVehiculo;

  public table:any;    

  public acta = {
    'fecha': null,
    'numero': null,
    'tramiteSolicitud': null,
    'entidadJudicial': null,
  }

  public tipos =[
    {'value': "Declaración", 'label': "Declaración"},
    {'value': "Manifestación", 'label': "Manifestación"}
  ];

  public datos = {
    'fecha': null,
    'fechaActa': null,
    'numeroActa': null,
    'tipoTraspaso': null,
    'tipoDocApoderado': null,
    'nombreApoderado': null,
    'numeroDocumento': null,
    'idFuncionario': null,
    'idSolicitante': null,
    'idEntidadJudicial': null,
    'idVehiculo': null,
    'idOrganismoTransito': null,
    'idTramiteFactura': null,
  };

  constructor(
    private _CfgEntidadJudicialService: CfgEntidadJudicialService,
    private _VhloActaTraspasoService: VhloActaTraspasoService,
    private _VehiculoService: VhloVehiculoService,
    private _PropietarioService: VhloPropietarioService,
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TramiteFacturaService: FroFacTramiteService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    let token = this._LoginService.getToken();

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
    

    swal({
      title: 'Cargando támite!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }); 
    
    this.date = this.datos.fecha;
    this.datos.idSolicitante = this.propietario.id;
  }
  

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.datos.idTramiteFactura = this.tramiteFactura.id;
    this.datos.idOrganismoTransito = this.vehiculo.organismoTransito.id;
    this.datos.idVehiculo = this.vehiculo.id;
    

    let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

    this.tramiteSolicitud.datos = { 'foraneas': this.datos, 'resumen': resumen };
    this.tramiteSolicitud.idVehiculo = this.vehiculo.id;
    this.tramiteSolicitud.idCiudadano = this.propietario.id;

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        if (response.status == 'success') {
          //this.idTramiteSolicitud = response.idTramiteSolicitud;

          this._PropietarioService.update(this.datos, token).subscribe(
            response => {
              if (response.status == 'success') {
                //this.acta.tramiteSolicitud = this.idTramiteSolicitud;
                //this.acta.entidadJudicial = this.entidadJudicialSelected;

                this._VhloActaTraspasoService.register(this.acta, token).subscribe(
                  response => {
                    if (response.status == 'success') {
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
      }
    );
  }
}