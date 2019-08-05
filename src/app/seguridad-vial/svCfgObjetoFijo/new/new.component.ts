import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SvCfgObjetoFijo } from '../svCfgObjetoFijo.modelo';
import { SvCfgObjetoFijoService } from '../../../services/svCfgObjetoFijo.service';
import { SvCfgClaseChoqueService } from '../../../services/svCfgClaseChoque.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public objetoFijo: SvCfgObjetoFijo;
  
  public clasesChoque: any;
  public claseChoqueSelected;

  public errorMessage;

  constructor(
    private _ObjetoFijoService: SvCfgObjetoFijoService,
    private _SvCfgClaseChoqueService: SvCfgClaseChoqueService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.objetoFijo = new SvCfgObjetoFijo(null, null, null);

    this._SvCfgClaseChoqueService.select().subscribe(
      response => {
        this.clasesChoque = response;
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
    let token = this._LoginService.getToken();

    this.objetoFijo.idClaseChoque = this.claseChoqueSelected;
    
    this._ObjetoFijoService.register(this.objetoFijo, token).subscribe(
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