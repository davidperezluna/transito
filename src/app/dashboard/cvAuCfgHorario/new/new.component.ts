import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvAuCfgHorario } from '../cvAuCfgHorario.modelo';
import { CvAuCfgHorarioService } from '../../../services/cvAuCfgHorario.service';
import { CfgCargoService } from '../../../services/cfgCargo.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public horario: CvAuCfgHorario;
  public errorMessage;

constructor(
  private _HorarioService: CvAuCfgHorarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.horario = new CvAuCfgHorario(null, null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._HorarioService.register(this.horario, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
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