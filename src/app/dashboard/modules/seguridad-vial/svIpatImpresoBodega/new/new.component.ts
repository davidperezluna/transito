import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SvIpatImpresoBodega } from '../svIpatImpresoBodega.modelo';
import { SvIpatImpresoBodegaService } from '../../../../../services/svIpatImpresoBodega.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-svipatimpresobodega',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public bodega: SvIpatImpresoBodega;
  public errorMessage;

constructor(
  private _ImpresoBodegaService: SvIpatImpresoBodegaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.bodega = new SvIpatImpresoBodega(null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._ImpresoBodegaService.register(this.bodega, token).subscribe(
			response => {
        if(response.code == 200){
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