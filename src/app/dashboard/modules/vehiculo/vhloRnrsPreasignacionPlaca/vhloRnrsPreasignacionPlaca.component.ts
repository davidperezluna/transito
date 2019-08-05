import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloCfgPlacaService } from '../../../../services/vhloCfgPlaca.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './vhloRnrsPreasignacionPlaca.component.html'
})

export class VhloRnrsPreasignacionPlacaComponent implements OnInit {
  public errorMessage;

  public vehiculoFiltro:any; 
  public vehiculos:any = null;
  public vehiculo:any = null;
  public placa:any = null;
  public formSearch = true; 
  public formIndex = true; 
  public formShow = true; 
  public table: any; 

  public organismosTransito:any = null;
  public organismoTransito:any = null;
  public funcionario:any = null;
  public placas:any = null;
  public preasignacion:any = false;

  public datos = {
    'idVehiculo': null,
    'idOrganismoTransito': null,
    'idPlaca': null,
  };

  public apiUrl = environment.apiUrl;

  constructor(
    private _VehiculoService: VhloVehiculoService,
    private _PlacaService: VhloCfgPlacaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
    ){}
    
  ngOnInit() {
    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
          if (response.code == 200) {
              this.funcionario = response.data;
              this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
            } else {
              this.funcionario = null;
              this.datos.idOrganismoTransito = null;

              swal({
                  title: 'Error!',
                  text: 'Usted no tiene permisos para realizar la preasigcón de placa',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
              });
          }
          error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
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
          this.vehiculos = response.data; 
          this.formIndex = true; 
          this.formShow = false;

          swal.close();

          let timeoutId = setTimeout(() => {  
            this.onInitTable();
          }, 100);
        } else {
          this.vehiculos = null;

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

  onInitTable(){
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

  onShow(vehiculo:any){
    this.vehiculo = vehiculo;
    this.datos.idVehiculo = this.vehiculo.id;

    let token = this._LoginService.getToken();

    this._PlacaService.selectByOrganismoTransitoAndTipoVehiculo({ 'idOrganismoTransito': this.funcionario.organismoTransito.id, 'idTipoVehiculo': this.vehiculo.clase.tipoVehiculo.id }, token).subscribe(
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


    if (!this.vehiculo.placa) {
      this.formIndex = false;
      this.formShow = true;
    }else{
      this.formIndex = false;
      this.formShow = false;

      swal({
        title: 'Error!',
        text: 'El vehiculo seleccionado ya tiene una placa asignada.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this._PlacaService.show({ 'id': this.datos.idPlaca }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.placa = response.data;

          var html = 'Se preasignara al vehiculo con:<br> Número de chasis:  <b>'+ this.vehiculo.chasis +
                '</b><br>Número de motor:  <b>'+ this.vehiculo.motor +
                '</b><br>Número de serie:  <b>'+ this.vehiculo.serie +
                '</b><br>La placa:<br><b><h2>'+ this.placa.numero +
                '</h2></b>durante 60 días';

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
              swal({
                title: 'Preasignando placa!',
                text: 'Solo tardara unos segundos por favor espere.',
                onOpen: () => {
                  swal.showLoading()
                }
              });

              this._VehiculoService.assign(this.datos, token).subscribe(
                response => {
                  if(response.code == 200){
                    this.preasignacion = true; 
                    
                    swal({
                      title: response.title,
                      text: response.message,
                      type: response.status,
                      confirmButtonText: 'Aceptar'
                    });
                  }else{
                    swal({
                      title: response.title,
                      text: response.message,
                      type: response.status,
                      confirmButtonText: 'Aceptar'
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
          });
        }else{
          this.placa = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }
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

  onCancelar(){
    this.ngOnInit();
  }
}