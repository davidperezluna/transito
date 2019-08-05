import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CvCfgTipoRestriccion } from '../cvCfgTipoRestriccion.modelo';
import { CvAcuerdoPagoService } from '../../../../../services/cvAcuerdoPago.service';
import { CvCfgInteresService } from '../../../../../services/cvCfgInteres.service';
import { CvCfgTipoRestriccionService } from '../../../../../services/cvCfgTipoRestriccion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendosSelect: any = null;
  public tipoRestriccion: CvCfgTipoRestriccion;
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
  private _AcuerdoPagoService: CvAcuerdoPagoService,
  private _InteresService: CvCfgInteresService,
  private _loginService: LoginService,
  private _CvCfgTipoRestriccionService: CvCfgTipoRestriccionService,
  ){}

  ngOnInit() {
    this.tipoRestriccion = new CvCfgTipoRestriccion(null, null);

    

  }

  onCancelar(){
    this.ready.emit(true);
  }

 
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CvCfgTipoRestriccionService.register(this.tipoRestriccion, token).subscribe(
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