import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCfgTipoMedidaCautelarService } from '../../../services/userCfgTipoMedidaCautelar.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() tipoMedidaCautelar:any = null;
public errorMessage;
public formReady = false;

constructor(
  private _UserCfgTipoMedidaCautelarService: UserCfgTipoMedidaCautelarService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.tipoMedidaCautelar);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();
		this._UserCfgTipoMedidaCautelarService.edit(this.tipoMedidaCautelar,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
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