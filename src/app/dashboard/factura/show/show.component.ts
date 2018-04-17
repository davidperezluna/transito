import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Factura } from '../factura.modelo';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { TramiteFactura } from '../../tramiteFactura/tramiteFactura.modelo';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { TramiteService } from '../../../services/tramite.service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'factura-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
@Output() readyShow = new EventEmitter<any>();
@Input() factura:any = null;
public errorMessage;
public respuesta;
public vehiculos: any;
public tramiteFactura: TramiteFactura;
public ciudadanos: any;
public sedesOperativas: any;
public vehiculoSelected: any;
public solicitanteSelected: any;
public apoderadoSelected: any;
public tramites: any;
public sedeOperativaSelected: any;
public tramitesFactura:any;
public tramitesFacturaReady = false;
public nuevoTramite = false;
public cargar = true;
public checked:any;

constructor(
  private _FacturaService: FacturaService,
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService,
  private _TramiteFacturaService: TramiteFacturaService,
  private _TramiteService: TramiteService,
  ){}

  ngOnInit() {
    
    // console.log(this.factura);
    this._TramiteFacturaService.getTramiteFactura(this.factura.id).subscribe(
      response => {
        this.tramitesFactura = response.data;
        console.log(this.tramitesFactura);
        this.tramitesFacturaReady=true;
        this.cargar=true;
      }, 
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    
  }
  
  onCancelar(){
    this.readyShow.emit(true);
  }
  onNuevoTramite(){
    this.tramitesFacturaReady = false;
    this.cargar = false;
    this._TramiteService.getTramite().subscribe(
      response => {
        this.tramites = response.data;
        this.nuevoTramite = true;
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
        }, 100);
        
      }, 
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
  onEnviar(){
  let tramitesFacturas = {
    'tramites': [],
    'factura': this.factura.id
  };
    
   let token = this._loginService.getToken();
   this.tramites.forEach(tramite => {
     if (tramite.state) {
      tramitesFacturas.tramites.push(tramite.id);
     }
   });
   this._TramiteFacturaService.register(tramitesFacturas,token).subscribe(
    response => {
      if (response.status == 'success') {

          this._TramiteFacturaService.getTramiteFactura(this.factura.id).subscribe(
            response => {
              this.tramitesFactura = response.data;
              console.log(this.tramitesFactura);
              this.nuevoTramite=false;
              this.tramitesFacturaReady=true;
              console.log(this.tramitesFactura);
            }, 
            error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

        swal({
          title: 'Pefecto!',
          text: 'El registro se ha registrado con exito',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })

      }
    }, 
    error => {
      this.errorMessage = <any>error;
      if (this.errorMessage != null) {
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  }
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
  }
}