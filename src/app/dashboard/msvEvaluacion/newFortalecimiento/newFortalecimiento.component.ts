import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvParametroService } from '../../../services/msvParametro.service';
import { MsvVariableService } from '../../../services/msvVariable.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new-fortalecimiento',
  templateUrl: './newFortalecimiento.html'
})
export class NewFortalecimientoComponent implements OnInit {
  @Input() msvCategoriaId;
  public msj = '';
  public showT = false;
  public msvParametros;
  public msvVariables;
  public msvVariablesLength;
  public tramiteNombreSelected:any;

  constructor(
    private _loginService: LoginService,
    private _MsvParametroService: MsvParametroService,
    private _MsvVariableService: MsvVariableService,

  ) { }

  ngOnInit() {
    
    let token = this._loginService.getToken();
    console.log(this.msvCategoriaId);
    this._MsvParametroService.getParametroByCategoriaId(token,this.msvCategoriaId).subscribe(
      response => {
        this.msvParametros = response.data;
        if (this.msvParametros) {
          //entra aquí si encuentra Parametro   
          console.log(this.msvParametros);
                 
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

  onCancelar() {
  }
}