import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloTecnoMecanica } from '../vhloTecnoMecanica.modelo';
import { VhloTecnoMecanicaService } from '../../../services/vhloTecnoMecanica.service';
import { VhloCfgCdaService } from '../../../services/vhloCfgCda.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() vehiculo: any = null;

  public tecnomecanica: VhloTecnoMecanica;
  public errorMessage;
  public cdas: any;
  public cdaSelected: any;

  public estadoSelected: any;
  public estados = [
    { value: 'UTILIZADO', label: 'UTILIZADO' },
    { value: 'VENCIDO', label: 'VENCIDO' },
  ];

constructor(
  private _TecnoMecanicaService: VhloTecnoMecanicaService,
  private _CdaService: VhloCfgCdaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tecnomecanica = new VhloTecnoMecanica(null, null, null, null, null, null, null);

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

    this.tecnomecanica.idCda = this.cdaSelected;
    this.tecnomecanica.idVehiculo = this.vehiculo.id;
    this.tecnomecanica.estado = this.estadoSelected;

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
        this._TecnoMecanicaService.register(this.tecnomecanica, token).subscribe(
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
    
    if (this.tecnomecanica.fechaExpedicion) {
      this._TecnoMecanicaService.getFechaVencimiento({'fechaExpedicion':this.tecnomecanica.fechaExpedicion}, token).subscribe(
        response => {
          if (response.status == 'success') {
            this.tecnomecanica.fechaVencimiento = response.data;
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