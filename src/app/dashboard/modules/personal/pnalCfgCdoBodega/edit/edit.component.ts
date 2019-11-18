import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/* import { SvIpatImpresoBodegaService } from '../../../../../services/svIpatImpresoBodega.service'; */
import { PnalCfgCdoBodegaService } from '../../../../../services/pnalCfgCdoBodega.service';

import { DatePipe } from '@angular/common';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pnalcfgcdobodega',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() bodega:any = null;
  public errorMessage;
  public cantidadRecibida;

constructor(
  /* private _ImpresoBodegaService: SvIpatImpresoBodegaService, */
  private _PnalCfgCdoBodegaService: PnalCfgCdoBodegaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){
    this.cantidadRecibida = this.bodega.cantidadRecibida;

    var datePiper = new DatePipe('en-US');

    var date = new Date();
    date.setTime(this.bodega.fecha.timestamp * 1000);
    this.bodega.fecha = datePiper.transform(
      date, 'yyyy-MM-dd'
    );
   }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

    this.bodega.cantidad = this.cantidadRecibida;

    this._PnalCfgCdoBodegaService.edit(this.bodega, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

		}); 
  }

}