import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgClaseMaquinariaService } from '../../../../../services/vhloCfgClaseMaquinaria.service';
import { VhloCfgTipoMaquinariaService } from '../../../../../services/vhloCfgTipoMaquinaria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() claseMaquinaria:any = null;
public errorMessage;
public formReady = false;
public tiposMaquinaria: any;

constructor(
  private _ClaseMaquinariaService: VhloCfgClaseMaquinariaService,
  private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){  
    this._TipoMaquinariaService.select().subscribe(
      response => {
        this.tiposMaquinaria = response;
        setTimeout(() => {
          this.claseMaquinaria.idTipoMaquinaria = [this.claseMaquinaria.tipoMaquinaria.id];
        });
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
		this._ClaseMaquinariaService.edit(this.claseMaquinaria,token).subscribe(
			response => {
        if(response.code == 200){
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