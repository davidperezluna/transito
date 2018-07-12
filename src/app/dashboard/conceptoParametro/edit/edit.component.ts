import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {ConceptoParametro} from '../conceptoParametro.modelo';
import {ConceptoParametroService} from '../../../services/conceptoParametro.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-concepto',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() conceptoParametro:any = null;
public errorMessage;
public respuesta;


constructor(
  private _ConceptoParametroService: ConceptoParametroService,
  private _loginService: LoginService,
  ){
       
  }

  ngOnInit() {
    console.log(this.conceptoParametro.valor);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._ConceptoParametroService.editConceptoParametro(this.conceptoParametro,token).subscribe(
			response => {
        this.respuesta = response;

        swal({
          title: 'Info!',
          text: response.msj,
          type: 'info',
          confirmButtonText: 'Aceptar'
        })
        
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
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