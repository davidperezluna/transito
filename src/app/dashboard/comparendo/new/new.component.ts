import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Comparendo} from '../comparendo.modelo';
import {ComparendoService} from '../../../services/comparendo.service';
import {LoginService} from '../../../services/login.service';
import {BancoService} from '../../../services/banco.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public comparendo: Comparendo;
public errorMessage;
public respuesta;
public bancos:any;
public bancoSelected:any;

constructor(
  private _ComparendoService: ComparendoService,
  private _loginService: LoginService,
  private _bancoService: BancoService,
  ){}

  ngOnInit() {
    this.comparendo = new Comparendo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

    this._bancoService.getBancoSelect().subscribe(
        response => {
          this.bancos = response;
          console.log(this.bancos);
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
    // this.comparendo.bancoId = this.bancoSelected;
    
    console.log(this.comparendo);
		this._ComparendoService.register(this.comparendo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Echo!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'la comparendo '+ this.comparendo.numeroOrden +' ya se encuentra registrado',
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