import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserEmpresa } from '../userEmpresa.modelo';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import { TipoUserEmpresaService } from '../../../services/tipoEmpresa.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { TipoSociedadService } from '../../../services/tipoSociedad.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { CfgEmpresaServicioService } from '../../../services/cfgEmpresaServicio.service';

import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-empresa',
  templateUrl: './new.component.html'
})
export class NewEmpresaComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public empresa: UserEmpresa;
public errorMessage;
public btnVisible=false;
public respuesta;
public municipios: any;
public ciudadanos: any;
public generos: any;
public tiposEmpresa: any;
public tiposSociedad: any;
public tiposIdentificacion: any;
public municipioSelected: any;
public ciudadanoSelected: any;
public servicioSelected: any;
public servicios: any;
public tipoSociedadSelected: any;
public tipoIdentificacionSelected: any;
public municipioResidenciaSelected: any;
public tipoEmpresaSelected: any;
public tipoEmpresas: any;
public municipioNacimientoSelected: any;
public formNewSucursal = false;
public formIndexSucursal = true;
public tablaSucursal = false;
public sucursales:any[]= [];
// los que vienen desde el base de datos
constructor(
  private _EmpresaService: UserEmpresaService,
  private _loginService: LoginService,
  private _municipioService: MunicipioService,
  private _tipoUserEmpresaService: TipoUserEmpresaService,
  private _tipoSociedadService: TipoSociedadService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _CiudadanoService: UserCiudadanoService,
  private _CfgEmpresaServicio: CfgEmpresaServicioService,
){} 

  ngOnInit() {
    this.empresa = new UserEmpresa(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

    this._tipoUserEmpresaService.getTipoEmpresaSelect().subscribe(
      response => {
        this.tipoEmpresas = response;
      }, 
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._tipoSociedadService.getTipoSociedadSelect().subscribe(
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

    this._CfgEmpresaServicio.select().subscribe(
      response => {
        this.servicios = response;
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

    this._municipioService.getMunicipioSelect().subscribe(
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

    this._tipoUserEmpresaService.getTipoEmpresaSelect().subscribe(
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
    this.ready.emit(true);
  }
  // enviar a guarda
  onEnviar(){
    let token = this._loginService.getToken();

    this.empresa.cfgEmpresaServicioId = this.servicioSelected;
    this.empresa.cfgEmpresaServicioId = this.servicioSelected;

    let datos = {
      'empresa': this.empresa,
      'sucursales': this.sucursales
  };

    this._EmpresaService.register(datos,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El empresa ya se encuentra registrado',
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

  readySucursal(sucursal:any){

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

    console.log(this.sucursales);
    
  }

  onNewSucursal(){
    this.formNewSucursal = true;
    this.btnVisible=true;
    // this.formIndexSucursal = false;
    // this.table.destroy();
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