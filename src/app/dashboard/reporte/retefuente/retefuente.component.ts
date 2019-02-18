import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Reporte} from '../reporte.modelo';
import {LoginService} from '../../../services/login.service';
import {ComparendoService} from '../../../services/comparendo.service';

import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-retefuente',
  templateUrl: './retefuente.component.html'
})
export class RetefuenteComponent implements OnInit {
@Output() ready = new EventEmitter<any>();

public municipios:any;
public errorMessage:any;
public habilitar:any;
public respuesta:any;
public comparendos:any;
public formIndex = true;
public tramite = false;
public infraccion= false;
public retefuente= false;

public table:any;
public desde:any;
public hasta:any;
public diario:any;

public retefuentes =[
  {'value':"contaduria",'label':"Reporte exógena para contaduría"},
  {'value':"tesoreria",'label':"Reporte para tesorería"}
]

constructor(
  private _ComparendoService: ComparendoService,
  private _loginService: LoginService,

){}

ngOnInit() {
  swal({
    title: 'Cargando Tabla!',
    text: 'Solo tardara unos segundos por favor espere.',
    timer: 1500,
    onOpen: () => {
      swal.showLoading()
    }
  }).then((result) => {
    if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.timer
    ) {
    }
  })
  this._ComparendoService.getComparendo().subscribe(
    response => {
      this.comparendos  = response.data;
      console.log(this.comparendos);
      
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
          sFirst: '<i class="fa fa-step-forward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-backward"></i>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }

  onCancelar(){
      this.ready.emit(true);
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
    //     this._lineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
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
    //     this._lineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
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