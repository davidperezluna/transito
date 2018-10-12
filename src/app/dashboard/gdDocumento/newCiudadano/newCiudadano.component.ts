import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Ciudadano } from '../../ciudadano/ciudadano.modelo';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { LoginService } from '../../../services/login.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { GeneroService } from '../../../services/genero.service';
import { GrupoSanguineoService } from '../../../services/grupoSanguineo.service';
import { MunicipioService } from '../../../services/municipio.service';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-ciudadano',
  templateUrl: './newCiudadano.component.html'
})
export class NewCiudadanoComponent implements OnInit {
  @Output() onReadyCiudadano = new EventEmitter<any>();
  @Input() identificacion:any = null;
  @Input() tipoIdentificacion:any = null;
  public ciudadano: Ciudadano;
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
  private _CiudadanoService: CiudadanoService,
  private _loginService: LoginService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _generoService: GeneroService,
  private _grupoSanguineoService: GrupoSanguineoService,
  private _municipioService: MunicipioService,
){}

  ngOnInit() {
    this.ciudadano = new Ciudadano(null,null,null,null,null,null,this.identificacion,null,null,null,null,null,null,null,null,null,null,null,null);

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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

    this._generoService.getGeneroSelect().subscribe(
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

    this._municipioService.getMunicipioSelect().subscribe(
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
          this._CiudadanoService.register(this.ciudadano, token).subscribe(
            response => {
              if (response.status == 'success') {
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