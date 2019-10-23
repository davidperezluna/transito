import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgTipoCabina } from '../vhloCfgTipoCabina.modelo';
import { VhloCfgTipoCabinaService } from '../../../../../services/vhloCfgTipoCabina.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgtipocabina',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tipoCabina: VhloCfgTipoCabina;
  public errorMessage;

constructor(
  private _TipoCabinaService: VhloCfgTipoCabinaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tipoCabina = new VhloCfgTipoCabina(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TipoCabinaService.register(this.tipoCabina,token).subscribe(
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