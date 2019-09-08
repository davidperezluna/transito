import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgCarroceria} from '../vhloCfgCarroceria.modelo';
import {VhloCfgCarroceriaService} from '../../../../../services/vhloCfgCarroceria.service';
import {LoginService} from '../../../../../services/login.service';
import {VhloCfgClaseService} from '../../../../../services/vhloCfgClase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public carroceria: VhloCfgCarroceria;
public errorMessage;
public clases:any;
public claseSelected:any;

constructor(
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _loginService: LoginService,
  private _claseService: VhloCfgClaseService,
  ){}

  ngOnInit() {
    this.carroceria = new VhloCfgCarroceria(null,null,null,null);

    this._claseService.select().subscribe(
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
    this.carroceria.idClase = this.claseSelected;
    
    console.log(this.carroceria);
		this._CarroceriaService.register(this.carroceria,token).subscribe(
			response => {
        if(response.code == 200){
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
            text: response.message,
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