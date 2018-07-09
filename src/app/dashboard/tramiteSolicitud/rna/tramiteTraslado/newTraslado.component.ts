import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { SedeOperativaService } from '../../../../services/sedeOperativa.service';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteTrasladoService } from '../../../../services/tramiteTraslado.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-traslado',
  templateUrl: './newTraslado.component.html'
})
export class NewTrasladoComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() readyTramite = new EventEmitter<any>();
@Input() vehiculo: any = null;
@Input() tramitesFactura: any = null;
public sedeOperativaSelected: any;
public sedes: any;
public tramiteFacturaSelected: any;
public tramiteRealizado: any;
public errorMessage;
public respuesta;
public datos = {
  'sedeOperarivaIdNew': null,
  'sedeOperarivaIdOld': null,
  'numeroRunt': null,
  'numeroGuia': null,
  'fechaSalida': null,
  'nombreEmpresa': null,
  'tramiteFactura': null,
};

constructor(
  private _loginService: LoginService,
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _TramiteTrasladoService: TramiteTrasladoService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService
  ){}

  ngOnInit() {

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedes = response;
        console.log(this.sedes);
        
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this.tramitesFactura.forEach(tramiteFactura => {
      if (tramiteFactura.realizado == 1) {
          if (tramiteFactura.tramitePrecio.tramite.id == 3) {
              this.tramiteRealizado = tramiteFactura;
              console.log(this.tramiteRealizado);
          }
      }
  });
  //consultar tramite solicitud con tramiterealizado.id
  let token = this._loginService.getToken();
  this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token,this.tramiteRealizado.id).subscribe(
      response => {
          this.datos = response.data.datos
          console.log(response.data.datos);
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
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    this.sedes.sedeOperativaId = this.sedeOperativaSelected
    this.vehiculo.combustibleId = this.vehiculo.combustible.id    
    this.vehiculo.municipioId = this.vehiculo.municipio.id   
    this.vehiculo.lineaId = this.vehiculo.linea.id   
    this.vehiculo.colorId = this.vehiculo.color.id   
    this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
    this.vehiculo.claseId = this.vehiculo.clase.id   
    this.vehiculo.servicioId = this.vehiculo.servicio.id 
    
    this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
      response => {
          this.respuesta = response; 
          if(this.respuesta.status == 'success'){
              this.datos.sedeOperarivaIdNew = this.sedeOperativaSelected;
              this.datos.sedeOperarivaIdOld = this.vehiculo.sedeOperativa.id;
              this.datos.tramiteFactura =3;
              this.readyTramite.emit(this.datos);
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