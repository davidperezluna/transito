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
public marcas: Array<any>
public lineaR: Linea;

constructor(
  private _lineaService: LineaService,
  private _loginService: LoginService,
  private _marcaService: MarcaService,
  ){}

  ngOnInit(){
    this.lineaR = new Linea(1,'hola',5,[1]);
    console.log(this.lineaR);
    this._marcaService.getMarcaSelect().subscribe(
        response => {
          this.marcas = response;
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