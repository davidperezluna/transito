import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html'
})

export class StateComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  public tipo;
  public comparendos: any = null;

constructor(
  private _LoginService: LoginService,
  private _ComparendoService: ComparendoService,
){}

  ngOnInit() { }

  onEnviar(){
    let token = this._LoginService.getToken();

    
		this._ComparendoService.searchByTipo(this.tipo,token).subscribe(
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