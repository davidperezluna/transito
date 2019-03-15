import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaService } from '../../../services/userEmpresa.service';
import { LoginService } from '../../../services/login.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { TipoUserEmpresaService } from '../../../services/tipoEmpresa.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
// import { UsuarioService } from '../../../services/usuario.service';
import { TipoSociedadService } from '../../../services/tipoSociedad.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { RepresentanteUserEmpresaService } from '../../../services/representanteEmpresa.service';
import { UserCfgEmpresaServicioService } from '../../../services/userCfgEmpresaServicio.service';

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
  public formListaRepresentanteVigente = false;
  public formListaRepresentantes = false;
  public formNewRepresentante = true;
  public representantes;
  public representanteVigente;

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

  public tiposEntidad = [
    { value: 'EMPRESA DEL ESTADO', label: 'EMPRESA DEL ESTADO' },
    { value: 'EMPRESA PRIVADA', label: 'EMPRESA PRIVADA' },
    { value: 'EMPRESA PÚBLICA', label: 'EMPRESA PÚBLICA' },
    { value: 'EMPRESA SIN ÁNIMO DE LUCRO', label: 'EMPRESA SIN ÁNIMO DE LUCRO' },
  ];
  constructor(
    private _EmpresaService: UserEmpresaService,
    private _MunicipioService: CfgMunicipioService,
    private _TipoUserEmpresaService: TipoUserEmpresaService,
    private _TipoSociedadService: TipoSociedadService,
    private _CiudadanoService: UserCiudadanoService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _RepresentanteUserEmpresaService: RepresentanteUserEmpresaService,
    private _EmpresaServicioService: UserCfgEmpresaServicioService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    console.log(this.empresa);
    let token = this._loginService.getToken();

    this.tipoEntidadSelected = [this.empresa.tipoEntidad];
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 2000,
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
    this._TipoUserEmpresaService.getTipoEmpresaSelect().subscribe(
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

    this._RepresentanteUserEmpresaService.showRepresentanteEmpresa(this.empresa.id, token).subscribe(
      response => {
        if (response.status == "success") {
          this.representanteVigente = response.representanteVigente;
          this.representantes = response.representantes;
          this.formListaRepresentanteVigente = true;

          if (this.representantes.length != 0) {
            this.formListaRepresentantes = true;
          }
        } else {
          this.formListaRepresentanteVigente = false;
          this.formNewRepresentante = true;
        }
      },
    );

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


    this._TipoSociedadService.getTipoSociedadSelect().subscribe(
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

    let token = this._loginService.getToken();
    this.empresa.municipioId = this.municipioSelected;
    this.empresa.tipoSociedadId = this.tipoSociedadSelected;
    this.empresa.tipoIdentificacionId = this.tipoIdentificacionSelected;
    this.empresa.ciudadanoId = this.ciudadanoSelected;
    this.empresa.cfgEmpresaServicioId = this.servicioSelected;

    this._EmpresaService.edit(this.empresa, token).subscribe(
      response => {
        if (response.status == 'success') {
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

  }
  nuevoRepresentante() {
    let token = this._loginService.getToken();
    let datos = {
      'empresa': this.empresa,
      'ciudadanoId': this.ciudadanoSelected,
      'fechaFinal': this.empresa.fechaFinal,
    }
    this._RepresentanteUserEmpresaService.register(datos, token).subscribe(
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

  }

}