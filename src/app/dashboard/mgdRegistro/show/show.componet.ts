import { Component, OnInit,ViewChild,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@ViewChild('fileInput') fileInput;
public errorMessage;
public respuesta;
public usuarios: any;
public usuarioSelected: any;
public observaciones: any;
public datos = {
    'usuarioId': null,
    'observaciones': null
  };

constructor(
    private _UsuarioService: UsuarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this._UsuarioService.getUsuarioSelect().subscribe(
      response => {
        this.usuarios = response;
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

  onCrearReparto(){
    this.datos.usuarioId = this.usuarioSelected;
    this.datos.observaciones = this.observaciones;

    let token = this._loginService.getToken();

		this._UsuarioService.register(this.datos, token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: this.respuesta.msg,
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