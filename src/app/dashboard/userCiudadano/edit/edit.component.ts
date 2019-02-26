import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { UserCfgRoleService } from '../../../services/userCfgRole.service';
import { UserCfgGeneroService } from '../../../services/userCfgGenero.service';
import { UserCfgGrupoSanguineoService } from '../../../services/userCfgGrupoSanguineo.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgPaisService } from '../../../services/cfgPais.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() ciudadano:any = null;
public errorMessage;
public respuesta;
public formReady = false;

public tiposIdentificacion: Array<any>
public tipoIdentificacionSelected: Array<any>;

public roles: any;

public generos: Array<any>
public generoSelected: Array<any>;

public gruposSanguineos: Array<any>
public grupoSanguineoSelected: Array<any>;

public paises: Array<any>;
public paisNacimientoSelected: Array<any>;
public paisResidenciaSelected: Array<any>;

public departamentosNacimiento: Array<any>;
public departamentoNacimientoSelected:Array<any>;

public departamentosResidencia: Array<any>;
public departamentoResidenciaSelected:Array<any>;

public municipiosNacimiento: Array<any>;
public municipioNacimientoSelected: Array<any>;

public municipiosResidencia: Array<any>;
public municipioResidenciaSelected: Array<any>;


constructor(
  private _CiudadanoService: UserCiudadanoService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _RoleService: UserCfgRoleService,
  private _GeneroService: UserCfgGeneroService,
  private _grupoSanguineoService: UserCfgGrupoSanguineoService,
  private _paisService: CfgPaisService,
  private _CfgDepartamentoService: CfgDepartamentoService,
  private _municipioService: CfgMunicipioService,
  private _loginService: LoginService,

  ){}

  ngOnInit(){
     swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
  
    this.ciudadano.identificacion = this.ciudadano.usuario.identificacion;
    this.ciudadano.primerNombre = this.ciudadano.usuario.primerNombre;
    this.ciudadano.segundoNombre = this.ciudadano.usuario.segundoNombre;
    this.ciudadano.primerApellido = this.ciudadano.usuario.primerApellido;
    this.ciudadano.segundoApellido = this.ciudadano.usuario.segundoApellido;
    this.ciudadano.telefono = this.ciudadano.usuario.telefono;
    this.ciudadano.correoUsuario = this.ciudadano.usuario.correo;

    let token = this._loginService.getToken();

    this._CfgDepartamentoService.selectByPais({ 'idPais': this.ciudadano.municipioNacimiento.departamento.pais.id }, token).subscribe(
      response => {
        this.departamentosNacimiento = response;
        setTimeout(() => {
          this.departamentoNacimientoSelected = [this.ciudadano.municipioNacimiento.departamento.id];
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

    this._CfgDepartamentoService.selectByPais({ 'idPais': this.ciudadano.municipioResidencia.departamento.pais.id }, token).subscribe(
      response => {
        this.departamentosResidencia = response;
        setTimeout(() => {
          this.departamentoResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.id];
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

     this._municipioService.getMunicipioPorDepartamentoSelect(this.ciudadano.municipioNacimiento.departamento.id).subscribe(
        response => {
          this.municipiosNacimiento = response;
          setTimeout(() => {
            this.municipioNacimientoSelected = [this.ciudadano.municipioNacimiento.id];
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

     this._municipioService.getMunicipioPorDepartamentoSelect(this.ciudadano.municipioResidencia.departamento.id).subscribe(
        response => {
          this.municipiosResidencia = response;
          setTimeout(() => {
            this.municipioResidenciaSelected = [this.ciudadano.municipioResidencia.id];
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
   
    this._paisService.select().subscribe(
      response => {
        this.paises = response;
        setTimeout(() => {
          this.paisNacimientoSelected = [this.ciudadano.municipioNacimiento.departamento.pais.id];
          this.municipioNacimientoSelected = [this.ciudadano.municipioNacimiento.id];
          this.paisResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.pais.id];
          this.departamentoResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.id];
          this.municipioResidenciaSelected = [this.ciudadano.municipioResidencia.id];
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
    
    this._TipoIdentificacionService.select().subscribe(
        response => {
          this.tiposIdentificacion = response;
          setTimeout(() => {
            this.tipoIdentificacionSelected = [this.ciudadano.usuario.tipoIdentificacion.id];
            this.formReady = true;
          });
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

    this._RoleService.select().subscribe(
      response => {
        this.roles = response;
        setTimeout(() => {
          this.ciudadano.idRole = [this.ciudadano.usuario.cfgRole.id];
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

    this._GeneroService.select().subscribe(
      response => {
        this.generos = response;
        setTimeout(() => {
          this.generoSelected = [this.ciudadano.genero.id];
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

    this._grupoSanguineoService.select().subscribe(
      response => {
        this.gruposSanguineos = response;
        setTimeout(() => {
          this.grupoSanguineoSelected = [this.ciudadano.grupoSanguineo.id];
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

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

    this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;
    this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
    this.ciudadano.idTipoIdentificacion = this.tipoIdentificacionSelected;
    this.ciudadano.idGenero = this.generoSelected;
    this.ciudadano.idGrupoSanguineo = this.grupoSanguineoSelected;

		this._CiudadanoService.edit(this.ciudadano,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
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


  onChangedPaisNacimiento(id){
    if (id) {
      let token = this._loginService.getToken();

      this._CfgDepartamentoService.selectByPais({ 'idPais': id }, token).subscribe(
        response => {
          this.departamentosNacimiento = response;
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
  }

  onChangedDepartamentoNacimiento(id){
    if (id) {
      this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoNacimientoSelected).subscribe(
        response => {
          this.municipiosNacimiento = response;

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
  }

  onChangedPaisResidencia(id){
    if (id) {
      let token = this._loginService.getToken();

      this._CfgDepartamentoService.selectByPais({ 'idPais':id }, token).subscribe(
        response => {
          this.departamentosResidencia = response;
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
  }

  onChangedDepartamentoResidencia(id){
    if (id) {
      this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoResidenciaSelected).subscribe(
        response => {
          this.municipiosResidencia = response;

        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            alert('Error en la petición');
          }
        }
      );
    }
  }
}