import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgAdmFormatoTipoService } from '../../../../../services/cfgAdmFormatoTipo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cfgadmformatotipo',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() tipo:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _CfgAdmFormatoTipoService: CfgAdmFormatoTipoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.tipo);
   }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();
    
    this._CfgAdmFormatoTipoService.edit(this.tipo, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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