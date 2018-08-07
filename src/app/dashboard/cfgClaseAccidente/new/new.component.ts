import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgClaseAccidente } from '../cfgClaseAccidente.modelo';
import { CfgClaseAccidenteService } from '../../../services/cfgClaseAccidente.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgClaseAccidente: CfgClaseAccidente;
  public errorMessage;
  public respuesta;
  

  constructor(
    private _CfgClaseAccidenteService: CfgClaseAccidenteService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.cfgClaseAccidente = new CfgClaseAccidente(null, null);


  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    
    this._CfgClaseAccidenteService.register(this.cfgClaseAccidente, token).subscribe(
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
            text: 'La clase accidente ya se encuentra registrado',
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