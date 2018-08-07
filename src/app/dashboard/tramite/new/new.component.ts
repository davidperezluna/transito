import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Tramite } from '../tramite.modelo';
import { TramiteService } from '../../../services/tramite.service';
import { ModuloService } from '../../../services/modulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html' 
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tramite: Tramite;
public errorMessage;
public respuesta;
public modulos: any;
public moduloSelected: any; 

constructor(
  private _TramiteService: TramiteService,
  private _loginService: LoginService,
  private _moduloService: ModuloService,
  ){}

  ngOnInit() {
    this.tramite = new Tramite(null, null, null, null, null);

    this._moduloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
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
    this.tramite.moduloId = this.moduloSelected;
    console.log(this.tramite);
		this._TramiteService.register(this.tramite,token).subscribe(
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
            text: 'El tramite '+  +' ya se encuentra registrada',
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