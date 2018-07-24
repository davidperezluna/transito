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
  
  onTramiteSelect(valor:any,eve: any){
    if (eve.target.checked) {
      this.factura.valorBruto = parseInt(this.factura.valorBruto) + parseInt(valor);
    }else{
      this.factura.valorBruto = parseInt(this.factura.valorBruto) - parseInt(valor);
    }
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
  onCancelarNuevo(){
    this.nuevoTramite=false;
    this.tramitesFacturaReady=true;
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
              this.nuevoTramite=false;
              this.tramitesFacturaReady=true;
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
          title: 'Perfecto!',
          text: 'Registro exitoso!',
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