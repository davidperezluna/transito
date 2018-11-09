import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { SedeOperativaService } from '../../../../services/sedeOperativa.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteTrasladoService } from '../../../../services/tramiteTraslado.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'appRnrs-traslado',
  templateUrl: './newRnrsTraslado.component.html'  
})
export class NewTrasladoComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() readyTramite = new EventEmitter<any>();
@Input() vehiculo: any = null;
@Input() tramiteTraslado: any = null;
@Input() tramitesFactura: any = null;
@Input() factura: any = null; 
public sedeOperativaSelected: any;
public sedes: any;
public tramiteFacturaSelected: any;
public tramiteRealizado: any = false;
public errorMessage;
public respuesta;
public numeroGuia;
public fechaSalida;
public numeroRunt;
public nombreEmpresa;
public resumen = {};
public datos = {
  'sedeOperativaIdNew': null,
  'sedeOperativaIdOld': null,
  'fechaSalida': null,
  'numeroRunt': null,
  'numeroGuia': null,
  'nombreEmpresa': null,
  'tramiteFormulario': null,
  'idFactura': null,
  'vehiculoId': null
};

constructor(
  private _loginService: LoginService,
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _TramiteTrasladoService: TramiteTrasladoService,
  private _tramiteFacturaService: TramiteFacturaService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService
  ){}

  ngOnInit() {
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedes = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    
    this._VehiculoService.editSedeOperativaVehiculo(this.vehiculo,token).subscribe(
      response => {
          this.respuesta = response; 
          if(this.respuesta.status == 'success'){
              this.datos.sedeOperativaIdNew = this.sedeOperativaSelected;
              this.datos.sedeOperativaIdOld = this.vehiculo.sedeOperativa.id;
              this.datos.idFactura = this.factura.id;
              this.datos.tramiteFormulario = 'rnrs-traslado';
              this.datos.sedeOperativaIdNew = this.sedeOperativaSelected;
              this.datos.vehiculoId = this.vehiculo.id;
              this.datos.numeroGuia = this.numeroGuia;
              this.datos.numeroRunt = this.numeroRunt;
              this.datos.fechaSalida = this.fechaSalida;       
              this.datos.nombreEmpresa = this.nombreEmpresa; 
              this._TramiteTrasladoService.register(this.datos,token).subscribe(response => {
              this.respuesta = response; 
                  if(this.respuesta.status == 'success'){
                   this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
                  }
                  error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
              });
          }
          error => {
                  this.errorMessage = <any>error;

                  if(this.errorMessage != null){
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                  }
              }
      }); 

        
  }

}