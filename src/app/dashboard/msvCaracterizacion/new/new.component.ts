import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { cfgFestivo } from '../msvCaracterizacion.modelo';
import { cfgFestivoService } from '../../../services/cfgFestivo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public cfgFestivo: cfgFestivo;
public errorMessage;
public respuesta;

constructor(
  private _cfgFestivoService: cfgFestivoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.cfgFestivo = new cfgFestivo(null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.cfgFestivo);
		this._cfgFestivoService.register(this.cfgFestivo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El festivo ya se encuentra registrado',
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