import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PnalFuncionario } from '../pnalFuncionario.modelo';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() funcionario: any = null;
  public errorMessage;
  public formReady = false;

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {}

  onCancelar() { this.ready.emit(true); }

  onEnviar() {
    let token = this._LoginService.getToken();
    this._FuncionarioService.edit(this.funcionario, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
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

      });
  }
}