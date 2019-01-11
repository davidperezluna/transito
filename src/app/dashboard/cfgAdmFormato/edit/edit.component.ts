import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { CfgAdmFormatoTipoService } from '../../../services/cfgAdmFormatoTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() formato:any = null;
public errorMessage;
public formReady = false;
public tipos:any;

constructor(
  private _FormatoService: CfgAdmFormatoService,
  private _TipoService: CfgAdmFormatoTipoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ 
    $('#summernote').summernote({
      placeholder: 'Hello bootstrap 4',
      tabsize: 2,
      height: 500
    });

    this._TipoService.select().subscribe(
      response => {
        this.tipos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
    
		this._FormatoService.edit(this.formato,token).subscribe(
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