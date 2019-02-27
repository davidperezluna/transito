import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgLinea} from '../vhloCfgLinea.modelo';
import {VhloCfgLineaService} from '../../../services/vhloCfgLinea.service';
import {LoginService} from '../../../services/login.service';
import {VhloCfgMarcaService} from '../../../services/vhloCfgMarca.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public linea: VhloCfgLinea;
public errorMessage;
public marcas:any;
public marcaSelected:any;

constructor(
  private _LineaService: VhloCfgLineaService,
  private _loginService: LoginService,
  private _marcaService: VhloCfgMarcaService,
  ){}

  ngOnInit() {
    this.linea = new VhloCfgLinea(null,null,null,null);

    this._marcaService.getMarcaSelect().subscribe(
        response => {
          this.marcas = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
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
    this.linea.idMarca = this.marcaSelected;
		this._LineaService.register(this.linea,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
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