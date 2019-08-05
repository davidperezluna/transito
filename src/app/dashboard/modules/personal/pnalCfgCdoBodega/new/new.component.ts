import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { PnalCfgCdoBodega } from '../pnalCfgCdoBodega.modelo';
import { PnalCfgCdoBodegaService } from '../../../../../services/pnalCfgCdoBodega.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public bodega: PnalCfgCdoBodega;
  public errorMessage;

constructor(
  private _BodegaService: PnalCfgCdoBodegaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.bodega = new PnalCfgCdoBodega(null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._BodegaService.register(this.bodega, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          this.ready.emit(true);
        }else{
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