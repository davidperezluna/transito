import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserLcCfgRestriccion } from '../userLcCfgRestriccion.modelo';
import { UserLcCfgRestriccionService } from '../userLcCfgRestriccion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-userlccfgrestriccion',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public restriccion: UserLcCfgRestriccion;
  public errorMessage;

  constructor(
    private _RestriccionService: UserLcCfgRestriccionService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.restriccion = new UserLcCfgRestriccion(null, null, null);
  }
  onCancelar() {
    this.ready.emit(true);
  }

  onEnviar() {
    let token = this._loginService.getToken();

    this._RestriccionService.register(this.restriccion, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: response.message,
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