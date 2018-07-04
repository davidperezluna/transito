import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MflInfraccionService } from '../../../services/mflInfraccion.service';
import { MflInfraccionCategoriaService } from '../../../services/mflInfraccionCategoria.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() infraccion:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public infraccionCategorias: any;
public infraccionCategoriaSelected: any;

constructor(
  private _InfraccionService: MflInfraccionService,
  private _InfraccionCategoriaService: MflInfraccionCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){
    this._InfraccionCategoriaService.select().subscribe(
      response => {
        this.infraccionCategorias = response;
        setTimeout(() => {
          this.infraccionCategoriaSelected = [this.infraccion.categoria.id];
        });
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();

    this.infraccion.infraccionCategoriaId = this.infraccionCategoriaSelected;

		this._InfraccionService.edit(this.infraccion,token).subscribe(
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