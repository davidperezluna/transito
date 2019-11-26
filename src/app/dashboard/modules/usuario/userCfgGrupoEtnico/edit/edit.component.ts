import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserCfgGrupoEtnicoService } from '../../../../../services/userCfgGrupoEtnico.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

 
@Component({
  selector: 'app-edit-usercfggrupoetnico',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() grupoEtnico: any = null;
  public errorMessage;

  constructor(
    private _GrupoEtnicoService: UserCfgGrupoEtnicoService,
    private _loginService: LoginService,
  ) {
   
  }

  ngOnInit() {}


  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    this._GrupoEtnicoService.edit(this.grupoEtnico, token).subscribe(
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

      });
  }

}