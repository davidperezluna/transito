import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresa } from '../userEmpresa.modelo';
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { LoginService } from '../../../../../services/login.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { UserCfgEmpresaTipoService } from '../../../../../services/userCfgEmpresaTipo.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserCfgEmpresaTipoSociedadService } from '../../../../../services/userCfgEmpresaTipoSociedad.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgEmpresaServicioService } from '../../../../../services/userCfgEmpresaServicio.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-new-userempresa',
  templateUrl: './new.component.html'
})
export class NewEmpresaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public empresa: UserEmpresa;
  public errorMessage;
  public btnVisible = false;
  public municipios: any;
  public ciudadanos: any;
  public generos: any;
  public tiposEmpresa: any;
  public tiposSociedad: any;
  public tiposIdentificacion: any;
  public municipioSelected: any;
  
  public identificacion: any;
  public ciudadano: any;

  public servicios: any;
  public servicioSelected: any;
  public tipoSociedadSelected: any;
  public tipoIdentificacionSelected: any;
  public municipioResidenciaSelected: any;
  public tipoEmpresaSelected: any;
  public tipoEmpresas: any;
  /* public modalidadTransporteSelect: any;
  public modalidadTransportes: any; */
  public tipoEntidadSelected: any;
  public municipioNacimientoSelected: any;
  public formNewSucursal = false;
  public formIndexSucursal = true;
  public tablaSucursal = false;
  public sucursales: any[] = [];
  // los que vienen desde el base de datos
  public tiposEntidad = [
    { value: 'EMPRESA DEL ESTADO', label: 'EMPRESA DEL ESTADO' },
    { value: 'EMPRESA PRIVADA', label: 'EMPRESA PRIVADA' },
    { value: 'EMPRESA PÚBLICA', label: 'EMPRESA PÚBLICA' },
    { value: 'EMPRESA SIN ÁNIMO DE LUCRO', label: 'EMPRESA SIN ÁNIMO DE LUCRO' },
  ];

  constructor(
    private _EmpresaService: UserEmpresaService,
    private _LoginService: LoginService,
    private _MunicipioService: CfgMunicipioService,
    private _UserCfgEmpresaTipoService: UserCfgEmpresaTipoService,
    private _TipoSociedadService: UserCfgEmpresaTipoSociedadService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _CiudadanoService: UserCiudadanoService,
    private _CfgEmpresaServicioService: UserCfgEmpresaServicioService,
  ) { }

  ngOnInit() {
    this.empresa = new UserEmpresa(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this._UserCfgEmpresaTipoService.select().subscribe(
      response => {
        this.tipoEmpresas = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        } 
      }
    );

    this._TipoSociedadService.select().subscribe(
      response => {
        this.tiposSociedad = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._CfgEmpresaServicioService.select().subscribe(
      response => {
        this.servicios = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
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
        if (this.errorMessage != null) {
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
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._UserCfgEmpresaTipoService.select().subscribe(
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
  onCancelar() {
    this.ready.emit(true);
  }
  // enviar a guarda
  onEnviar() {
    let token = this._LoginService.getToken();

    this.empresa.idEmpresaServicio = this.servicioSelected;
    this.empresa.idTipoIdentificacion = this.tipoIdentificacionSelected;
    this.empresa.idTipoSociedad = this.tipoSociedadSelected;
    this.empresa.idMunicipio = this.municipioSelected;
    this.empresa.idTipoEmpresa = this.tipoEmpresaSelected;
    this.empresa.idCiudadano = this.ciudadano.id;
    this.empresa.tipoEntidad = this.tipoEntidadSelected;
    /* this.empresa.idModalidadTransporte = this.modalidadTransporteSelect; */

    let datos = {
      'empresa': this.empresa,
      'sucursales': this.sucursales
    };

    this._EmpresaService.register(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      });
  }

  readySucursal(sucursal: any) {
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
    this.tablaSucursal = true;
    this.formNewSucursal = false;
  }

  onNewSucursal() {
    this.formNewSucursal = true;
    this.btnVisible = true;
    // this.formIndexSucursal = false;
    // this.table.destroy();
  }
  cancelarNewFormulario() {
    this.btnVisible = false;
    this.formNewSucursal = false
  }

  deleteSucursal(sucursal: any) {
    this.sucursales = this.sucursales.filter(h => h !== sucursal);

    if (this.sucursales.length === 0) {
      this.tablaSucursal = false;
    }
  }

  onSearchCiudadano() {
    let token = this._LoginService.getToken();
    this._EmpresaService.getBuscarCiudadano({ 'identificacion': this.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ciudadano = response.data;
        } else {
          swal({
            title: 'Alerta!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
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
}