import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgCarroceria} from '../vhloCfgCarroceria.modelo';
import {VhloCfgCarroceriaService} from '../../../../../services/vhloCfgCarroceria.service';
import {VhloCfgClaseService} from '../../../../../services/vhloCfgClase.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() carroceria:any = null;
public errorMessage;
public formReady = false;
public clases: Array<any>
public claseSelected:any; // ng-select [(ngModel)]

constructor(
  private _carroceriaService: VhloCfgCarroceriaService,
  private _loginService: LoginService,
  private _claseService: VhloCfgClaseService,
  ){}

  ngOnInit(){
    this._claseService.select().subscribe(
        response => {
          this.clases = response;
          setTimeout(() => {
            this.claseSelected = [this.carroceria.clase.id];
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
    this.carroceria.idClase = this.claseSelected;
		this._carroceriaService.edit(this.carroceria,token).subscribe(
			response => {
        if(response.status == 'success'){
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