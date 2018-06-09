import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Empresa } from '../empresa.modelo';
import { EmpresaService } from '../../../services/empresa.service';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import { TipoEmpresaService } from '../../../services/tipoEmpresa.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
// import { UsuarioService } from '../../../services/usuario.service';
import { TipoSociedadService } from '../../../services/tipoSociedad.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { RepresentanteEmpresaService } from '../../../services/representanteEmpresa.service';

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
public formListaRepresentanteVigente = false;
public formListaRepresentantes = false;
public formNewRepresentante = true;
public representantes;
public representanteVigente;

// para editar los que vienen de otra tabla

public tipoEmpresa: Array<any>
public tipoEmpresaSelected: Array<any>; // ng-select [(ngModel)]

public ciudadanos: Array<any>
public ciudadanoSelected: Array<any>; // ng-select [(ngModel)]

public tiposSociedad: Array<any>
public tipoSociedadSelected: Array<any>; // ng-select [(ngModel)]

public municipios: Array<any>
public municipioSelected: Array<any>; // ng-select [(ngModel)]

public tiposIdentificacion: Array<any>
public tipoIdentificacionSelected: Array<any>; // ng-select [(ngModel)]

// public representantes: Array<any>
public representanteEmpresaSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _empresaService: EmpresaService,
  private _loginService: LoginService,
  private _municipioService: MunicipioService,
  private _tipoEmpresaService: TipoEmpresaService,
  private _tipoSociedadService: TipoSociedadService,
  private _ciudadanoService: CiudadanoService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _representanteEmpresaService: RepresentanteEmpresaService,

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
 
    let token = this._loginService.getToken();
    this._representanteEmpresaService.showRepresentanteEmpresa(this.empresa.id,token).subscribe(
      response => {
        if(response.status == "success"){

       this.representantes=response.representantes;
       this.representanteVigente=response.representanteVigente;
       this.formListaRepresentanteVigente = true;
       

       if (this.representantes.length!=0) {
         this.formListaRepresentantes=true;
         console.log(this.representantes.length);
       }
       


       

        }else{
       this.formListaRepresentanteVigente = false;
       this.formNewRepresentante = true;
        }
      }, 
    );
    
    

    this._municipioService.getMunicipioSelect().subscribe(
        response => {
          this.municipios = response;
          setTimeout(() => {
            this.municipioSelected = [this.empresa.municipio.id];
            
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
          this.tiposSociedad = response;
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

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tiposIdentificacion = response;
        setTimeout(() => {
          this.tipoIdentificacionSelected = [this.empresa.tipoIdentificacion.id];
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
        this.ciudadanos = response;
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

  }

  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){

    let token = this._loginService.getToken();
    this.empresa.municipioId = this.municipioSelected;    
    this.empresa.tipoSociedadId = this.tipoSociedadSelected;
    this.empresa.tipoIdentificacionId = this.tipoIdentificacionSelected;
    this.empresa.ciudadanoId = this.ciudadanoSelected;
       
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

  agregarRepresentante(){
    alert("aqui esta");
  }
}