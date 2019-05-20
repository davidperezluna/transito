import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgCasoInsumo } from '../imoCfgTipo.modelo';
import { ImoCfgTipoService } from '../../../services/imoCfgTipo.service';
import { LoginService } from '../../../services/login.service';
import { CfgModuloService } from '../../../services/cfgModulo.service';
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
    { 'value': "INSUMO", 'label': "INSUMO" },
    { 'value': "SUSTRATO", 'label': "SUSTRATO" }
  ];
  public tipoCasoInsumoSelected: any;

  constructor(
    private _TipoInsumoService: ImoCfgTipoService,
    private _loginService: LoginService,
    private _CfgModuloService: CfgModuloService,
  ) { }

  ngOnInit() {
    this.cfgCasoInsumo = new CfgCasoInsumo(null, null, null, null, null, null);

    this._CfgModuloService.select().subscribe(
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
    this.cfgCasoInsumo.tipo = this.tipoCasoInsumoSelected;
    
    this._TipoInsumoService.register(this.cfgCasoInsumo, token).subscribe(
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