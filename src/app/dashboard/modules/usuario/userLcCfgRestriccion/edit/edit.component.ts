import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLcCfgRestriccionService } from '../userLcCfgRestriccion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-userlccfgrestriccion',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() restriccion: any = null;
  public errorMessage;
  public formReady = false;

  constructor(
    private _RestriccionService: UserLcCfgRestriccionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() { }

  onCancelar() { this.ready.emit(true); }

  onEnviar() {
    let token = this._LoginService.getToken();

    this._RestriccionService.edit(this.restriccion, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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
      }
    );
  }

}