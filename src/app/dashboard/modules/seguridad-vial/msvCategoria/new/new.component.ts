import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MsvCategoria } from '../msvCategoria.modelo';
import { MsvCategoriaService } from '../../../../../services/msvCategoria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public categoria: MsvCategoria;
public errorMessage;

constructor(
  private _msvCategoriaService: MsvCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.categoria = new MsvCategoria(null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._msvCategoriaService.register(this.categoria, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Se ha registrado con éxito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'La categoria ya se encuentra registrada',
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