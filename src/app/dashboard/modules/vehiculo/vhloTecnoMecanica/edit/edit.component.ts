import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloTecnoMecanicaService } from '../../../../../services/vhloTecnoMecanica.service';
import { VhloCfgCdaService } from '../../../../../services/vhloCfgCda.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() tecnoMecanica: any = null;
  public errorMessage;
  public formReady = false;

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
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    console.log(this.tecnoMecanica);
    this.estadoSelected = this.tecnoMecanica.estado;

    this._CdaService.select().subscribe(
      response => {
        this.cdas = response;
        setTimeout(() => {
          this.cdaSelected = [this.tecnoMecanica.cda.id];
        });
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

  onCancelar() { this.ready.emit(true); }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.tecnoMecanica.idCda = this.cdaSelected;
    this.tecnoMecanica.estado = this.estadoSelected;

    this._TecnoMecanicaService.edit(this.tecnoMecanica, token).subscribe(
      response => {
        if (response.code == 200) {
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

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });
  }

  onCalcularVencimiento() {
    let token = this._LoginService.getToken();

    if (this.tecnoMecanica.fechaExpedicion) {
      this._TecnoMecanicaService.getFechaVencimiento({ 'fechaExpedicion': this.tecnoMecanica.fechaExpedicion }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.tecnoMecanica.fechaVencimiento = response.data;
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