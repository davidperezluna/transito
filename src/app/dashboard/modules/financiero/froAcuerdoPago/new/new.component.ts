import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FroAcuerdoPago } from '../froAcuerdoPago.modelo';
import { FroAcuerdoPagoService } from '../../../../../services/froAcuerdoPago.service';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-acuerdopago',
  templateUrl: './new.component.html',
  providers: [DatePipe]
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() comparendoSelect: any = null;
  public acuerdoPago: FroAcuerdoPago;
  public errorMessage;
  public formPreliquidacion = false;
  public formLiquidacion = false;
  
  public comparendo: any;
  public porcentaje: any;
  public interesInicial: any = null;
  public valorPorcentajeInteres: any = null;
  public valorPorcentajeCapital: any = null;
  public totalPagar: any = null;
  public cuotas: any = null;
  public amortizaciones: any = null;
  public trazabilidad: any = null;
  public acuerdoPagoNew: any = null;

  public apiUrl = environment.apiUrl + 'configuracion';

constructor(
  private _AcuerdoPagoService: FroAcuerdoPagoService,
  private _ComparendoService: CvCdoComparendoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    swal({
      title: 'Cargando interes y porcentaje inicial!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.acuerdoPago = new FroAcuerdoPago(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this.acuerdoPago.numeroCuotas = 1;
    this.acuerdoPago.porcentajeDescuento = 0;

    let token = this._LoginService.getToken();

    this._ComparendoService.show({ 'id': this.comparendoSelect }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.comparendo = response.data;
          this.acuerdoPago.idComparendo = this.comparendo.id;
          this.acuerdoPago.valorBruto = this.comparendo.valorInfraccion;

          var datePiper = new DatePipe('en-US');

          var date = new Date();
          date.setTime(this.comparendo.fecha.timestamp * 1000);
          this.acuerdoPago.fechaComparendo = datePiper.transform(
            date, 'yyyy-MM-dd'
          );

          this._AcuerdoPagoService.calculateInitValues({ 'idComparendo': this.comparendo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.acuerdoPago.porcentajeInicial = response.data.porcentajeInicial.valor;
                this.acuerdoPago.idInteres = response.data.interes.id;
                this.interesInicial = response.data.interes.valor;

                swal.close();
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

  onCancelar(){
    this.ready.emit(true);
  }

  


  onPreliquidar() {
    if (this.acuerdoPago.numeroCuotas > 1) {
      
      swal({
        title: 'Generando preliquidación!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });
  
      let token = this._LoginService.getToken();
  
      this._AcuerdoPagoService.calculateDateEnd(this.acuerdoPago, token).subscribe(
        response => {
          if (response.code == 200) {
            this.acuerdoPago.fechaInicial = response.data.fechaInicial;
            this.acuerdoPago.fechaFinal = response.data.fechaFinal;
            this.acuerdoPago.diasMoraTotal = response.data.diasMoraTotal;
            this.acuerdoPago.valorMora = (this.acuerdoPago.diasMoraTotal * (this.interesInicial / 100) * this.acuerdoPago.valorBruto);
            if (this.acuerdoPago.porcentajeDescuento > 0){
              this.acuerdoPago.valorDescuento = this.acuerdoPago.valorMora * (this.acuerdoPago.porcentajeDescuento / 100);
            }else{
              this.acuerdoPago.valorDescuento = 0;
            }
            this.acuerdoPago.valorNeto = this.acuerdoPago.valorBruto + (this.acuerdoPago.valorMora - this.acuerdoPago.valorDescuento);
            this.acuerdoPago.valorCuotaInicial = this.acuerdoPago.valorNeto * (this.acuerdoPago.porcentajeInicial / 100);
  
            this.valorPorcentajeInteres = (this.acuerdoPago.valorCuotaInicial) * (25 / 100);
            this.valorPorcentajeCapital = (this.acuerdoPago.valorCuotaInicial) * (75 / 100);
  
            this._AcuerdoPagoService.calculateDues(this.acuerdoPago, token).subscribe(
              response => {
                if (response.status == 'success') {
                  this.cuotas = response.data.cuotas;
                  this.totalPagar = response.data.totalPagar;
  
                  this.formPreliquidacion = true;
  
                  swal({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                  });
                } else {
                  swal({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  });
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
            this.acuerdoPago.fechaFinal = null;
            this.acuerdoPago.diasMoraTotal = null;
  
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
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
    }else{
      swal({
        title: 'Atención',
        text: 'El número de cuotas debe ser mayor a 1.',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }      
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    let datos = {
      'acuerdoPago':this.acuerdoPago,
      'cuotas':this.cuotas
    }

		this._AcuerdoPagoService.register(datos, token).subscribe(
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