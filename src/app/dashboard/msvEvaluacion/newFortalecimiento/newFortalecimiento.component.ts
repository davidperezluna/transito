import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvParametroService } from '../../../services/msvParametro.service';
import { MsvVariableService } from '../../../services/msvVariable.service';
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
    'fortalecimiento': null,
    'comportamiento': null,
    'vehiculoSeguro': null,
    'infraestructuraSegura': null,
    'atencionVictima': null,
    'valorAgregado': null,
  };

  constructor(
    private _loginService: LoginService,
    private _MsvParametroService: MsvParametroService,
    private _MsvVariableService: MsvVariableService,
    private _MsvCalificacionService: MsvCalificacionService,
    private _MsvResultadoService: MsvResultadoService,

  ) { }

  ngOnInit() { 
    
    let token = this._loginService.getToken();    
    this._MsvParametroService.getParametroByCategoriaId(token,this.msvCategoriaId).subscribe(
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

  onFinalizar() {
    let token = this._loginService.getToken();

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
}