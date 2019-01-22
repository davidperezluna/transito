import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvParametroService } from '../../../services/msvParametro.service';
import { MsvVariableService } from '../../../services/msvVariable.service';
import { MsvCalificacionService } from '../../../services/msvCalificacion.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new-fortalecimiento',
  templateUrl: './newFortalecimiento.component.html'
})
export class NewFortalecimientoComponent implements OnInit {
  @Input() msvCategoriaId;
  @Input() miEmpresa: any = null;
  public msj = '';
  public showT = false;
  public msvParametros;  
  public msvVariables;
  public msvVariablesLength;
  public tramiteNombreSelected:any;
  public criterio;
  public aplica;
  public evidencia;
  public datos: any = []; 

  constructor(
    private _loginService: LoginService,
    private _MsvParametroService: MsvParametroService,
    private _MsvVariableService: MsvVariableService,
    private _MsvCalificacionService: MsvCalificacionService,

  ) { }

  ngOnInit() { 
    
    let token = this._loginService.getToken();    
    this._MsvParametroService.getParametroByCategoriaId(token,this.msvCategoriaId).subscribe(
      response => {
        this.msvParametros = response.data;
        console.log(response.data);
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
    console.log(this.msvParametros);
    let token = this._loginService.getToken();
    this._MsvCalificacionService.newCalificacion(token,this.msvParametros,this.miEmpresa.id).subscribe();
  }
}