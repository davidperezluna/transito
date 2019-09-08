import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserCfgGrupoEtnico } from '../userCfgGrupoEtnico.modelo';
import { UserCfgGrupoEtnicoService } from '../../../../../services/userCfgGrupoEtnico.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public grupoEtnico: UserCfgGrupoEtnico;
  public errorMessage;

  constructor(
    private _GrupoEtnicoService: UserCfgGrupoEtnicoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.grupoEtnico = new UserCfgGrupoEtnico(null);


  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._LoginService.getToken();
    
    this._GrupoEtnicoService.register(this.grupoEtnico, token).subscribe(
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