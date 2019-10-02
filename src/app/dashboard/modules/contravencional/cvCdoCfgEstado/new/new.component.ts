import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CvCdoCfgEstado } from '../cvCdoCfgEstado.modelo';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvcdocfgestado',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public estado: CvCdoCfgEstado;
public errorMessage;
public formatos;

constructor(
  private _EstadoService: CvCdoCfgEstadoService,
  private _FormatoService: CfgAdmFormatoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.estado = new CvCdoCfgEstado(null, null, null, null, null, null, false, false, false, false, null, null);


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
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._EstadoService.register(this.estado,token).subscribe(
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