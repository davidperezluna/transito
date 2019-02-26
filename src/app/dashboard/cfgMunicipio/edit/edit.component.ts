import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {CfgMunicipioService} from '../../../services/cfgMunicipio.service';
import {CfgDepartamentoService} from '../../../services/cfgDepartamento.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() municipio:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public departamentos: Array<any>
public departamentoSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _municipioService: CfgMunicipioService,
  private _loginService: LoginService,
  private _departamentoService: CfgDepartamentoService,
  ){}

  ngOnInit(){
    

    console.log(this.departamentoSelected);
    this._departamentoService.select().subscribe(
        response => {
          this.departamentos = response;
          setTimeout(() => {
            this.departamentoSelected = [this.municipio.departamento.id];
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
    this.municipio.departamentoId = this.departamentoSelected;
    
		this._municipioService.edit(this.municipio,token).subscribe(
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