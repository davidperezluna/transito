import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Almacen} from '../almacen.modelo';
import {AlmacenService} from '../../../services/almacen.service';
import {VhloCfgServicioService} from '../../../services/vhloCfgServicio.service';
import {ConsumibleService} from '../../../services/consumible.service';
import {VhloCfgClaseService} from '../../../services/vhloCfgClase.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() almacen:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public servicios: Array<any>
public servicioSelected: Array<any>; // ng-select [(ngModel)]

public organismosTransito: Array<any>
public organismoTransitoSelected: Array<any>; // ng-select [(ngModel)]

public consumibles: Array<any>
public consumibleSelected: Array<any>; // ng-select [(ngModel)]

public clases: Array<any>
public claseSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _almacenService: AlmacenService,
  private _loginService: LoginService,
  private _servicioService: VhloCfgServicioService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _consumibleService: ConsumibleService,
  private _claseService: VhloCfgClaseService,
  ){}

  ngOnInit(){
    console.log(this.almacen);
    this._servicioService.select().subscribe(
        response => {
          this.servicios = response;
          setTimeout(() => {
            this.servicioSelected = [this.almacen.servicio.id];
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
    this._OrganismoTransitoService.selectSedes().subscribe(
        response => {
          this.organismosTransito = response;
          setTimeout(() => {
            this.organismoTransitoSelected = [this.almacen.organismoTransito.id];
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
    this._consumibleService.getConsumibleSelect().subscribe(
        response => {
          this.consumibles = response;
          setTimeout(() => {
            this.consumibleSelected = [this.almacen.consumible.id];
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
    this._claseService.getClaseSelect().subscribe(
        response => {
          this.clases = response;
          setTimeout(() => {
            this.claseSelected = [this.almacen.clase.id];
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
		this._almacenService.editAlmacen(this.almacen,token).subscribe(
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