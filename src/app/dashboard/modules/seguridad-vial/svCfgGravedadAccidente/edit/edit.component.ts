import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SvCfgGravedadAccidenteService } from '../../../../../services/svCfgGravedadAccidente.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

 
@Component({
  selector: 'app-edit-svcfggravedadaccidente',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() cfgGravedad: any = null;
  public errorMessage;

  constructor(
    private _SvCfgGravedadAccidenteService: SvCfgGravedadAccidenteService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() { }

  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._LoginService.getToken();
    this._SvCfgGravedadAccidenteService.edit(this.cfgGravedad, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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