import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BpRegistroCompromiso } from '../bpRegistroCompromiso.modelo';
import { BpRegistroCompromisoService } from '../../../../../services/bpRegistroCompromiso.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-registrocompromiso',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public registro: BpRegistroCompromiso;
  public errorMessage;

  public numeroSolicitud: any = null;
  public solicitud: any = null;
  public funcionario: any = null;

  public formSearch: any = true;

  public tiposContrato = [
    { 'value': 'MÍNIMA CUANTÍA', 'label': 'MÍNIMA CUANTÍA' },
    { 'value': 'SELECCIÓN ABREVIADA DE MENOR CUANTÍA', 'label': 'SELECCIÓN ABREVIADA DE MENOR CUANTÍA' },
    { 'value': 'SUBASTA', 'label': 'SUBASTA' },
    { 'value': 'LICITACIÓN', 'label': 'LICITACIÓN' },
    { 'value': 'CONCURSO MÉRITO', 'label': 'CONCURSO MÉRITO' },
    { 'value': 'CONTRATACIÓN DIRECTA', 'label': 'CONTRATACIÓN DIRECTA' },
  ];
  
  public estadosContrato = [
    { 'value': 'EJECUCIÓN', 'label': 'EJECUCIÓN' },
    { 'value': 'LIQUIDACIÓN', 'label': 'LIQUIDACIÓN' },
  ];

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
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

    this.registro = new BpRegistroCompromiso(null, null, null, null, null, null, null);

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
            text: 'Su usuario no tiene autorización para realizar esta operación!',
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

  onSearchSolicitud() {
    swal({
      title: 'Buscando solicitud!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._RegistroCompromisoService.searchSolicitudByNumero({ 'numero': this.numeroSolicitud }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.solicitud = response.data;

          swal.close();
        } else {
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });

          this.solicitud = null;
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

    this.registro.id = this.solicitud.id;
    
		this._RegistroCompromisoService.register(this.registro, token).subscribe(
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