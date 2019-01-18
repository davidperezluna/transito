import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvCdoCfgInteres } from '../cvCdoCfgInteres.modelo';
import { CvCdoCfgInteresService } from '../../../services/cvCdoCfgInteres.service';
import { CfgComparendoEstadoService } from '../../../services/cfgComparendoEstado.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public interes: CvCdoCfgInteres;
  public errorMessage;
  public estados: any = null;

constructor(
  private _InteresService: CvCdoCfgInteresService,
  private _EstadoService: CfgComparendoEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.interes = new CvCdoCfgInteres(null, null, null, null);

    this._EstadoService.select().subscribe(
      response => {
        this.estados = response;
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

		this._InteresService.register(this.interes, token).subscribe(
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