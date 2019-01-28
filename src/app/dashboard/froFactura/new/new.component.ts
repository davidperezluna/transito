import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroFactura } from '../froFactura.modelo';
import { FroFacturaService } from '../../../services/froFactura.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

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

constructor(
  private _FacturaService: FroFacturaService,
  private _SedeOperativaService: SedeOperativaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.factura = new FroFactura(null, null, null, null);

    let token = this._loginService.getToken();

    this._FacturaService.calculateValue(this.comparendosSelect, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.factura.valor = response.data;
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
    
		this._FacturaService.register(this.factura, token).subscribe(
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