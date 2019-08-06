import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CvMedidaCautelar } from '../cvMedidaCautelar.modelo';
import { UserCfgTipoMedidaCautelarService } from '../../../../../services/userCfgTipoMedidaCautelar.service';
import { CvMedidaCautelarService } from '../../../../../services/cvMedidaCautelar.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvmedidacautelar',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendosSelect: any = null;
  public medidaCautelar: CvMedidaCautelar;
  public errorMessage;
  public formPreliquidacion = false;

  public intereses: any;
  public interesSelected: any;
  public interes: any;
  
  public porcentaje: any;
  public valorTotal: any;
  public valorInteres: any;
  public valorCuotaInicial: any;
  public fechaFinal: any;
  public cuotas: any = null;

constructor(
  private _loginService: LoginService,
  private _CvCfgTipoMedidaCautelarService: UserCfgTipoMedidaCautelarService,
  private _CvMedidaCautelarService: CvMedidaCautelarService,
  ){}

  ngOnInit() {
    this.medidaCautelar = new CvMedidaCautelar(null, null,null, null,null, null,null, null,null, null,null, null,null, null);

    

  }

  onCancelar(){
    this.ready.emit(true);
  }

 
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CvCfgTipoMedidaCautelarService.register(this.medidaCautelar, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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
      }
    );
  }

}