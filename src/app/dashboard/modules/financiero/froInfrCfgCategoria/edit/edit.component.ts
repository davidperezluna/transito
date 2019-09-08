import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { FroInfrCfgCategoriaService } from '../../../../../services/froInfrCfgCategoria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() infraccionCategoria:any = null;
public errorMessage;

public formReady = false;

constructor(
  private _InfraccionCategoriaService: FroInfrCfgCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.infraccionCategoria);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._InfraccionCategoriaService.edit(this.infraccionCategoria,token).subscribe(
			response => {
        if(response.code == 200){
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