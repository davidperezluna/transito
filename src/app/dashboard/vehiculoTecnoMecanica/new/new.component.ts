import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TecnoMecanica } from '../vehiculoTecnoMecanica.modelo';
import { TecnoMecanicaService } from '../../../services/vehiculoTecnoMecanica.service';
import { CfgCdaService } from '../../../services/cfgCda.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() vehiculo: any = null;
  public cda: TecnoMecanica;
  public errorMessage;
  public cdas: any;
  public cdaSelected: any;

constructor(
  private _TecnoMecanicaService: TecnoMecanicaService,
  private _CdaService: CfgCdaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.cda = new TecnoMecanica(null, null, null, null, null, null);

    this._CdaService.select().subscribe(
      response => {
        this.cdas = response;
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

    this.cda.idCda = this.cdaSelected;
    this.cda.idVehiculo = this.vehiculo.id;

    swal({
      title: '¿Está seguro?',
      text: "¿Desea guardar la información?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._TecnoMecanicaService.register(this.cda, token).subscribe(
          response => {
            if (response.status == 'success') {
              this.ready.emit(true);
              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              })
            } else {
              swal({
                title: 'Error!',
                text: response.message,
                type: 'error',
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
      }
    });
    
		 
  }

  onCalcularVencimiento() {
    let token = this._loginService.getToken();
    
    if (this.cda.fechaExpedicion) {
      this._TecnoMecanicaService.getFechaVencimiento({'fechaExpedicion':this.cda.fechaExpedicion}, token).subscribe(
        response => {
          if (response.status == 'success') {
            this.cda.fechaVencimiento = response.data;
            //swal.close();
          } else {
            swal({
              title: 'Alerta!',
              text: response.message,
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

  }
}