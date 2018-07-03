import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MparqInmovilizacion } from '../mparqInmovilizacion.modelo';
import { MparqInmovilizacionService } from '../../../services/mparqInmovilizacion.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public inmovilizacion: MparqInmovilizacion;
public agentes: any;
public agenteSelected: any;
public errorMessage;
public respuesta;

constructor(
  private _InmovilizacionService: MparqInmovilizacionService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.inmovilizacion = new MparqInmovilizacion(null, null, null, null, null, null, null);

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
    
		this._InmovilizacionService.register(this.inmovilizacion,token).subscribe(
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
            text: 'El inmovilizacion '+  +' ya se encuentra registrado',
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