import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Comparendo} from '../comparendo.modelo';
import {ComparendoService} from '../../../services/comparendo.service';
import {LoginService} from '../../../services/login.service';
import {AgenteTransitoService} from '../../../services/agenteTransito.service';
import {SedeOperativaService} from '../../../services/sedeOperativa.service';
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
public agentesTransito:any;
public sedesOperativas:any;
public agenteTransitoSelected:any;
public sedeOperativaSelected:any;
public agenteTransito:any;
public sedeOperativa:any;
public agenteTransitoReady = false;
public sedeOperativaReady = false;
public validado = false;

constructor(
  private _ComparendoService: ComparendoService,
  private _loginService: LoginService,
  private _agenteTransitoService: AgenteTransitoService,
  private _sedeOperativaService: SedeOperativaService,
  ){}

  ngOnInit() {
    this.comparendo = new Comparendo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

    this._agenteTransitoService.getAgenteTransitoSelect().subscribe(
        response => {
          this.agentesTransito = response;
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    this._sedeOperativaService.getSedeOperativaSelect().subscribe(
        response => {
          this.sedesOperativas = response;
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
    this.comparendo.agenteTransitoId = this.agenteTransitoSelected;
    
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

  changedAgenteTransito(e){
    if (e) {
     let token = this._loginService.getToken();
     this._agenteTransitoService.showAgenteTransito(token,e).subscribe(
        response => {
          this.agenteTransito = response;
          this.agenteTransitoReady = true;
          console.log(this.agenteTransito);
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
  }

  changedSedeOperativa(e){
    if (e) {
     let token = this._loginService.getToken();
     this._sedeOperativaService.showSedeOperativa(token,e).subscribe(
        response => {
          this.sedeOperativa = response;
          this.sedeOperativaReady = true;
          this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
          console.log(this.sedeOperativa);
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
  }

  onValidarNumeroOrden(){
    this.validado = true;
  }

}