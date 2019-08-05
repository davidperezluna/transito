import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgChoqueCon } from '../cfgChoqueCon.modelo';
import { CfgChoqueConService } from '../../../services/svCfgChoqueCon.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgChoqueCon: CfgChoqueCon;
  public errorMessage;
  public respuesta;
  

  constructor(
    private _CfgChoqueConService: CfgChoqueConService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.cfgChoqueCon = new CfgChoqueCon(null, null);


  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    
    this._CfgChoqueConService.register(this.cfgChoqueCon, token).subscribe(
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
            text: 'El Choque Con ya se encuentra registrado',
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