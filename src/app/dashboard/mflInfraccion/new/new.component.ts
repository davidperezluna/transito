import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MflInfraccion } from '../mflInfraccion.modelo';
import { MflInfraccionCategoriaService } from '../../../services/mflInfraccionCategoria.service';
import { MflInfraccionService } from '../../../services/mflInfraccion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public infraccion: MflInfraccion;
public infraccionCategorias: any;
public infraccionCategoriaSelected: any;
public errorMessage;
public respuesta;

constructor(
  private _InfraccionService: MflInfraccionService,
  private _InfraccionCategoriaService: MflInfraccionCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.infraccion = new MflInfraccion(null, null, null, null, null);

    this._InfraccionCategoriaService.select().subscribe(
      response => {
        this.infraccionCategorias = response;
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
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();

    this.infraccion.infraccionCategoriaId = this.infraccionCategoriaSelected;

		this._InfraccionService.register(this.infraccion,token).subscribe(
			response => {
        this.respuesta = response;
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
            text: 'El infraccionCategoria ya se encuentra registrado',
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