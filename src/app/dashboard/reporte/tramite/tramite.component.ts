import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Reporte} from '../reporte.modelo';
import {LoginService} from '../../../services/login.service';
import {SedeOperativaService} from '../../../services/sedeOperativa.service';
import {TramiteSolicitudService} from '../../../services/tramiteSolicitud.service';
import {TramiteFacturaService} from '../../../services/tramiteFactura.service';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';

import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html'
})
export class TramiteComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public registroMaquinaria: Reporte;
public municipios:any;
public errorMessage:any;
public habilitar:any;
public respuesta:any;
public formIndex = true;
public tramite = false;
public multa= false;
public retefuente= false;

public table:any;
public desde:any;
public hasta:any;
public diario:any;

public sedeOperativas:any;
public tramiteReportes:any;
public sedeOperativaSelected:any;

constructor(
  private _SedeOperativaService: SedeOperativaService,
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,

){}

ngOnInit() {
  
  this._SedeOperativaService.getSedeOperativaSelect().subscribe(
    response => {
      this.sedeOperativas = response;
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
   this.table = $('#dataTables-example').DataTable();
  }

  onCancelar(){
      this.multa=false;
      // this.ready.emit(true);
  }
  onEnviar(){
    // let token = this._loginService.getToken();
    // this.registroMaquinaria.tipoVehiculoId = this.combustibleSelected;
    // this.registroMaquinaria.cfgOrigenVehiculoId = this.cfgOrigenRegistroSelected;
    
    // this.registroMaquinaria.vehiculoColorId = this.colorSelected;
    // this.registroMaquinaria.vehiculoMarcaId = this.marcaSelected;
    // this.registroMaquinaria.vehiculoClaseId = this.claseSelected;
    // this.registroMaquinaria.vehiculoLineaId = this.lineaSelected;
    // this.registroMaquinaria.vehiculoCarroceriaId = this.carroceriaSelected;
    // this.registroMaquinaria.vehiculoCombustibleId = this.combustibleSelected;

    // this.registroMaquinaria.condicionSelected = this.condicionSelected;
    // this.registroMaquinaria.fechaIngreso = this.fechaIngreso;
    // this.registroMaquinaria.pesoBruto = this.pesoBruto;
    // this.registroMaquinaria.cargaUtilMaxima = this.cargaUtilMaxima;
    // this.registroMaquinaria.rodajeSelected = this.rodajeSelected;
    // this.registroMaquinaria.numeroEjes = this.numeroEjes;
    // this.registroMaquinaria.numeroLlantas = this.numeroLlantas;
    // this.registroMaquinaria.tipoCabinaSelected = this.tipoCabinaSelected;
    // this.registroMaquinaria.altoTotal = this.altoTotal;
    // this.registroMaquinaria.largoTotal = this.largoTotal;
    // this.registroMaquinaria.anchoTotal = this.anchoTotal;
    // this.registroMaquinaria.subpartidaArancelaria = this.subpartidaArancelaria;
    // console.log(this.registroMaquinaria);  
    
    // var html = 'los datos de la maquinaria a ingresar son:<br>'+
    //            'Placa: <b>'+this.registroMaquinaria.vehiculoPlaca+'</b><br>'+
    //            'Condicon ingreso: <b>'+this.registroMaquinaria.condicionSelected+'</b><br>'+
    //            'Motor: <b>'+this.registroMaquinaria.vehiculoMotor+'</b><br>'+
    //            'Serie: <b>'+this.registroMaquinaria.vehiculoSerie+'</b><br>'+
    //            'Chasis: <b>'+this.registroMaquinaria.vehiculoChasis+'</b><br>'+
    //            'Fecha ingreso: <b>'+this.registroMaquinaria.fechaIngreso+'</b><br>';
               

  //  swal({
  //     title: 'Preregistro de maquinaria!',
  //     type: 'warning',
  //     html:html,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     confirmButtonText:
  //       '<i class="fa fa-thumbs-up"></i> Crear!',
  //     confirmButtonAriaLabel: 'Thumbs up, great!',
  //     cancelButtonText:
  //     '<i class="fa fa-thumbs-down"></i> No crear',
  //     cancelButtonAriaLabel: 'Thumbs down',
  //   }).then((result) => {
  //       if (result.value) {

  //   this._RegistroMaquinariaService.register(this.registroMaquinaria,token).subscribe(
	// 		response => {
  //       this.respuesta = response;
  //       console.log(this.respuesta);
  //       if(this.respuesta.status == 'success'){
  //         this.ready.emit(true);
  //         swal({
  //           title: 'Perfecto!',
  //           text: 'Registro exitoso!',
  //           type: 'success',
  //           confirmButtonText: 'Aceptar'
  //         })
  //       }else{
  //         swal({
  //           title: 'Error!',
  //           text: 'El vehiculo '+ this.registroMaquinaria.altoTotal +' ya se encuentra registrado',
  //           type: 'error',
  //           confirmButtonText: 'Aceptar'
  //         })
  //       }
	// 		error => {
	// 				this.errorMessage = <any>error;

	// 				if(this.errorMessage != null){
	// 					console.log(this.errorMessage);
	// 					alert("Error en la petición");
	// 				}
	// 			}

    // }); 
    //     } else if (
    //       // Read more about handling dismissals
    //       result.dismiss === swal.DismissReason.cancel
    //     ) {

    //     }
    //   })
  }
  changedMarca(e){
    // if (this.marcaSelected) {
    //   let token = this._loginService.getToken()
    //     this._lineaService.getLineasMar(this.marcaSelected, token).subscribe(
    //       response => { 
    //         if (response.data[0] != null) {
    //           this.lineas = response.data;
    //         }else{
    //           this.lineas = [];
    //         }
    //       }, 
    //       error => { 
    //         this.errorMessage = <any>error;
    
    //         if(this.errorMessage != null){
    //           console.log(this.errorMessage);
    //           alert("Error en la petición");
    //         }
    //       }
    //     );
    // }
    }


  changedDepartamento(e){
    // if (this.marcaSelected) {
    //   let token = this._loginService.getToken()
    //     this._lineaService.getLineasMar(this.marcaSelected, token).subscribe(
    //       response => {
    //         console.log(response.data[0]);
    //         if (response.data[0] != null) {
    //           this.lineas = response.data;
    //         }else{
    //           this.lineas = [];
    //         }
    //       }, 
    //       error => { 
    //         this.errorMessage = <any>error;
    
    //         if(this.errorMessage != null){
    //           console.log(this.errorMessage);
    //           alert("Error en la petición");
    //         }
    //       }
    //     );
    // }
    }
}