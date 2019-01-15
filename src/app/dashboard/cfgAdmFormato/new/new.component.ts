import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CfgAdmFormato } from '../cfgAdmFormato.modelo';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { CfgAdmFormatoTipoService } from '../../../services/cfgAdmFormatoTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public formato: CfgAdmFormato;
public errorMessage;
public tipos: any;

constructor(
  private _FormatoService: CfgAdmFormatoService,
  private _TipoService: CfgAdmFormatoTipoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.formato = new CfgAdmFormato(null, null, null, null, null);

    $('#summernote').summernote({
      placeholder: 'Diligencie el cuerpo de la plantilla',
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

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();

    this.formato.cuerpo = $('#summernote').text();
    
		this._FormatoService.register(this.formato,token).subscribe(
			response => {
        if(response.status == 'success'){
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