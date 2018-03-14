import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Linea} from '../linea.modelo';
import {LineaService} from '../../../services/linea.service';
import {MarcaService} from '../../../services/marca.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() linea:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public marcas: Array<any>
public marcaSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _lineaService: LineaService,
  private _loginService: LoginService,
  private _marcaService: MarcaService,
  ){}

  ngOnInit(){
    

    console.log(this.marcaSelected);
    this._marcaService.getMarcaSelect().subscribe(
        response => {
          this.marcas = response;
          setTimeout(() => {
            this.marcaSelected = [this.linea.marca.id];
            this.formReady = true;
          },10);
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
    this.linea.marcaId = this.marcaSelected;
		this._lineaService.editLinea(this.linea,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Echo!',
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