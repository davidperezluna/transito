import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserEmpresa } from '../../userEmpresa/userEmpresa.modelo';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { UserCfgEmpresaTipoService } from '../../../services/userCfgEmpresaTipo.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgEmpresaTipoSociedadService } from '../../../services/userCfgEmpresaTipoSociedad.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-empresa',
  templateUrl: './newEmpresa.component.html'
})
export class NewEmpresaComponent implements OnInit {
@Output() readyEmpresa = new EventEmitter<any>();
@Input() nit:any = null;
@Input() tipoIdentificacion:any = null;
public empresa: UserEmpresa;
public errorMessage;
public btnVisible=false;
public municipios: any;
public ciudadanos: any;
public generos: any;
public tiposEmpresa: any;
public tiposSociedad: any;
public tiposIdentificacion: any;
public municipioSelected: any;
public ciudadanoSelected: any;
public tipoSociedadSelected: any;
public tipoIdentificacionSelected: any;
public municipioResidenciaSelected: any;
public municipioNacimientoSelected: any;
public formNewSucursal = false;
public formIndexSucursal = true;
public tablaSucursal = false;
public sucursales:any[]= [];
// los que vienen desde el base de datos
constructor(
  private _EmpresaService: UserEmpresaService,
  private _LoginService: LoginService,
  private _MunicipioService: CfgMunicipioService,
  private _TipoEmpresaService: UserCfgEmpresaTipoService,
  private _TipoSociedadService: UserCfgEmpresaTipoSociedadService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _CiudadanoService: UserCiudadanoService,
){}

  ngOnInit() {
    this.empresa = new UserEmpresa(null, null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    this.empresa.nit = this.nit;
    this.empresa.idTipoIdentificacion = this.tipoIdentificacion;
    this._TipoSociedadService.select().subscribe(
      response => {
        this.tiposSociedad = response;
      }, 
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
        setTimeout(() => {
          this.tipoIdentificacionSelected = [this.tipoIdentificacion];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._CiudadanoService.select().subscribe(
      response => {
        this.ciudadanos = response;
      }, 
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._MunicipioService.select().subscribe(
      response => {
        this.municipios = response;
      }, 
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._TipoEmpresaService.select().subscribe(
      response => {
        this.tiposEmpresa = response;
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
    this.readyEmpresa.emit(false);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    let datos = {
      'empresa': this.empresa,
      'sucursales': this.sucursales
  };

    this._EmpresaService.register(datos, token).subscribe(
      response => {
        if(response.status == 'success'){
          this.readyEmpresa.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    }); 
  }

  readyEmpresaSucursal(sucursal:any){

    this.sucursales.push
    (
      {
        'nombre': sucursal.nombre,
        'sigla': sucursal.sigla,
        'celular': sucursal.celular,
        'direccion': sucursal.direccion,
        'telefono': sucursal.telefono,
        'correo': sucursal.correo,
        'fax': sucursal.fax,
        'municipioId': sucursal.municipioId,
      
      }
    );

    this.tablaSucursal=true;
    this.formNewSucursal = false;
  }

  onNewSucursal(){
    this.formNewSucursal = true;
    this.btnVisible=true;
  }
  cancelarNewFormulario()
  {
    this.btnVisible=false;
    this.formNewSucursal=false
  }

  deleteSucursal(sucursal:any)
  {
    this.sucursales =  this.sucursales.filter(h => h !== sucursal);

    if (this.sucursales.length === 0) {
      this.tablaSucursal=false;
    }
  }
}