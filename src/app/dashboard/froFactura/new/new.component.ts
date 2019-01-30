import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroFactura } from '../froFactura.modelo';
import { FroFacturaService } from '../../../services/froFactura.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
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
  public factura: FroFactura;
  public errorMessage;

  public sedesOperativas: any;
  public municipio: any = null;
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;

  public apiUrl = environment.apiUrl + 'financiero';

constructor(
  private _FacturaService: FroFacturaService,
  private _SedeOperativaService: SedeOperativaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.factura = new FroFactura(0, 0, null, null, null, null);

    let token = this._loginService.getToken();
    
    this._FacturaService.calculateValue(this.comparendosSelect, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.factura.valor = response.data.totalPagar;
          this.factura.interes = response.data.totalInteres;
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

    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
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

  
  onEnviar(){
    let token = this._loginService.getToken();

    this.factura.comparendos = this.comparendosSelect;
    //Tipo de recaudo infracciones
    this.factura.idTipoRecaudo = 2;
    
		this._FacturaService.register(this.factura, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.factura.id = response.data.id;
          this.municipio = response.data.sedeOperativa.municipio.nombre;
          this.fechaCreacion = response.data.fechaCreacion;
          this.fechaVencimiento = response.data.fechaVencimiento;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          this.factura.id = null;
          
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