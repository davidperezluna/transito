import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvParametroService } from '../../../services/msvParametro.service';
import { MsvCalificacionService } from '../../../services/msvCalificacion.service';
import { MsvResultadoService } from "../../../services/msvResultado.service";
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new-fortalecimiento',
  templateUrl: './newFortalecimiento.component.html'
})
export class NewFortalecimientoComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() msvCategoriaId;
  @Input() miEmpresa: any = null;
  public errorMessage;
  public msj = '';
  public showT = false;
  public msvParametros;  
  public msvVariables;
  public msvVariablesLength;
  public tramiteNombreSelected:any;
  public criterio;
  public aplica;
  public evidencia;
  public datos = {
    'idEmpresa': null,
    'valorObtenidoFortalecimiento': null,
    'valorObtenidoComportamiento': null,
    'valorObtenidoVehiculoSeguro': null,
    'valorObtenidoInfraestructuraSegura': null,
    'valorObtenidoAtencionVictima': null,
    'valorObtenidoValorAgregado': null,
  };

  constructor(
    private _loginService: LoginService,
    private _MsvParametroService: MsvParametroService,
    private _MsvCalificacionService: MsvCalificacionService,
    private _MsvResultadoService: MsvResultadoService,

  ) { }

  ngOnInit() { 
    let token = this._loginService.getToken();    
    this._MsvParametroService.getParametroByCategoriaId(token, 2).subscribe(
      response => {
        this.msvParametros = response.data;
        if (this.msvParametros) {
          //entra aquí si encuentra Parametro                    
          this.showT = true;
      } else {
          swal({
              type: 'error',
              title: 'Oops...',
              text: '¡La categoria no tiene parametros!'
          })
      }
      }
    );
  }

  onEnviar() {
    let token = this._loginService.getToken();
    this._MsvCalificacionService.newCalificacion(token,this.msvParametros,this.miEmpresa.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: response.message,
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
      }
    );
  }
  
  calcularTotal(e, parametro, idCategoria){
    if(idCategoria == 1) {
      if (e) {
        this.datos.valorObtenidoFortalecimiento += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos.valorObtenidoFortalecimiento -= parametro.valor / parametro.numeroVariables;
      }
    } else if (idCategoria == 2) {
      if (e) {
        this.datos.valorObtenidoComportamiento += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos.valorObtenidoComportamiento -= parametro.valor / parametro.numeroVariables;
      }
    } else if (idCategoria == 3) {
      if (e) {
        this.datos.valorObtenidoVehiculoSeguro += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos.valorObtenidoVehiculoSeguro -= parametro.valor / parametro.numeroVariables;
      }
    } else if (idCategoria == 4) {
      if (e) {
        this.datos.valorObtenidoInfraestructuraSegura += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos.valorObtenidoInfraestructuraSegura -= parametro.valor / parametro.numeroVariables;
      }
    } else if (idCategoria == 5) {
      if (e) {
        this.datos.valorObtenidoAtencionVictima += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos.valorObtenidoAtencionVictima -= parametro.valor / parametro.numeroVariables;
      }
    } else if (idCategoria == 6) {
      if (e) {
        this.datos.valorObtenidoValorAgregado += parametro.valor / parametro.numeroVariables;
      } else {
        this.datos.valorObtenidoValorAgregado -= parametro.valor / parametro.numeroVariables;
      }
    }
  }

  onFinalizar() {
    let token = this._loginService.getToken();

    this.datos.idEmpresa = this.miEmpresa.id;
    this._MsvResultadoService.register(this.datos, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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
      }
    );
  }
}