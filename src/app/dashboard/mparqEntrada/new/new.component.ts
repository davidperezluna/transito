import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MparqEntrada } from '../mparqEntrada.modelo';
import { MparqEntradaSalidaService } from '../../../services/mparqEntradaSalida.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public entrada: MparqEntrada;
public agentes: any;
public agenteSelected: any;
public date: any;
public errorMessage;
public respuesta;

constructor(
  private _EntradaService: MparqEntradaSalidaService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.entrada = new MparqEntrada(null, null, null, null, null, null, null, null);
    this.date = new Date();
    

    this._FuncionarioService.selectAgentes().subscribe(
      response => {
        this.agentes = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

    this.entrada.funcionarioId = this.agenteSelected;
    
		this._EntradaService.register(this.entrada,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
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
            title: 'Error!',
            text: 'El entrada '+  +' ya se encuentra registrado',
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