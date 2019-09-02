import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BpReduccion } from '../bpReduccion.modelo';
import { BpReduccionService } from '../bpReduccion.service';
import { BpRegistroCompromisoService } from '../../../../../services/bpRegistroCompromiso.service';
import { BpCdpService } from '../../../../../services/bpCdp.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-reduccion',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public reduccion: BpReduccion;
  public errorMessage;

  public funcionario: any = null;
  public registroCompromiso: any = null;
  public cdp: any = null;
  public numero: any = null;

  public formSearch: any = true;

  public tiposReduccion = [
    { 'value': 1, 'label': 'CDP' },
    { 'value': 2, 'label': 'Registro compromiso' },
  ];

  constructor(
    private _ReduccionService: BpReduccionService,
    private _RegistroCompromisoService: BpRegistroCompromisoService,
    private _CdpService: BpCdpService,
    private _FuncionarioService: PnalFuncionarioService,
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

    this.reduccion = new BpReduccion(null, null, null, null, null, null, null, null, null);

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;
          this.reduccion.idFuncionario = this.funcionario.id;

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

  onSearch() {
    swal({
      title: 'Buscando solicitud!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    if (this.reduccion.tipoReduccion == 1) {
      this._CdpService.searchByNumero({ 'numero': this.numero }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.cdp = response.data;
            this.reduccion.idCdp = this.cdp.id;

            swal.close();
          } else {
            swal({
              title: 'Atención!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });

            this.cdp = null;
            this.reduccion.idCdp = this.cdp;
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
    } else if (this.reduccion.tipoReduccion == 2){
      this._RegistroCompromisoService.searchByNumero({ 'numero': this.numero }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.registroCompromiso = response.data;
            this.reduccion.idRegistroCompromiso = this.registroCompromiso.id;
  
            swal.close();
          } else {
            swal({
              title: 'Atención!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
  
            this.registroCompromiso = null;
            this.reduccion.idRegistroCompromiso = this.registroCompromiso;
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
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._ReduccionService.register(this.reduccion, token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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