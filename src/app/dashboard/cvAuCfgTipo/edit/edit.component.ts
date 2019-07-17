import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvAuCfgTipoService } from '../../../services/cvAuCfgTipo.service';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() tipo:any = null;
  public errorMessage;

  public formatos: any = null;
  public formatoSelected: any = null;

constructor(
  private _TipoService: CvAuCfgTipoService,
  private _FormatoService: CfgAdmFormatoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){    
    this._FormatoService.select().subscribe(
			response => {
        this.formatos = response;

        setTimeout(() => {
          this.formatoSelected = [this.tipo.formato.id];
        });
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

    this.tipo.formato = this.formatoSelected;

		this._TipoService.edit(this.tipo, token).subscribe(
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