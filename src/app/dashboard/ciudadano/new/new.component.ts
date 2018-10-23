import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Ciudadano } from '../ciudadano.modelo';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { LoginService } from '../../../services/login.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { UserCfgRoleService } from '../../../services/userCfgRole.service';
import { GeneroService } from '../../../services/genero.service';
import { GrupoSanguineoService } from '../../../services/grupoSanguineo.service';
import { MunicipioService } from '../../../services/municipio.service';
import { PaisService } from '../../../services/pais.service';
import { DepartamentoService } from '../../../services/departamento.service';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-ciudadano',
  templateUrl: './new.component.html'
})
export class NewCiudadanoComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() identificacion:any = null;
@Input() tipoIdentificacion:any = null;
public ciudadano: Ciudadano;
public errorMessage;
public respuesta;

public tiposIdentificacion: any;
public tipoIdentificacionSelected: any;

public roles: any;

public generos: any;
public generoSelected: any;

public gruposSanguineos: any;
public grupoSanguineoSelected: any;

public paises: any;
public paisNacimientoSelected: any;
public paisResidenciaSelected: any;

public municipiosNacimiento: any;
public municipioNacimientoSelected: any;

public departamentosNacimiento: any;
public departamentoNacimientoSelected:any;

public departamentosResidencia: any;
public departamentoResidenciaSelected:any;

public municipiosResidencia: any;
public municipioResidenciaSelected: any;

public isError: any;
public isExist:boolean=false;
public tipoId:boolean=true;



constructor(
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _RoleService: UserCfgRoleService,
  private _generoService: GeneroService,
  private _grupoSanguineoService: GrupoSanguineoService,
  private _municipioService: MunicipioService,
  private _paisService: PaisService,
  private _departamentoService: DepartamentoService,

){}

  ngOnInit() {
    this.ciudadano = new Ciudadano(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._RoleService.select().subscribe(
      response => {
        this.roles = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._generoService.getGeneroSelect().subscribe(
      response => {
        this.generos = response;
        console.log(this.generos);
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
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(
      response => {
        this.gruposSanguineos = response;
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
  onEnviar(){
    let token = this._loginService.getToken();
    this.ciudadano.tipoIdentificacionUsuarioId = this.tipoIdentificacionSelected;
    
    this.ciudadano.generoId = this.generoSelected;
    this.ciudadano.grupoSanguineoId = this.grupoSanguineoSelected;
    this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
    this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;

    var html = 'Se va a registrar el usuario:<br>'+
               'Primer Nombre: <b>'+this.ciudadano.primerNombreUsuario+'</b><br>'+
               'Tipo Identificacion: <b>'+this.ciudadano.tipoIdentificacionUsuarioId+'</b><br>'+
               'Identificacion: <b>'+this.ciudadano.numeroIdentificacionUsuario+'</b><br>'+
               'Genero: <b>'+this.ciudadano.generoId+'</b><br>'+
               'Grupo Sanguineo: <b>'+this.ciudadano.grupoSanguineoId+'</b><br>'+
               'Direccion: <b>'+this.ciudadano.direccion+'</b><br>'+
               'Telefono: <b>'+this.ciudadano.telefonoUsuario+'</b><br>';

   swal({
      title: 'Creacion de persona natural',
      type: 'warning',
      html:html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Crear!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No crear',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.value) {
          
    this._CiudadanoService.register(this.ciudadano,token).subscribe(
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
            text: 'El ciudadano ya se encuentra registrado',
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
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {

        }
      })
  }

  changedPaisNacimiento(id){
  if (id) {
    this.paisNacimientoSelected = id;
    this._departamentoService.getDepartamentoPorPaisSelect(this.paisNacimientoSelected).subscribe(
      response => {
        this.departamentosNacimiento = response;
        console.log(this.departamentosNacimiento);
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
          console.log(this.municipiosNacimiento);

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
          console.log(this.departamentosResidencia);
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
          console.log(this.municipiosResidencia);

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
  
  isCiudadano() {
    console.log(this.tipoIdentificacionSelected);
    let token = this._loginService.getToken();
    let datos = {
      'identificacion':this.ciudadano.numeroIdentificacionUsuario,
      'tipoIdentificacion': this.tipoIdentificacionSelected,
    }
    
    this._CiudadanoService.isCiudadano(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'error'){
          //identificacion encontrada
          this.isError = true;
          this.isExist = false;
          
        }else{
          this.isExist = true;
          this.isError = false;
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

  changedTipoId(event){
    this.tipoId = false;
  }

}