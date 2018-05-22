import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Sucursal } from '../sucursal.modelo';
import { SucursalService } from '../../../services/sucursal.service';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';

import { CiudadanoService } from '../../../services/ciudadano.service';
import { TipoSociedadService } from '../../../services/tipoSociedad.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() sucursal:any = null;

public errorMessage;
public respuesta;
public formReady = false;
// para editar los que vienen de otra tabla

public tipoSucursal: Array<any>
public tipoSucursalSelected: Array<any>; // ng-select [(ngModel)]

public ciudadanos: Array<any>
public ciudadanoSelected: Array<any>; // ng-select [(ngModel)]

public tiposSociedad: Array<any>
public tipoSociedadSelected: Array<any>; // ng-select [(ngModel)]

public municipios: Array<any>
public municipioSelected: Array<any>; // ng-select [(ngModel)]

public tiposIdentificacion: Array<any>
public tipoIdentificacionSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _sucursalService: SucursalService,
  private _loginService: LoginService,
  private _municipioService: MunicipioService,
  
  private _tipoSociedadService: TipoSociedadService,
  private _ciudadanoService: CiudadanoService,
  private _tipoIdentificacionService: TipoIdentificacionService,

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
    console.log(this.sucursal);    

    this._municipioService.getMunicipioSelect().subscribe(
        response => {
          this.municipios = response;
          setTimeout(() => {
            this.municipioSelected = [this.sucursal.municipio.id];
            // this.municipioResidenciaSelected = [this.sucursal.municipioResidencia.id];
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
            this.tipoSociedadSelected = [this.sucursal.tipoSociedad.id];
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
          this.tipoIdentificacionSelected = [this.sucursal.tipoIdentificacion.id];
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
          this.ciudadanoSelected = [this.sucursal.ciudadano.id];
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
    this.sucursal.municipioId = this.municipioSelected;    
    this.sucursal.tipoSociedadId = this.tipoSociedadSelected;
    this.sucursal.tipoIdentificacionId = this.tipoIdentificacionSelected;
    this.sucursal.ciudadanoId = this.ciudadanoSelected;
       
    console.log(this.sucursal);
		this._sucursalService.editSucursal(this.sucursal,token).subscribe(
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