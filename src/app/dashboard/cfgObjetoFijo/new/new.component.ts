import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgObjetoFijo } from '../cfgObjetoFijo.modelo';
import { CfgObjetoFijoService } from '../../../services/cfgObjetoFijo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgObjetoFijo: CfgObjetoFijo;
  public errorMessage;
  public respuesta;
  

  constructor(
    private _CfgObjetoFijoService: CfgObjetoFijoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.cfgObjetoFijo = new CfgObjetoFijo(null, null);


  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    
    this._CfgObjetoFijoService.register(this.cfgObjetoFijo, token).subscribe(
      response => {
        this.respuesta = response;
        
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: 'El Caso Insumo ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });
  }

}