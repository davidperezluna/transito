import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Empresa } from '../empresa.modelo';
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import { TipoEmpresaService } from '../../../services/tipoEmpresa.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
// import { UsuarioService } from '../../../services/usario.service';
import swal from 'sweetalert2';
 
@Component({
  selector: 'app-new-empresa',
  templateUrl: './new.component.html'
})
export class NewEmpresaComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public empresa: Empresa;
public errorMessage;
public respuesta;
public municipios: any;
public generos: any;
public tiposEmpresa: any;
public gruposSanguineos: any;
public municipioSelected: any;
public generoSelected: any;
public grupoSanguineoSelected: any;
public municipioResidenciaSelected: any;
public municipioNacimientoSelected: any;


constructor(
  private _EmpresaService: EmpresaService,
  private _loginService: LoginService,
  private _municipioService: MunicipioService,
  private _tipoEmpresaService: TipoEmpresaService,
  private _ciudadanoService: CiudadanoService,
){}

  ngOnInit() {
    this.empresa = new Empresa(null,null,null,null,null,null,null,null,null,null,null);

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

    this._tipoEmpresaService.getTipoEmpresaSelect().subscribe(
      response => {
        this.tiposEmpresa = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );


    // this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(
    //   response => {
    //     this.gruposSanguineos = response;
    //   },
    //   error => {
    //     this.errorMessage = <any>error;

    //     if (this.errorMessage != null) {
    //       console.log(this.errorMessage);
    //       alert('Error en la petición');
    //     }
    //   }
    // );

   
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.empresa.municipioId = this.municipioSelected;
    // this.empresa.tipoEmpresaId = this.tipoEmpresaSelected;
    // this.empresa.ciudadanoId = this.ciudadanoSelected;

    this._EmpresaService.register(this.empresa,token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El empresa ya se encuentra registrado',
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
  }

}