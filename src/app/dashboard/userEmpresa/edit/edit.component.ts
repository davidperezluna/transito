import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { UserCfgEmpresaTipoService } from '../../../services/userCfgEmpresaTipo.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgEmpresaTipoSociedadService } from '../../../services/userCfgEmpresaTipoSociedad.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { UserCfgEmpresaServicioService } from '../../../services/userCfgEmpresaServicio.service';
import { VhloCfgModalidadTransporteService } from '../../../services/vhloCfgModalidadTransporte.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() empresa: any = null;

  public errorMessage;
  public formReady = false;


  public modalidadTransporteSelect;
  public modalidadTransportes;

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
    private _ModalidadTransporteService: VhloCfgModalidadTransporteService
  ) { }

  ngOnInit() {
    let token = this._LoginService.getToken();

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

    this._ModalidadTransporteService.select().subscribe(
      response => {
        this.modalidadTransportes = response;
        setTimeout(() => {
          if(this.empresa.modalidadTransporte == null){
            this.modalidadTransporteSelect = [0];
          } else {
            this.modalidadTransporteSelect = [this.empresa.modalidadTransporte.id];
          }
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
  }

  onCancelar() {
    this.ready.emit(true);
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
    this.empresa.idModalidadTransporte = this.modalidadTransporteSelect;

    this._EmpresaService.edit(this.empresa, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });

  }

  /* nuevoRepresentante() {
    let token = this._LoginService.getToken();
    let datos = {
      'empresa': this.empresa,
      'ciudadanoId': this.ciudadanoSelected,
      'fechaFinal': this.empresa.fechaFinal,
    }
    this._RepresentanteEmpresaService.register(datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ngOnInit();
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });

  } */

  onSearchCiudadano() {
    let token = this._LoginService.getToken();
    this._EmpresaService.getBuscarCiudadano({ 'identificacion': this.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
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