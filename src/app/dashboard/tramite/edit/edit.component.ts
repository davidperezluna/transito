import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Tramite } from '../tramite.modelo';
import { TramiteService } from '../../../services/tramite.service';
import { ModuloService } from '../../../services/modulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() tramite:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public modulos: Array<any>
public moduloSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _tramiteService: TramiteService,
  private _loginService: LoginService,
  private _moduloService: ModuloService,
  ){}

  ngOnInit(){ 
    console.log(this.tramite);
    this._moduloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
        setTimeout(() => {
          this.moduloSelected = [this.tramite.modulo.id];
          this.formReady = true;
        });
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
    this.tramite.moduloId = this.moduloSelected;
		this._tramiteService.editTramite(this.tramite,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
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