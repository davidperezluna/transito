import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgClaseMaquinaria } from '../vhloCfgClaseMaquinaria.modelo';
import { VhloCfgClaseMaquinariaService } from '../../../services/vhloCfgClaseMaquinaria.service';
import { VhloCfgTipoMaquinariaService } from '../../../services/vhloCfgTipoMaquinaria.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public claseMaquinaria: VhloCfgClaseMaquinaria;
  public errorMessage;
  public tiposMaquinaria: any;

constructor(
  private _ClaseMaquinariaService: VhloCfgClaseMaquinariaService,
  private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.claseMaquinaria = new VhloCfgClaseMaquinaria(null, null, null, null);

    this._TipoMaquinariaService.select().subscribe(
      response => {
        this.tiposMaquinaria = response;
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
    
		this._ClaseMaquinariaService.register(this.claseMaquinaria,token).subscribe(
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