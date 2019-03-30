import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { VhloVehiculoService } from '../../services/vhloVehiculo.service';
import { VhloCfgPlacaService } from '../../services/vhloCfgPlaca.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnaPreasignacionPlaca.component.html'
})
export class VhloRnaPreasignacionPlacaComponent implements OnInit {
  @Input() ciudadanoVehiculo:any = null;
  public errorMessage;

  public vehiculoFiltro:any; 
  public vehiculo:any = null; 
  public formSearch: true; 

  public organismosTransito:any;
  public placas:any;

  public datos = {
    'idVehiculo': null,
    'idOrganismoTransito': null,
    'idPlaca': null,
  };

  constructor(
    private _VehiculoService: VhloVehiculoService,
    private _PlacaService: VhloCfgPlacaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() { 
    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
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
      this._PlacaService.selectByOrganismoTransito({ 'idOrganismoTransito': this.datos.idOrganismoTransito },token).subscribe(
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
        this._VehiculoService.assign(this.datos, token).subscribe(
          response => {
            if(response.status == 'success'){
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
    this.ngOnInit();
  }
}