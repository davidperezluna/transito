import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvCdoCfgDescuentoService } from '../../../../../services/cvCdoCfgDescuento.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cvcdocfgdescuento',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() descuento:any = null;
  public errorMessage;

public formReady = false;

constructor(
  private _DescuentoService: CvCdoCfgDescuentoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._DescuentoService.edit(this.descuento,token).subscribe(
			response => {
        if(response.status == 'success'){
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