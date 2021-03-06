import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgRoleService } from '../../../../../services/userCfgRole.service';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { UserCfgGrupoSanguineoService } from '../../../../../services/userCfgGrupoSanguineo.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../../../services/cfgDepartamento.service';
import { CfgPaisService } from '../../../../../services/cfgPais.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-userciudadano',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() ciudadano:any = null;
public errorMessage;

public tiposIdentificacion: any;
public generos: any;
public gruposSanguineos: any;
public paises: any;
public departamentosNacimiento: any;
public departamentosResidencia: any;
public municipiosNacimiento: any;
public municipiosResidencia: any;

public idPaisNacimiento: any;
public idPaisResidencia: any;
public idDepartamentoNacimiento:any;
public idDepartamentoResidencia:any;
public correo:any;
public password:any;

constructor(
  private _CiudadanoService: UserCiudadanoService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _RoleService: UserCfgRoleService,
  private _GeneroService: UserCfgGeneroService,
  private _grupoSanguineoService: UserCfgGrupoSanguineoService,
  private _paisService: CfgPaisService,
  private _CfgDepartamentoService: CfgDepartamentoService,
  private _MunicipioService: CfgMunicipioService,
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

    var datePiper = new DatePipe('en-US');

    var date = new Date();
    date.setTime(this.ciudadano.fechaNacimiento.timestamp * 1000);

    this.ciudadano.fechaNacimiento = datePiper.transform(
      date, 'yyyy-MM-dd'
    );

    date.setTime(this.ciudadano.fechaExpedicionDocumento.timestamp * 1000);
    this.ciudadano.fechaExpedicionDocumento = datePiper.transform(
      date, 'yyyy-MM-dd'
    );
  
    this.correo = this.ciudadano.usuario.correo;

    let token = this._loginService.getToken();

    this._CfgDepartamentoService.selectByPais({ 'idPais': this.ciudadano.municipioNacimiento.departamento.pais.id }, token).subscribe(
      response => {
        this.departamentosNacimiento = response;

        setTimeout(() => {
          this.idDepartamentoNacimiento = [ this.ciudadano.municipioNacimiento.departamento.id ];
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
          this.idDepartamentoResidencia = [this.ciudadano.municipioResidencia.departamento.id];
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

    this._MunicipioService.selectByDepartamento({ 'idDepartamento': this.ciudadano.municipioNacimiento.departamento.id }, token).subscribe(
      response => {
        this.municipiosNacimiento = response;
        setTimeout(() => {
          this.ciudadano.idMunipicioNacimiento = [this.ciudadano.municipioNacimiento.id];
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

    this._MunicipioService.selectByDepartamento({ 'idDepartamento':this.ciudadano.municipioResidencia.departamento.id}, token).subscribe(
      response => {
        this.municipiosResidencia = response;
        setTimeout(() => {
          this.ciudadano.idMunicipioResidencia = [this.ciudadano.municipioResidencia.id];
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
          this.idPaisNacimiento = [this.ciudadano.municipioNacimiento.departamento.pais.id];
          this.idDepartamentoNacimiento = [this.ciudadano.municipioNacimiento.departamento.id];
          this.ciudadano.idMunicipioNacimiento = [this.ciudadano.municipioNacimiento.id];
          this.idPaisResidencia = [this.ciudadano.municipioResidencia.departamento.pais.id];
          this.idDepartamentoResidencia = [this.ciudadano.municipioResidencia.departamento.id];
          this.ciudadano.idMunicipioResidencia = [this.ciudadano.municipioResidencia.id];
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
          this.ciudadano.idTipoIdentificacion = [this.ciudadano.tipoIdentificacion.id];
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
          this.ciudadano.idGenero = [this.ciudadano.genero.id];
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
          this.ciudadano.idGrupoSanguineo = [this.ciudadano.grupoSanguineo.id];
        });

        swal.close();
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

    this.ciudadano.usuario.correo = this.correo;
    this.ciudadano.usuario.password = this.password;

    this._CiudadanoService.edit({ 'ciudadano': this.ciudadano }, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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
    let token = this._loginService.getToken();

    if (id) {
      this._MunicipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
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

  onChangedMunicipioNacimiento(id){
    if (id) {
      this.ciudadano.idMunicipioResidencia = id;
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
      let token = this._loginService.getToken();

      this._MunicipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
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