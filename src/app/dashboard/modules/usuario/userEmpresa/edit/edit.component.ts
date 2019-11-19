import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { LoginService } from '../../../../../services/login.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { UserCfgEmpresaTipoService } from '../../../../../services/userCfgEmpresaTipo.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserCfgEmpresaTipoSociedadService } from '../../../../../services/userCfgEmpresaTipoSociedad.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgEmpresaServicioService } from '../../../../../services/userCfgEmpresaServicio.service';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-userempresa',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() empresa: any = null;

  public errorMessage;
  public formReady = false;

  public tipoEmpresa;
  public tipoEmpresaSelected;

  public ciudadanos;
  public ciudadanoSelected;

  public tiposSociedad;
  public tipoSociedadSelected;

  public municipios;
  public municipioSelected;

  public tipoEmpresas;
  public tipoEmpresaSelect;

  public tiposIdentificacion;
  public tipoIdentificacionSelected;

  // public representantes;
  public representanteEmpresaSelected;
  public servicioSelected: any;
  public servicios: any;

  public tipoEntidadSelected: any;
  
  public identificacion;
  public ciudadano;

  public tiposEntidad = [
    { value: 'EMPRESA DEL ESTADO', label: 'EMPRESA DEL ESTADO' },
    { value: 'EMPRESA PRIVADA', label: 'EMPRESA PRIVADA' },
    { value: 'EMPRESA PÚBLICA', label: 'EMPRESA PÚBLICA' },
    { value: 'EMPRESA SIN ÁNIMO DE LUCRO', label: 'EMPRESA SIN ÁNIMO DE LUCRO' },
  ];
  constructor(
    private _EmpresaService: UserEmpresaService,
    private _MunicipioService: CfgMunicipioService,
    private _EmpresaTipoService: UserCfgEmpresaTipoService,
    private _TipoSociedadService: UserCfgEmpresaTipoSociedadService,
    private _CiudadanoService: UserCiudadanoService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _EmpresaServicioService: UserCfgEmpresaServicioService,
    private _LoginService: LoginService,
    private _UserCfgEmpresaTipoService: UserCfgEmpresaTipoService,
  ) { }

  ngOnInit() {
    console.log(this.empresa);

    this.identificacion = this.empresa.empresaRepresentante.ciudadano.identificacion;
    this.onSearchCiudadano();

    //para la fecha de inicio del representante legal
    var datePiper = new DatePipe('en-US');
    var date = new Date();

    console.log(this.empresa.empresaRepresentante.fechaInicial); 

    date.setTime(this.empresa.empresaRepresentante.fechaInicial.timestamp * 1000);

    this.empresa.empresaRepresentante.fechaInicial = datePiper.transform(
      date, 'yyyy-MM-dd'
    );

    //=======

    this._UserCfgEmpresaTipoService.select().subscribe(
      response => {
        this.tipoEmpresas = response;
        setTimeout(() => {
          this.tipoEmpresaSelected = [this.empresa.tipoEmpresa.id];
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

    this.tipoEntidadSelected = [this.empresa.tipoEntidad];
    
    this._EmpresaServicioService.select().subscribe(
      response => {
        this.servicios = response;
        setTimeout(() => {
          this.servicioSelected = [this.empresa.empresaServicio.id];
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

    this._MunicipioService.select().subscribe(
      response => {
        this.municipios = response;
        setTimeout(() => {
          this.municipioSelected = [this.empresa.municipio.id];
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );


    this._TipoSociedadService.select().subscribe(
      response => {
        this.tiposSociedad = response;
        setTimeout(() => {
          this.tipoSociedadSelected = [this.empresa.tipoSociedad.id];
          this.formReady = true;
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
        setTimeout(() => {
          this.tipoIdentificacionSelected = [this.empresa.tipoIdentificacion.id];
          this.formReady = true;
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CiudadanoService.select().subscribe(
      response => {
        this.ciudadanos = response;
        setTimeout(() => {
          this.ciudadanoSelected = [this.empresa.ciudadano.id];
          this.formReady = true;
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._EmpresaTipoService.select().subscribe(
      response => {
        this.tipoEmpresas = response;
        setTimeout(() => {
          this.tipoEmpresaSelected = [this.empresa.tipoEmpresa.id];
          this.formReady = true;
        });
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

  onCancelar() {
    this.ready.emit(true);
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
  
  onEnviar() {
    let token = this._LoginService.getToken();

    this.empresa.idMunicipio = this.municipioSelected;
    this.empresa.idTipoSociedad = this.tipoSociedadSelected;
    this.empresa.idTipoIdentificacion = 4;

    if(this.ciudadano){
      this.empresa.idCiudadano = this.ciudadano.id;
    }

    this.empresa.idEmpresaServicio = this.servicioSelected;
    this.empresa.idTipoEmpresa = this.tipoEmpresaSelected;

    this._EmpresaService.edit(this.empresa, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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
}