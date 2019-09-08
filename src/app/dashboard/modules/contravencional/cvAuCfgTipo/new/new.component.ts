import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvAuCfgTipo } from '../cvAuCfgTipo.modelo';
import { CvAuCfgTipoService } from '../../../../../services/cvAuCfgTipo.service';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvaucfgtipo',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tipo: CvAuCfgTipo;
  public errorMessage;

  public formatos: any = null;

constructor(
  private _TipoService: CvAuCfgTipoService,
  private _FormatoService: CfgAdmFormatoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.tipo = new CvAuCfgTipo(null, false, null, null);
    
		this._FormatoService.select().subscribe(
			response => {
        this.formatos = response;
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

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._TipoService.register(this.tipo, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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