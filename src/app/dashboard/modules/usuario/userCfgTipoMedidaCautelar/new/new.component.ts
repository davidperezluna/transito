import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserCfgTipoMedidaCautelar } from '../userCfgTipoMedidaCautelar.modelo';
import { UserCfgTipoMedidaCautelarService } from '../../../../../services/userCfgTipoMedidaCautelar.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tipoMedidaCautelar: UserCfgTipoMedidaCautelar;
  public errorMessage;

constructor(
  private _LoginService: LoginService,
  private _CvCfgTipoMedidaCautelarService: UserCfgTipoMedidaCautelarService,
  ){}

  ngOnInit() {
    this.tipoMedidaCautelar = new UserCfgTipoMedidaCautelar(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._CvCfgTipoMedidaCautelarService.register(this.tipoMedidaCautelar, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
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
      }
    );
  }
}