import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BpCdp } from '../bpCdp.modelo';
import { BpCdpService } from '../../../../../services/bpCdp.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cdp',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cdp: BpCdp;
  public errorMessage;

  public numeroSolicitud: any = null;
  public solicitud: any = null;
  public funcionario: any = null;

  public formSearch: any = true;

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _CdpService: BpCdpService,
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

    this.cdp = new BpCdp(null, null, null, null, null, null);

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

  onSearchSolicitud() {
    swal({
      title: 'Buscando solicitud!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._CdpService.searchSolicitudByNumero({ 'numero': this.numeroSolicitud }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.solicitud = response.data;

          /*this._ActividadService.select({ 'idProyecto': this.proyecto.id }, token).subscribe(
            response => {
              this.actividades = response;
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }

            }
          );*/

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

    this.cdp.idFuncionario = this.funcionario.id;
    this.cdp.id = this.solicitud.id;
    
		this._CdpService.register(this.cdp, token).subscribe(
			response => {
        if(response.status == 'success'){
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