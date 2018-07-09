import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { MparqSalida } from '../mparqSalida.modelo';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { MparqEntradaSalidaService } from '../../../services/mparqEntradaSalida.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public salida: MparqSalida;
public date: any;
public errorMessage;
public respuesta;

constructor(
  private _MparqEntradaSalidaService: MparqEntradaSalidaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.salida = new MparqSalida(null, null, null, null, null, null, null, null);
    this.date = new Date();
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

		this._MparqEntradaSalidaService.register(this.salida,token).subscribe(
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
            text: 'El salida '+  +' ya se encuentra registrado',
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

  onBuscarEntrada() {
    let token = this._loginService.getToken();
    let datos = {
      'numeroInventario':this.salida.numeroInventario
    }
    
    this._MparqEntradaSalidaService.searchByInventario(datos,token).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.salida.numeroPlaca = response.data.vehiculo.placa;
          this.salida.numeroGrua = response.data.grua.numeroGrua;
        }
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
    });
  }

}