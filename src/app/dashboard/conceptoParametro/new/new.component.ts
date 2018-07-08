import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {ConceptoParametro} from '../conceptoParametro.modelo';
import {ConceptoParametroService} from '../../../services/conceptoParametro.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public conceptoParametro: ConceptoParametro;
public errorMessage;
public respuesta;

constructor(
  private _ConceptoParametroService: ConceptoParametroService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.conceptoParametro = new ConceptoParametro(null,null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._ConceptoParametroService.register(this.conceptoParametro,token).subscribe(
			response => {
        this.respuesta = response;
        
          if(this.respuesta.status == 'success'){
            this.ready.emit(true);
            
            swal({
              title: 'Perfecto!',
              text: 'El registro se ha registrado con exito',
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
          }else{
            swal({
              title: 'Información!',
              text: 'El conceptoParametro '+ this.conceptoParametro.nombre +' ya se encuentra registrado',
              type: 'warning',
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