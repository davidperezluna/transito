import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Ciudadano } from '../ciudadano.modelo';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { LoginService } from '../../../services/login.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { GeneroService } from '../../../services/genero.service';
import { GrupoSanguineoService } from '../../../services/grupoSanguineo.service';
import { MunicipioService } from '../../../services/municipio.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { PaisService } from '../../../services/pais.service';
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
public tipoIdentificacionSelected: Array<any>; // ng-select [(ngModel)]

public generos: Array<any>
public generoSelected: Array<any>; // ng-select [(ngModel)]

public gruposSanguineos: Array<any>
public grupoSanguineoSelected: Array<any>; // ng-select [(ngModel)]


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
  private _ciudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _generoService: GeneroService,
  private _grupoSanguineoService: GrupoSanguineoService,
  private _municipioService: MunicipioService,
  private _departamentoService: DepartamentoService,
  private _paisService: PaisService,

  ){}

  ngOnInit(){
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


    console.log(this.ciudadano);
    this.ciudadano.numeroIdentificacionUsuario = this.ciudadano.usuario.identificacion;
    this.ciudadano.primerNombreUsuario = this.ciudadano.usuario.primerNombre;
    this.ciudadano.segundoNombreUsuario = this.ciudadano.usuario.segundoNombre;
    this.ciudadano.primerApellidoUsuario = this.ciudadano.usuario.primerApellido;
    this.ciudadano.segundoApellidoUsuario = this.ciudadano.usuario.segundoApellido;
    this.ciudadano.telefonoUsuario = this.ciudadano.usuario.telefono;
    this.ciudadano.correoUsuario = this.ciudadano.usuario.correo;

    this._departamentoService.getDepartamentoPorPaisSelect(this.ciudadano.municipioNacimiento.departamento.pais.id).subscribe(
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

     this._departamentoService.getDepartamentoPorPaisSelect(this.ciudadano.municipioResidencia.departamento.pais.id).subscribe(
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

   
    this._paisService.getPaisSelect().subscribe(
      response => {
        this.paises = response;
        setTimeout(() => {
          this.paisNacimientoSelected = [this.ciudadano.municipioNacimiento.departamento.pais.id];
          this.municipioNacimientoSelected = [this.ciudadano.municipioNacimiento.id];
          this.paisResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.pais.id];
          this.departamentoResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.id];
          this.municipioResidenciaSelected = [this.ciudadano.municipioResidencia.id];
        });
        console.log(this.departamentoNacimientoSelected);
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    
    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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

    this._generoService.getGeneroSelect().subscribe(
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

    this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(
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
    this.ciudadano.tipoIdentificacionUsuarioId = this.tipoIdentificacionSelected;
    this.ciudadano.generoId = this.generoSelected;
    this.ciudadano.grupoSanguineoId = this.grupoSanguineoSelected;
    console.log(this.ciudadano);
		this._ciudadanoService.editCiudadano(this.ciudadano,token).subscribe(
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


   changedPaisNacimiento(id){
  if (id) {
    this.paisNacimientoSelected = id;
    this._departamentoService.getDepartamentoPorPaisSelect(this.paisNacimientoSelected).subscribe(
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

  changedDepartamentoNacimiento(id){
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

  changedPaisResidencia(id){
    if (id) {
      this._departamentoService.getDepartamentoPorPaisSelect(this.paisResidenciaSelected).subscribe(
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

  changedDepartamentoResidencia(id){
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