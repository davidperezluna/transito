import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgLinea} from '../vhloCfgLinea.modelo';
import {VhloCfgLineaService} from '../../../../../services/vhloCfgLinea.service';
import {VhloCfgMarcaService} from '../../../../../services/vhloCfgMarca.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vhlocfglinea',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() linea:any = null;
public errorMessage;
public formReady = false;
public marcas: Array<any>
public marcaSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _lineaService: VhloCfgLineaService,
  private _loginService: LoginService,
  private _marcaService: VhloCfgMarcaService,
  ){}

  ngOnInit(){
    
    this._marcaService.select().subscribe(
        response => {
          this.marcas = response;
          setTimeout(() => {
            this.marcaSelected = [this.linea.marca.id];
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
    this.linea.idMarca = this.marcaSelected;
		this._lineaService.edit(this.linea,token).subscribe(
			response => {
        if(response.code == 200){
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