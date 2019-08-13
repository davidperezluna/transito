import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BpOrdenPago } from '../bpOrdenPago.modelo';
import { BpOrdenPagoService } from '../../../../../services/bpOrdenPago.service';
import { BpRegistroCompromisoService } from '../../../../../services/bpRegistroCompromiso.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-ordenpago',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public ordenPago: BpOrdenPago;
  public errorMessage;

  public numeroRegistroCompromiso: any = null;
  public registroCompromiso: any = null;
  public funcionario: any = null;

  public formSearch: any = true;

  public tiposPago = [
    { 'value': 'PAGO DE ANTICIPO', 'label': 'PAGO DE ANTICIPO' },
    { 'value': 'PAGO PARCIAL', 'label': 'PAGO PARCIAL' },
    { 'value': 'PAGO TOTAL', 'label': 'PAGO TOTAL' },
  ];

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _OrdenPagoService: BpOrdenPagoService,
    private _RegistroCompromisoService: BpRegistroCompromisoService,
    private _LoginService: LoginService,
  ){}

  ngOnInit() {
    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.ordenPago = new BpOrdenPago(null, null, null, null, null, null);

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;

          swal.close();
        } else {
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar facturación!',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearchRegistroCompromiso() {
    swal({
      title: 'Buscando solicitud!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._RegistroCompromisoService.searchByNumero({ 'numero': this.numeroRegistroCompromiso }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.registroCompromiso = response.data;

          swal.close();
        } else {
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });

          this.registroCompromiso = null;
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
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.ordenPago.idRegistroCompromiso = this.registroCompromiso.id;
    
		this._OrdenPagoService.register(this.ordenPago, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.ngOnInit();
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

		}); 
  }

}