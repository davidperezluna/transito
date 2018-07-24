import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgEntidadJudicial } from '../cfgEntidadJudicial.modelo';
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgEntidadJudicial: CfgEntidadJudicial;
  public errorMessage;
  public respuesta;
  public municipios: any;
  public municipioSelected: any;

  constructor(
    private _CfgEntidadJudicialService: CfgEntidadJudicialService,
    private _loginService: LoginService,
    private _municipioService: MunicipioService,
  ) { }

  ngOnInit() {
    this.cfgEntidadJudicial = new CfgEntidadJudicial(null, null, null);

    this._municipioService.getMunicipioSelect().subscribe(
      response => {
        this.municipios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    this.cfgEntidadJudicial.municipioId = this.municipioSelected;
    
    this._CfgEntidadJudicialService.register(this.cfgEntidadJudicial, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
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
            text: 'La placa ya se encuentra registrado',
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