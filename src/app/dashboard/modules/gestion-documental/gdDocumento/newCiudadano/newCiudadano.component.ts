import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCiudadano } from '../../../usuario/userCiudadano/userCiudadano.modelo';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { UserCfgGrupoSanguineoService } from '../../../../../services/userCfgGrupoSanguineo.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-ciudadano',
  templateUrl: './newCiudadano.component.html'
})
export class NewCiudadanoComponent implements OnInit {
  @Output() onReadyCiudadano = new EventEmitter<any>();
  @Input() identificacion:any = null;
  @Input() tipoIdentificacion:any = null;
  public ciudadano: UserCiudadano;
  public errorMessage;

  public tiposIdentificacion: any;
  public generos: any;
  public gruposSanguineos: any;
  public municipios: any;
  public tipoIdentificacionSelected: any;
  public generoSelected: any;
  public grupoSanguineoSelected: any;
  public municipioResidenciaSelected: any;
  public municipioNacimientoSelected: any;

constructor(
  private _UserCiudadanoService: UserCiudadanoService,
  private _loginService: LoginService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _GeneroService: UserCfgGeneroService,
  private _grupoSanguineoService: UserCfgGrupoSanguineoService,
  private _MunicipioService: CfgMunicipioService,
){}

  ngOnInit() {
    this.ciudadano = new UserCiudadano(null,null,null,null,this.identificacion,null, null,null,null,null,null,null,null,null,null,null,null,null);

    this._TipoIdentificacionService.select().subscribe(
        response => {
          this.tiposIdentificacion = response;
          setTimeout(() => {
            this.tipoIdentificacionSelected = [this.tipoIdentificacion];
          });
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

    this._MunicipioService.select().subscribe(
        response => {
          this.municipios = response;
        }, 
        error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      );
  }

  onCancelar(){
    this.onReadyCiudadano.emit(null);
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
               'Telefono: <b>'+this.ciudadano.telefonoCelular+'</b><br>';

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
          this._UserCiudadanoService.register(this.ciudadano, token).subscribe(
            response => {
              if (response.code == 200) {
                this.onReadyCiudadano.emit(response.data);
                swal({
                  title: 'Perfecto!',
                  text: response.message,
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
            }); 
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {

        }
      })
  }

}