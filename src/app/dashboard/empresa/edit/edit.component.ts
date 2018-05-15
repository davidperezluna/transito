import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Empresa } from '../empresa.modelo';
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import { TipoEmpresaService } from '../../../services/tipoEmpresa.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { TipoSociedadService } from '../../../services/tipoSociedad.service';

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
// para editar los que vienen de otra tabla

public tipoEmpresa: Array<any>
public tipoEmpresaSelected: Array<any>; // ng-select [(ngModel)]

public ciudadano: Array<any>
public ciudadanoSelected: Array<any>; // ng-select [(ngModel)]

public tipoSociedad: Array<any>
public tipoSociedadSelected: Array<any>; // ng-select [(ngModel)]

public municipios: Array<any>
public municipioNacimientoSelected: Array<any>; // ng-select [(ngModel)]
public municipioResidenciaSelected: Array<any>; // ng-select [(ngModel)]


constructor(
  private _EmpresaService: EmpresaService,
  private _loginService: LoginService,
  private _municipioService: MunicipioService,
  private _tipoEmpresaService: TipoEmpresaService,
  private _tipoSociedadService: TipoSociedadService,
  private _ciudadanoService: CiudadanoService,

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
    // this.empresa.nombre = this.empresa.nombre;
    // this.empresa.sigla = this.empresa.usuario.primerNombre;
    // this.empresa.segundoNombreUsuario = this.empresa.usuario.segundoNombre;
    // this.empresa.primerApellidoUsuario = this.empresa.usuario.primerApellido;
    // this.empresa.segundoApellidoUsuario = this.empresa.usuario.segundoApellido;
    // this.empresa.telefonoUsuario = this.empresa.usuario.telefono;
    // this.empresa.correoUsuario = this.empresa.usuario.correo;



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
    this._tipoSociedadService.getTipoSociedadSelect().subscribe(
        response => {
          this.tipoSociedad = response;
          setTimeout(() => {
            this.tipoSociedadSelected = [this.empresa.tipoSociedad.id];
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

    this._ciudadanoService.getCiudadanoSelect().subscribe(
      response => {
        this.ciudadano = response;
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

}