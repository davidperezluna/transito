import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../../services/login.service';
import { PqoCfgPatioService } from 'app/services/pqoCfgPatio.service';
import { VhloCfgTipoVehiculoService } from 'app/services/vhloCfgTipoVehiculo.service';
import { PqoCfgTarifaService } from 'app/services/pqoCfgTarifa.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pqocfgtarifa',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit, AfterViewInit {
  @Output() ready = new EventEmitter<any>();
  @Input() tarifa: any = null;
  public errorMessage;
  public patioSelected;
  public tipoVehiculoSelected;

  public patios: any;
  public tiposVehiculo: any;

  public formReady = false;

  constructor(
    private _TarifaService: PqoCfgTarifaService,
    private _PatioService: PqoCfgPatioService,
    private _TipoVehiculoService: VhloCfgTipoVehiculoService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() { 
    var datePiper = new DatePipe('en-US');

    var date = new Date();

    if (this.tarifa.fecha) {
      date.setTime(this.tarifa.fecha.timestamp * 1000);

      this.tarifa.fecha = datePiper.transform(
        date, 'yyyy-MM-dd'
      );
    }

    this._PatioService.select().subscribe(
      response => {
        this.patios = response;
        setTimeout(() => {
          this.patioSelected = [this.tarifa.patio.id];
        })
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;
        setTimeout(() => {
          this.tipoVehiculoSelected = [this.tarifa.tipoVehiculo.id];
        })
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

  ngAfterViewInit() {
    swal.close();
  }

  onCancelar() { this.ready.emit(true); }

  onEnviar() {
    let token = this._loginService.getToken();

    this.tarifa.idPatio = this.patioSelected;
    this.tarifa.idTipoVehiculo = this.tipoVehiculoSelected;

    this._TarifaService.edit(this.tarifa, token).subscribe(
      response => {
        if (response.code == 200) {
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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
}