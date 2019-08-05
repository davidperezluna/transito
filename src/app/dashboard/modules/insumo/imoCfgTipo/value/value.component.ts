import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ImoCfgValor } from './value.modelo';
import { ImoCfgValorService } from '../../../../../services/imoCfgValor.service';
import { LoginService } from '../../../../../services/login.service';
import { DatePipe  } from '@angular/common';

import swal from 'sweetalert2';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  providers: [DatePipe]
})
export class ValueComponent implements OnInit {
  @Output() readyValor = new EventEmitter<any>();
  @Input() tipoInsumo: any = null;
  public errorMessage;
  public valor: ImoCfgValor;

  public modulos: any;
  public moduloSelected: any;
  public isFechaEnviar: boolean = false;

  public date:any;
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
    this.valor = new ImoCfgValor(null, null,null);
  }
  onCancelar() {
    this.readyValor.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();

    this.valor.idTipoInsumo = this.tipoInsumo.id;  

    this._ImoCfgValorService.register(this.valor, token).subscribe(
      response => {       
        if (response.code == 200) {
          this.readyValor.emit(true);

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

  isFecha(){
    this.date = new Date();
    var datePiper = new DatePipe(this.date);
    this.date = datePiper.transform(this.date,'yyyy-MM-dd');
    if (this.valor.fecha <= this.date) {
      swal({
        title: 'Error!',
        text: 'La fecha no puede ser menor o igual a la actual!',
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      this.isFechaEnviar = true;   
    }
  }
}