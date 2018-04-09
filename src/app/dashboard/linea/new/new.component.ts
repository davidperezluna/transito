import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Linea} from '../linea.modelo';
import {LineaService} from '../../../services/linea.service';
import {LoginService} from '../../../services/login.service';
import {MarcaService} from '../../../services/marca.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public linea: Linea;
public errorMessage;
public respuesta;
public marcas:any;
public marcaSelected:any;

constructor(
  private _LineaService: LineaService,
  private _loginService: LoginService,
  private _marcaService: MarcaService,
  ){}

  ngOnInit() {
    this.linea = new Linea(null,null,null,null);

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
    this.linea.marcaId = this.marcaSelected;
    console.log(this.linea);
		this._LineaService.register(this.linea,token).subscribe(
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
            text: 'El codigo '+ this.linea.codigoMt +' ya se encuentra registrado',
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