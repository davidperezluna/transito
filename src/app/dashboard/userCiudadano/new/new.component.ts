import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCiudadano } from '../userCiudadano.modelo';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { LoginService } from '../../../services/login.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { UserCfgGeneroService } from '../../../services/userCfgGenero.service';
import { UserCfgGrupoSanguineoService } from '../../../services/userCfgGrupoSanguineo.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgPaisService } from '../../../services/cfgPais.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-ciudadano',
  templateUrl: './new.component.html'
})
export class NewCiudadanoComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() identificacion:any = null;
@Input() tipoIdentificacion:any = null;
public ciudadano: UserCiudadano;
public errorMessage;
public respuesta;

public tiposIdentificacion: any;
public generos: any;
public gruposSanguineos: any;
public paises: any;
public departamentosNacimiento: any;
public municipiosNacimiento: any;
public departamentosResidencia: any;
public municipiosResidencia: any;

public tipoId:boolean=true;



constructor(
  private _UserCiudadanoService: UserCiudadanoService,
  private _loginService: LoginService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _GeneroService: UserCfgGeneroService,
  private _grupoSanguineoService: UserCfgGrupoSanguineoService,
  private _CfgPaisService: CfgPaisService,
  private _municipioService: CfgMunicipioService,
  private _departamentoService: CfgDepartamentoService,

){}

  ngOnInit() {
    this.ciudadano = new UserCiudadano(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

    this._TipoIdentificacionService.select().subscribe(
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

    this._GeneroService.select().subscribe(
      response => {
        this.generos = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._CfgPaisService.select().subscribe(
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

    this._grupoSanguineoService.select().subscribe(
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

    var html = 'Se va a registrar el usuario:<br>'+
               'Primer Nombre: <b>'+this.ciudadano.primerNombre+'</b><br>'+
               'Tipo Identificacion: <b>'+this.ciudadano.idTipoIdentificacion+'</b><br>'+
               'Identificacion: <b>'+this.ciudadano.identificacion+'</b><br>'+
               'Genero: <b>'+this.ciudadano.idGenero+'</b><br>'+
               'Grupo Sanguineo: <b>'+this.ciudadano.idGrupoSanguineo+'</b><br>'+
               'Direccion: <b>'+this.ciudadano.direccionPersonal+'</b><br>'+
               'Telefono: <b>'+this.ciudadano.telefono+'</b><br>';

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
          this._UserCiudadanoService.register({ 'ciudadano': this.ciudadano, 'campo': 'ciudadano' }, token).subscribe(
            response => {
              if (response.status == 'success') {
                this.ready.emit(true);
                swal({
                  title: 'Perfecto!',
                  text: 'Registro exitoso!',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
              } else {
                swal({
                  title: 'Error!',
                  text: 'El ciudadano ya se encuentra registrado',
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
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {

        }
      })
  }

  onChangedPaisNacimiento(id){
    if (id) {
      let token = this._loginService.getToken();

      this._departamentoService.selectByPais({ 'idPais': id}, token).subscribe(
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
      let token = this._loginService.getToken();
      this._municipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
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
      
      this._departamentoService.selectByPais({ 'idPais':id }, token).subscribe(
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
      this._municipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
        response => {
          this.municipiosResidencia = response;
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
  
  /*searchCiudadano() {
    let token = this._loginService.getToken();

    let datos = {
      'identificacion':this.ciudadano.identificacion,
      'tipoIdentificacion': this.tipoIdentificacionSelected,
    }
    
    this._UserCiudadanoService.searchByIdentificacion(datos,token).subscribe(
      response => {
        if(response.status == 'error'){
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
  }*/

  onChangedTipoId(event){
    this.tipoId = false;
  }

}