import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Carroceria} from '../carroceria.modelo';
import {CarroceriaService} from '../../../services/carroceria.service';
import {LoginService} from '../../../services/login.service';
import {ClaseService} from '../../../services/clase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public carroceria: Carroceria;
public errorMessage;
public respuesta;
public clases:any;
public claseSelected:any;

constructor(
  private _CarroceriaService: CarroceriaService,
  private _loginService: LoginService,
  private _claseService: ClaseService,
  ){}

  ngOnInit() {
    this.carroceria = new Carroceria(null,null,null,null);

    this._claseService.getClaseSelect().subscribe(
        response => {
          this.clases = response;
          console.log(this.clases);
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
    this.carroceria.claseId = this.claseSelected;
    
    console.log(this.carroceria);
		this._CarroceriaService.register(this.carroceria,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'la carroceria '+ this.carroceria.codigoMt +' ya se encuentra registrado',
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