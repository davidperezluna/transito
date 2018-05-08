import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Empresa } from '../empresa.modelo';
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from '../../../services/login.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { GeneroService } from '../../../services/genero.service';
import { GrupoSanguineoService } from '../../../services/grupoSanguineo.service';
import { MunicipioService } from '../../../services/municipio.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() empresa:any = null;
public errorMessage;
public respuesta;
public formReady = false;

public tiposIdentificacion: Array<any>
public tipoIdentificacionSelected: Array<any>; // ng-select [(ngModel)]

public generos: Array<any>
public generoSelected: Array<any>; // ng-select [(ngModel)]

public gruposSanguineos: Array<any>
public grupoSanguineoSelected: Array<any>; // ng-select [(ngModel)]

public municipios: Array<any>
public municipioNacimientoSelected: Array<any>; // ng-select [(ngModel)]
public municipioResidenciaSelected: Array<any>; // ng-select [(ngModel)]


constructor(
  private _empresaService: EmpresaService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _generoService: GeneroService,
  private _grupoSanguineoService: GrupoSanguineoService,
  private _municipioService: MunicipioService,

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
    console.log(this.empresa);
    this.empresa.numeroIdentificacionUsuario = this.empresa.usuario.identificacion;
    this.empresa.primerNombreUsuario = this.empresa.usuario.primerNombre;
    this.empresa.segundoNombreUsuario = this.empresa.usuario.segundoNombre;
    this.empresa.primerApellidoUsuario = this.empresa.usuario.primerApellido;
    this.empresa.segundoApellidoUsuario = this.empresa.usuario.segundoApellido;
    this.empresa.telefonoUsuario = this.empresa.usuario.telefono;
    this.empresa.correoUsuario = this.empresa.usuario.correo;

    this._municipioService.getMunicipioSelect().subscribe(
        response => {
          this.municipios = response;
          setTimeout(() => {
            this.municipioNacimientoSelected = [this.empresa.municipioNacimiento.id];
            this.municipioResidenciaSelected = [this.empresa.municipioResidencia.id];
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
    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
        response => {
          this.tiposIdentificacion = response;
          setTimeout(() => {
            this.tipoIdentificacionSelected = [this.empresa.usuario.tipoIdentificacion.id];
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
          this.generoSelected = [this.empresa.genero.id];
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
          this.grupoSanguineoSelected = [this.empresa.grupoSanguineo.id];
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
    this.empresa.municipioResidenciaId = this.municipioResidenciaSelected;
    this.empresa.municipioNacimientoId = this.municipioNacimientoSelected;
    this.empresa.tipoIdentificacionUsuarioId = this.tipoIdentificacionSelected;
    this.empresa.generoId = this.generoSelected;
    this.empresa.grupoSanguineoId = this.grupoSanguineoSelected;
    console.log(this.empresa);
		this._empresaService.editEmpresa(this.empresa,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
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

}