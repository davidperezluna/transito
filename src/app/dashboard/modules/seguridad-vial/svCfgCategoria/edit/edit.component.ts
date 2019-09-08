import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { SvCfgCategoriaService } from '../../../../../services/svCfgCategoria.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-svcfgcategoria',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() categoria:any = null;
public errorMessage;
public formReady = false;

constructor(
  private _CategoriaService: SvCfgCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._CategoriaService.editCategoria(this.categoria, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con éxito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición.");
					}
				}

		}); 
  }

}