import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvIpatImpresoBodegaService } from '../../../../../services/svIpatImpresoBodega.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pnalcfgcdobodega',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() bodega:any = null;
  public errorMessage;

constructor(
  private _ImpresoBodegaService: SvIpatImpresoBodegaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._ImpresoBodegaService.edit(this.bodega, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
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