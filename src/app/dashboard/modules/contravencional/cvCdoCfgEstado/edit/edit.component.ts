import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cvcdocfgestado',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() estado:any = null;
  public errorMessage;
  public formReady = false;
  public formatos;

constructor(
  private _EstadoService: CvCdoCfgEstadoService,
  private _FormatoService: CfgAdmFormatoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ 
    this._FormatoService.select().subscribe(
      response => {
        this.formatos = response;
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
		this._EstadoService.edit(this.estado,token).subscribe(
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