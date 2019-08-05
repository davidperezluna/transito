import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvCdoNotificacionService } from '../../../../../services/cvCdoNotificacion.service';
import { CfgCargoService } from '../../../../../services/cfgCargo.service';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() notificacion:any = null;
  public errorMessage;
  public cargos: any = null;
  public estados: any = null;
  public arrayCargos: any = [];

  public dias = [
    { 'value': '1', 'label': 'Lunes' },
    { 'value': '2', 'label': 'Martes' },
    { 'value': '3', 'label': 'Miercoles' },
    { 'value': '4', 'label': 'Jueves' },
    { 'value': '5', 'label': 'Viernes' },
  ];

public formReady = false;

constructor(
  private _NotificacionService: CvCdoNotificacionService,
  private _CargoService: CfgCargoService,
  private _EstadoService: CvCdoCfgEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){
    this._CargoService.select().subscribe(
      response => {
        this.cargos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._EstadoService.select().subscribe(
      response => {
        this.estados = response;
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._NotificacionService.edit(this.notificacion,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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