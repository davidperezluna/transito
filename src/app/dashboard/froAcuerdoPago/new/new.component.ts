import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroAcuerdoPago } from '../froAcuerdoPago.modelo';
import { FroAcuerdoPagoService } from '../../../services/froAcuerdoPago.service';
import { CvCfgInteresService } from '../../../services/cvCfgInteres.service';
import { CvCfgPorcentajeInicialService } from '../../../services/cvCfgPorcentajeInicial.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendosSelect: any = null;
  public acuerdoPago: FroAcuerdoPago;
  public errorMessage;
  public formPreliquidacion = false;
  public formLiquidacion = false;
  
  public porcentaje: any;
  public interes: any;
  public interesInicial: any;
  public valorTotal: any;
  public valorInteres: any;
  public valorCuotaInicial: any;
  public totalPagar: any;
  public fechaFinal: any;
  public cuotas: any = null;
  public amortizaciones: any = null;
  public trazabilidad: any = null;
  public acuerdoPagoNew: any = null;

  public apiUrl = environment.apiUrl + 'configuracion';

constructor(
  private _FroAcuerdoPagoService: FroAcuerdoPagoService,
  private _InteresService: CvCfgInteresService,
  private _PorcentajeService: CvCfgPorcentajeInicialService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.acuerdoPago = new FroAcuerdoPago(null, null, null, null, null, null, null);

    this.acuerdoPago.numeroCuotas = 1;

    this._InteresService.searchActive().subscribe(
      response => {
        if (response.status == 'success') {
          this.interes = response.data;
          this.interesInicial = this.interes.valor;
          this.acuerdoPago.idInteres = this.interes.id;
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

    this._PorcentajeService.searchActive().subscribe(
      response => {
        if (response.status == 'success') {
          this.porcentaje = response.data;
          this.acuerdoPago.porcentajeInicial = this.porcentaje.valor;
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

    this._FroAcuerdoPagoService.calculateDateEnd(this.acuerdoPago, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.fechaFinal = response.data;
          
          this.acuerdoPago.comparendos = this.comparendosSelect;

          this._FroAcuerdoPagoService.calculateValue(this.acuerdoPago, token).subscribe(
            response => {
              if (response.status == 'success') {

                this.valorTotal = response.data;
                this.valorInteres = (this.interes.valor / 100) * this.valorTotal;
                this.valorTotal = this.valorTotal + this.valorInteres;
                this.valorCuotaInicial = (this.valorTotal * this.acuerdoPago.porcentajeInicial) / 100;

                this.acuerdoPago.valorCapital = this.valorTotal;
                this.acuerdoPago.valorCuotaInicial = this.valorCuotaInicial;

                this._FroAcuerdoPagoService.calculateDues(this.acuerdoPago, token).subscribe(
                  response => {
                    if (response.status == 'success') {
                      this.cuotas = response.data.cuotas;
                      this.totalPagar = response.data.totalPagar;
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
  
  onEnviar(){
    let token = this._loginService.getToken();
    this.acuerdoPago.comparendos = this.comparendosSelect;

    let datos = {
      'acuerdoPago':this.acuerdoPago,
      'cuotas':this.cuotas
    }

		this._FroAcuerdoPagoService.register(datos, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.amortizaciones = response.data.amortizaciones;
          this.trazabilidad = response.data.trazabilidad;
          this.acuerdoPagoNew = response.data.acuerdoPago;

          this.formPreliquidacion = false;
          this.formLiquidacion = true;

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