import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SvCfgGravedadAccidente } from '../svCfgGravedadAccidente.modelo';
import { SvCfgGravedadAccidenteService } from '../../../services/svCfgGravedadAccidente.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgGravedad: SvCfgGravedadAccidente;
  public errorMessage;

  constructor(
    private _SvCfgGravedadAccidenteService: SvCfgGravedadAccidenteService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.cfgGravedad = new SvCfgGravedadAccidente(null, null);
  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    
    this._SvCfgGravedadAccidenteService.register(this.cfgGravedad, token).subscribe(
      response => {
        if (response.status == 'success') {
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
            text: 'La gravedad ya se encuentra registrado',
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