import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PnalCfgTipoNombramiento } from '../pnalCfgTipoNombramiento.modelo';
import { PnalCfgTipoNombramientoService } from '../../../../../services/pnalCfgTipoNombramiento.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-pnaltiponombramiento',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tipoNombramiento: PnalCfgTipoNombramiento;
public errorMessage;
public excel;

constructor(
  private _TipoNombramientoService: PnalCfgTipoNombramientoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tipoNombramiento = new PnalCfgTipoNombramiento(null, false, false, false, false, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TipoNombramientoService.register(this.tipoNombramiento,token).subscribe(
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

		}); 
  }
}