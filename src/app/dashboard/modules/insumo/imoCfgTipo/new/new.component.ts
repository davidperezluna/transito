import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TipoInsumo } from '../imoCfgTipo.modelo';
import { ImoCfgTipoService } from '../../../../../services/imoCfgTipo.service';
import { LoginService } from '../../../../../services/login.service';
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tipoInsumo: TipoInsumo;
  public errorMessage;
  public modulos: any;

  public categorias = [
    { 'value': "INSUMO", 'label': "INSUMO" },
    { 'value': "SUSTRATO", 'label': "SUSTRATO" }
  ];

  constructor(
    private _TipoInsumoService: ImoCfgTipoService,
    private _loginService: LoginService,
    private _CfgModuloService: CfgModuloService,
  ) { }

  ngOnInit() {
    this.tipoInsumo = new TipoInsumo(null, null, null, null, null, null);

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
    
    this._TipoInsumoService.register(this.tipoInsumo, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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