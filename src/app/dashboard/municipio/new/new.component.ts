import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Municipio} from '../municipio.modelo';
import {MunicipioService} from '../../../services/municipio.service';
import {LoginService} from '../../../services/login.service';
import {DepartamentoService} from '../../../services/departamento.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public municipio: Municipio;
public errorMessage;
public respuesta;
public departamentos:any;
public departamentoSelected:any;

constructor(
  private _MunicipioService: MunicipioService,
  private _loginService: LoginService,
  private _marcaService: DepartamentoService,
  ){}

  ngOnInit() {
    this.municipio = new Municipio(null,null,null,null);

    this._marcaService.getDepartamentoSelect().subscribe(
        response => {
          this.departamentos = response;
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
    
    console.log(this.municipio);
		this._MunicipioService.register(this.municipio,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
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
            text: 'El municipio '+ this.municipio.nombre +' ya se encuentra registrado',
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