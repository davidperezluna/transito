import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgColorService } from '../../services/vhloCfgColor.service';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../services/vhloPropietario.service';
import { VhloCfgPlacaService } from '../../services/vhloCfgPlaca.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './rnaPreasignacionPlaca.component.html'
})
export class RnaPreasignacionPlacaComponent implements OnInit {
  @Input() ciudadanoVehiculo:any = null;
  public errorMessage;

	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 


  public vehiculoFiltro:any; 
  public vehiculo:any = null; 

  public organismosTransito:any;
  public organismoTransitoSelected:any;
  public placas:any;
  public placaSelected:any;

  constructor(
    private _VehiculoService: VhloVehiculoService,
		private _ColorService: VhloCfgColorService,
    private _PropietarioService: VhloPropietarioService,
    private _PlacaService: VhloCfgPlacaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
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
    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
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
  
  onDelete(id:any){

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
        let token = this._LoginService.getToken();

        this._ColorService.delete(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
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

  onSearchVehiculo() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._VehiculoService.searchByFilter({ 'filtro': this.vehiculoFiltro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculo = response.data;  
        } else {
          this.vehiculo = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
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
  }

  onChangedOrganismoTransito(e){
    let token = this._LoginService.getToken();
    
    if (e) {
      this._PlacaService.getCfgPlacaPorSedeOperativa(token, this.organismoTransitoSelected).subscribe(
        response => {
          this.placas = response;
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
    this.vehiculo.sedeOperativaId = this.organismoTransitoSelected;
    this.vehiculo.placa = this.placaSelected;

    let token = this._LoginService.getToken();

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
        /*
        this._VehiculoService.asignacionPlaca(this.vehiculo,token).subscribe(
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
        */ 
      }
    })
  }
  
  onCancelar(){
    this.ngOnInit();
  }
}