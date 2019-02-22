import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Reporte} from '../reporte.modelo';
import {LoginService} from '../../../services/login.service';
import {CfgOrganismoTransitoService} from '../../../services/cfgOrganismoTransito.service';
import {TramiteSolicitudService} from '../../../services/tramiteSolicitud.service';
import {TramiteFacturaService} from '../../../services/tramiteFactura.service';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';

import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  providers: [DatePipe]
})
export class TramiteComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public registroMaquinaria: Reporte;
public municipios:any;
public errorMessage:any;
public habilitar:any;
public respuesta:any;
public formIndex = true;
public repFecha = false;
public informe = false;
public informe2=false;
public date:any;

public multa= false;
public tramite = false;
public retefuente= false;

public table:any;
public desde:any;
public hasta:any;
public diario:any;

public sedeOperativas:any;
public tramiteReportes:any;
public reporteFechas:any;
public sedeOperativaSelected:any;

public resumen = {};     public datos = {
  'desde': null,
  'hasta': null,
  'sedeOperativa': null,
}

constructor(
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,

){}

ngOnInit() {
  
  this._OrganismoTransitoService.selectSedes().subscribe(
    response => {
      this.sedeOperativas = response;
      this.repFecha=false;
      this.informe = false;
    },  
    error => {
      this.errorMessage = <any>error;
      
      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );
  this._TramiteSolicitudService.getTramiteReporte().subscribe(
    response => {
      this.tramiteReportes = response.data;
      console.log(this.tramiteReportes);
      let timeoutId = setTimeout(() => {  
        this.iniciarTabla();
        swal.close();
      }, 100);
    }, 
    error => {
      this.errorMessage = <any>error;
      
      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );
  }
  iniciarTabla(){
  
  }
  onCancelar(){
      this.multa=false;
      // this.ready.emit(true);
  }
  onEnviar(){
  }
  reporteFecha(){
    let token = this._loginService.getToken();
    this.datos.sedeOperativa = this.sedeOperativaSelected;
    console.log(this.datos);
    this._TramiteSolicitudService.getReporteFecha(token,this.datos).subscribe(
      response => {
        
        this.reporteFechas = response.data;
        this.repFecha=true;
        this.informe=false;
        
        this.informe2=true;
        
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
          swal.close();
        }, 100);
      }, 
      error => {
        this.errorMessage = <any>error;
        
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
  reporteDiario(){
    let desde = new Date();
    this.hasta = new Date();
    this.hasta.setDate(desde.getDate() + 1);
    var datePiper = new DatePipe(this.hasta);
    var datePiper = new DatePipe(this.desde);
    this.datos.hasta = datePiper.transform(this.hasta,'yyyy-MM-dd');
    this.datos.desde = datePiper.transform(desde,'yyyy-MM-dd');
    console.log(this.datos);
    
    let token = this._loginService.getToken();
    this.datos.sedeOperativa = this.sedeOperativaSelected;
    
    this._TramiteSolicitudService.getReporteFecha(token,this.datos).subscribe(
      response => {
        
        this.reporteFechas = response.data;
        this.repFecha=true;
        this.informe=false;
        
        this.informe2=true;
        console.log(this.reporteFecha);
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
          swal.close();
        }, 100);
      }, 
      error => {
        this.errorMessage = <any>error;
        
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

  }
}
