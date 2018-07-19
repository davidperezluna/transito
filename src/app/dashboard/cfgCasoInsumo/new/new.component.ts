import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgCasoInsumo } from '../cfgCasoInsumo.modelo';
import { CfgCasoInsumoService } from '../../../services/cfgCasoInsumo.service';
import { LoginService } from '../../../services/login.service';
import { ModuloService } from '../../../services/modulo.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgCasoInsumo: CfgCasoInsumo;
  public errorMessage;
  public respuesta;
  public modulos: any;
  public moduloSelected: any;
  public tipoCasoInsumos = [
    { 'value': "Insumo", 'label': "Insumo" },
    { 'value': "Sustrato", 'label': "Sustrato" }
  ];
  public tipoCasoInsumoSelected: any;

  constructor(
    private _CfgCasoInsumoService: CfgCasoInsumoService,
    private _loginService: LoginService,
    private _ModuloService: ModuloService,
    private _sedeOperativaService: SedeOperativaService,
  ) { }

  ngOnInit() {
    this.cfgCasoInsumo = new CfgCasoInsumo(null, null, null, null, null, null);

    this._ModuloService.getModuloSelect().subscribe(
      response => {
        this.modulos = response;
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
    this.cfgCasoInsumo.moduloId = this.moduloSelected;
    console.log(this.cfgCasoInsumo);
    this._CfgCasoInsumoService.register(this.cfgCasoInsumo, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: 'El Caso Insumo ya se encuentra registrado',
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