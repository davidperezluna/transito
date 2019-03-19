import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Almacen} from '../almacen.modelo';
import {AlmacenService} from '../../../services/almacen.service';
import {LoginService} from '../../../services/login.service';
import {VhloCfgServicioService} from '../../../services/vhloCfgServicio.service';
import {CfgOrganismoTransitoService} from '../../../services/cfgOrganismoTransito.service';
import {ConsumibleService} from '../../../services/consumible.service';
import {VhloCfgClaseService} from '../../../services/vhloCfgClase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public almacen: Almacen;
public errorMessage;
public respuesta;
public servicios:any;
public organismosTransito:any;
public consumibles:any;
public clases:any;
public departamentoSelected:any;
public servicioSelected:any;
public organismoTransitoSelected:any;
public consumibleSelected:any;
public claseSelected:any;

constructor(
  private _AlmacenService: AlmacenService,
  private _loginService: LoginService,
  private _servicioService: VhloCfgServicioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _consumibleService: ConsumibleService,
  private _claseService: VhloCfgClaseService,
  ){}

  ngOnInit() {
    this.almacen = new Almacen(null,null,null,null,null,null,null,null);

    this._servicioService.select().subscribe(
        response => {
          this.servicios = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );

    this._OrganismoTransitoService.selectSedes().subscribe(
        response => {
          this.organismosTransito = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    this._consumibleService.getConsumibleSelect().subscribe(
        response => {
          this.consumibles = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    this._claseService.select().subscribe(
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
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    this.almacen.servicioId = this.servicioSelected;
    this.almacen.organismoTransitoId = this.organismoTransitoSelected;
    this.almacen.consumibleId = this.consumibleSelected;
    this.almacen.claseId = this.claseSelected;
    
    console.log(this.almacen);
		this._AlmacenService.register(this.almacen,token).subscribe(
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
            text: 'El almacen '+  +' ya se encuentra registrado',
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

}