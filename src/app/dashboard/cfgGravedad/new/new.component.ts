import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgGravedad } from '../cfgGravedad.modelo';
import { CfgGravedadService } from '../../../services/cfgGravedad.service';
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
  public cfgGravedad: CfgGravedad;
  public errorMessage;
  public respuesta;
  public modulos: any;
  public moduloSelected: any;
  

  constructor(
    private _CfgGravedadService: CfgGravedadService,
    private _loginService: LoginService,
    private _ModuloService: ModuloService,
    private _sedeOperativaService: SedeOperativaService,
  ) { }

  ngOnInit() {
    this.cfgGravedad = new CfgGravedad(null, null);

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
    
    this._CfgGravedadService.register(this.cfgGravedad, token).subscribe(
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