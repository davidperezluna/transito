import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CvAcuerdoPago } from '../cvCfgTipoRestriccion.modelo';
import { CvAcuerdoPagoService } from '../../../services/cvAcuerdoPago.service';
import { CvCfgInteresService } from '../../../services/cvCfgInteres.service';
import { CvCfgPorcentajeInicialService } from '../../../services/cvCfgPorcentajeInicial.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendosSelect: any = null;
  public acuerdoPago: CvAcuerdoPago;
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
  private _PorcentajeService: CvCfgPorcentajeInicialService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.acuerdoPago = new CvAcuerdoPago(null, null, null, null, null, null, null, null);

    this._InteresService.select().subscribe(
      response => {
        this.intereses = response;
        
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._PorcentajeService.searchActive().subscribe(
      response => {
        if (response.status == 'success') {
          this.porcentaje = response.data;
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
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

  onCancelar(){
    this.ready.emit(true);
  }

  onPreliquidar() {
    let token = this._loginService.getToken();

    this.acuerdoPago.idInteres = this.interesSelected;

    this._InteresService.show(this.acuerdoPago, token).subscribe(
      response => {
        this.interes = response.data;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._AcuerdoPagoService.calculateDateEnd(this.acuerdoPago, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.fechaFinal = response.data;
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this.acuerdoPago.comparendos = this.comparendosSelect;
    
    this._AcuerdoPagoService.calculateValue(this.acuerdoPago, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.valorTotal = response.data;
          this.valorCuotaInicial = (this.valorTotal * this.porcentaje.valor) / 100;
          this.valorInteres = (this.valorTotal * this.interes.valor) / 100;
          this.acuerdoPago.valorCapital = this.valorTotal;
          this.acuerdoPago.valorCuotaInicial = this.valorCuotaInicial;
          this.formPreliquidacion = true;
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._AcuerdoPagoService.calculateDues(this.acuerdoPago, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.cuotas = response.data;
          this.acuerdoPago.valorCapital = this.valorTotal;
          this.acuerdoPago.valorCuotaInicial = this.valorCuotaInicial;
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    console.log(this.acuerdoPago);

    
  }
  
  onEnviar(){
    let token = this._loginService.getToken();

    this.acuerdoPago.idPorcentajeInicial = this.porcentaje.id;
    this.acuerdoPago.idInteres = this.interesSelected;
    this.acuerdoPago.comparendos = this.comparendosSelect;
    
		this._AcuerdoPagoService.register(this.acuerdoPago, token).subscribe(
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