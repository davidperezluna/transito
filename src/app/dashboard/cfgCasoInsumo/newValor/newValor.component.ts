import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ImoCfgValor } from './imoCfgValor.modelo';
import { ImoCfgValorService } from '../../../services/imoCfgValor.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-new-valor',
  templateUrl: './newValor.component.html'
})
export class NewValorComponent implements OnInit {
  @Output() readyValor = new EventEmitter<any>();
  @Input() cfgCasoInsumo: any = null;
  public errorMessage;
  public imoCfgValor: ImoCfgValor;
  public respuesta;
  public modulos: any;
  public moduloSelected: any;
  public tipoCasoInsumos = [
    { 'value': "Insumo", 'label': "Insumo" },
    { 'value': "Sustrato", 'label': "Sustrato" }
  ];
  public tipoCasoInsumoSelected: any;
  constructor(
    private _ImoCfgValorService: ImoCfgValorService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.imoCfgValor = new ImoCfgValor(null, null);
    console.log(this.cfgCasoInsumo);


  }
  onCancelar() {
    this.readyValor.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    
    this._ImoCfgValorService.register(this.cfgCasoInsumo, token).subscribe(
      response => {
        this.respuesta = response;
        
        if (this.respuesta.status == 'success') {
          this.readyValor.emit(true);
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