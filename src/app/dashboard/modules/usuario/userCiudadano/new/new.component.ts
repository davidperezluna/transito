import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCiudadano } from '../userCiudadano.modelo';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { LoginService } from '../../../../../services/login.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { UserCfgGrupoSanguineoService } from '../../../../../services/userCfgGrupoSanguineo.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { CfgPaisService } from '../../../../../services/cfgPais.service';
import { CfgDepartamentoService } from '../../../../../services/cfgDepartamento.service';
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

  public tiposIdentificacion: any;
  public generos: any;
  public gruposSanguineos: any;
  public paises: any;
  public idPaisNacimiento: any;
  public departamentosNacimiento: any;
  public idDepartamentoNacimiento: any;
  public municipiosNacimiento: any;
  public idPaisResidencia: any;
  public departamentosResidencia: any;
  public idDepartamentoResidencia: any;
  public municipiosResidencia: any;

  public ciudadanoRegistrado:any = null;

constructor(
  private _UserCiudadanoService: UserCiudadanoService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _GeneroService: UserCfgGeneroService,
  private _GrupoSanguineoService: UserCfgGrupoSanguineoService,
  private _PaisService: CfgPaisService,
  private _MunicipioService: CfgMunicipioService,
  private _DepartamentoService: CfgDepartamentoService,
  private _LoginService: LoginService,

){}

  ngOnInit() {
    this.ciudadano = new UserCiudadano(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

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

    this._PaisService.select().subscribe(
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

    this._GrupoSanguineoService.select().subscribe(
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

  onChangedPaisNacimiento(id){   
    if (id) {
      let token = this._LoginService.getToken();
      
      this.idPaisResidencia = [id];

      this._DepartamentoService.selectByPais({ 'idPais': id}, token).subscribe(
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
      let token = this._LoginService.getToken();

      this.idDepartamentoResidencia = [id];

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
      this.ciudadano.idMunicipioResidencia = [id];
    }
  }

  onChangedPaisResidencia(id){
    if (id) {
      let token = this._LoginService.getToken();
      
      this._DepartamentoService.selectByPais({ 'idPais':id }, token).subscribe(
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
      let token = this._LoginService.getToken();

      this._MunicipioService.selectByDepartamento({ 'idDepartamento':id }, token).subscribe(
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
  
  onSearchCiudadano() {
    let token = this._LoginService.getToken();

    if (this.ciudadano.idTipoIdentificacion) {
      let datos = {
        'identificacion':this.ciudadano.identificacion,
        'idTipoIdentificacion': this.ciudadano.idTipoIdentificacion,
      }
      
      this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
        response => {
          if(response.status == 'error'){
            this.ciudadanoRegistrado = null;            
          }else{
            this.ciudadanoRegistrado = response.data;

            swal({
              title: 'Error!',
              text: 'El ciudadano ya se encuentra registrado.',
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        error => {
            this.errorMessage = <any>error;
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }else{
      swal({
        title: 'Error!',
        text: 'Debe seleccionar un tipo de identificación.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    var html = 'Se va a registrar el usuario:<br>' +
      'Primer Nombre: <b>' + this.ciudadano.primerNombre + '</b><br>' +
      'Tipo Identificacion: <b>' + this.ciudadano.idTipoIdentificacion + '</b><br>' +
      'Identificacion: <b>' + this.ciudadano.identificacion + '</b><br>' +
      'Genero: <b>' + this.ciudadano.idGenero + '</b><br>' +
      'Grupo Sanguineo: <b>' + this.ciudadano.idGrupoSanguineo + '</b><br>' +
      'Direccion: <b>' + this.ciudadano.direccionPersonal + '</b><br>' +
      'Telefono celular: <b>' + this.ciudadano.telefonoCelular + '</b><br>';

    swal({
      title: 'Creacion de persona natural',
      type: 'warning',
      html: html,
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
              });
            } else {
              swal({
                title: 'Error!',
                text: 'El ciudadano ya se encuentra registrado',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
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
}