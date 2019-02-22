import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgPlaca } from '../vhloCfgPlaca.modelo';
import { VhloCfgPlacaService } from '../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../services/login.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgPlaca: VhloCfgPlaca;
  public errorMessage;
  public respuesta;
  public clases: any;
  public claseSelected: any;
  public sedesOperativas: any;
  public sedeOperativaSelected: any;

  constructor(
    private _CfgPlacaService: VhloCfgPlacaService,
    private _loginService: LoginService,
    private _claseService: VhloCfgClaseService,
    private _sedeOperativaService: SedeOperativaService,
  ) { }

  ngOnInit() {
    this.cfgPlaca = new VhloCfgPlaca(null, null, null, null);

    this._claseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._sedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
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
    this.cfgPlaca.claseId = this.claseSelected;
    this.cfgPlaca.sedeOperativaId = this.sedeOperativaSelected;
    console.log(this.cfgPlaca);
    this._CfgPlacaService.register(this.cfgPlaca, token).subscribe(
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