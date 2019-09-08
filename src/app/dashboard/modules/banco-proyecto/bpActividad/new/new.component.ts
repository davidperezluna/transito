import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { BpActividad } from '../bpActividad.modelo';
import { BpActividadService } from '../../../../../services/bpActividad.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-actividad',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
@Output() onReadyActividad = new EventEmitter<any>();
@Input() cuenta: any = null;
public actividad: BpActividad;
public errorMessage;

constructor(
  private _ActividadService: BpActividadService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.actividad = new BpActividad(null, null, null, null);
  }
  
  onCancelar(){
    this.onReadyActividad.emit();
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.actividad.idCuenta = this.cuenta.id;
    
		this._ActividadService.register(this.actividad,token).subscribe(
			response => {
        if(response.code == 200){
          this.onReadyActividad.emit();

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
      }
    ); 
  }

}