import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {TramitePrecio} from '../tramitePrecio.modelo';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';
import {LoginService} from '../../../services/login.service';
import {TramiteService} from '../../../services/tramite.service';
import {ModuloService} from '../../../services/modulo.service';
import {ClaseService} from '../../../services/clase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tramitePrecio: TramitePrecio;
public errorMessage;
public respuesta;
public tramites:any;
public clases:any;
public modulos:any;
public tramiteSelected:any;
public moduloSelected:any;
public vehiculoTipoSelected:any;
public claseSelected=null;

constructor(
  private _TramitePrecioService: TramitePrecioService,
  private _loginService: LoginService,
  private _tramiteService: TramiteService,
  private _claseService: ClaseService,
  private _moduloService: ModuloService,
  ){}

  ngOnInit() {
    this.claseSelected=null;
    this.tramitePrecio = new TramitePrecio(null,null,null,null,null,null,null);

    this._moduloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
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
    this.tramitePrecio.tramiteId = this.tramiteSelected;

    if (this.claseSelected) {
      this.tramitePrecio.claseId = this.claseSelected;
    }
    console.log(this.claseSelected);
    this.tramitePrecio.moduloId = this.moduloSelected;
		this._TramitePrecioService.register(this.tramitePrecio,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El tramitePrecio ya se encuentra registrado',
            type: 'error',
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

  changedModulo(e){

    if (e) {
      this._tramiteService.getTramitePorModuloSelect(this.moduloSelected).subscribe(
        response => {
          this.tramites = response;
        }, 
        error => {
          this.errorMessage = <any>error;
  
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
      this._claseService.getClasePorModuloSelect(this.moduloSelected).subscribe(
          response => { 
            this.clases = response;
          }, 
          error => {
            this.errorMessage = <any>error;
  
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
    }

  }

}