import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {ColorService} from '../../services/color.service';
import {LoginService} from '../../services/login.service';
import {Vehiculo} from '../vehiculo/vehiculo.modelo';
import { VehiculoService } from '../../services/vehiculo.service';
import { CiudadanoVehiculoService } from '../../services/ciudadanoVehiculo.service';
import {SedeOperativaService} from '../../services/sedeOperativa.service';
import {CfgPlacaService} from '../../services/cfgPlaca.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './rnaPreasignacionPlaca.component.html'
})
export class RnaPreasignacionPlacaComponent implements OnInit {
  // @Output() ready = new EventEmitter<any>();
  @Input() ciudadanoVehiculo:any = null;
  public errorMessage;
  public vehiculo: Vehiculo;
  public vehicul: any;
	public id;
	public respuesta;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public isError:any; 
  public isExist:any; 
  public msj:any; 
  public placas:any; 
  public vehiculoCriterio:any; 
  public sedeOperativaSelected:any;
  public sedesOperativas:any;
  public sedeOperativa:any;

  public cfgPlacaSelected:any;
  public cfgPlacas:any;
  public cfgPlaca:any;

  constructor(
    private _vehiculoService: VehiculoService,
		private _ColorService: ColorService,
    private _loginService: LoginService,
    private _ciudadanoVehiculoService: CiudadanoVehiculoService,
    private _SedeOperativaService: SedeOperativaService,
    private _CfgPlacaService: CfgPlacaService,
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
		this._ColorService.index().subscribe(
      response => {
        // this.colors = response.data;
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
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

  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
  }

  ready(isCreado:any){
      if(isCreado) {
        this.formNew = false;
        this.formEdit = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }
  
  deleteColor(id:any){

    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._ColorService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta = response;
                  this.ready(true);
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
    })
  }

  onKeyValidateVehiculo(){
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
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

    let token = this._loginService.getToken();

    this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.vehiculoCriterio).subscribe(
      response => {
        // console.log(response.data);
        if (response.code == 200 ) {
          this.msj = 'vehiculo ya tiene placa asignada';
          this.isError = true;
          this.isExist = false;
           
          swal.close();
        }
        if(response.code == 401){
          this.msj = 'vehiculo no se encuentra en la base de datos';
          this.isError = true;
          this.isExist = false;
          swal.close();
        }
        if(response.code == 400){
          this.msj = 'vehiculo encontrado';
          this.isError = false;
          this.isExist = true;
          this.vehiculo=response.data;
          console.log(this.vehiculo);
          
          swal.close();
        }

      error => { 
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición"); 
          }
        }
    });
    // cargar el select de sede operatiba 
    
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
        console.log(this.sedesOperativas);
        
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    // fin sede
  }
  changedSedeOperativa(e){

    let token = this._loginService.getToken();
    
    if (e) {
      this._CfgPlacaService.getCfgPlacaPorSedeOperativa(token,this.sedeOperativaSelected).subscribe(
        response => {
          this.cfgPlacas = response;
          console.log(this._CfgPlacaService);
          
          
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

  onEnviar(){
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    this.vehiculo.placa = this.cfgPlacaSelected;
    let token = this._loginService.getToken();

    var html = 'El vehiculo con:<br> numero de chasis:  <b>'+this.vehiculo.chasis+
                '</b><br>numero de motor:  <b>'+this.vehiculo.motor+
                '</b><br>numero de serie:  <b>'+this.vehiculo.serie+
                '</b><br>fue asignada La placa:<br><b><h2>'+this.vehiculo.placa+
                '</h2></b>con exitosamente durante 60 días';

    swal({
      title: '¿Estás seguro?',
      type: 'info',
      html:html,
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._vehiculoService.asignacionPlaca(this.vehiculo,token).subscribe(
          response => {
            this.respuesta = response;
            if(this.respuesta.status == 'success'){
              swal({
                title: 'Perfecto!',
                html: html,
                type: 'success',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                if (result.value) {
                  this.onCancelar();
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
    })
  }
  onCancelar(){
    this.isError = false;
    this.isExist = false;
    this.ngOnInit();
  }
}