import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgPlaca } from '../vhloCfgPlaca.modelo';
import { VhloCfgPlacaService } from '../../../services/vhloCfgPlaca.service';
import { LoginService } from '../../../services/login.service';
import { VhloCfgTipoVehiculoService } from '../../../services/vhloCfgTipoVehiculo.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public cfgPlaca: VhloCfgPlaca;
  public errorMessage;
  public tiposVehiculo: any;
  public tipoVehiculoSelected: any;
  public organismosTransito: any;
  public organismoTransitoSelected: any;

  constructor(
    private _PlacaService: VhloCfgPlacaService,
    private _TipoVehiculoService: VhloCfgTipoVehiculoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.cfgPlaca = new VhloCfgPlaca(null, null, null, null);

    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
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
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._LoginService.getToken();

    this.cfgPlaca.idTipoVehiculo = this.tipoVehiculoSelected;
    this.cfgPlaca.idOrganismoTransito = this.organismoTransitoSelected;

    this._PlacaService.register(this.cfgPlaca, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: 'La placa ya se encuentra registrado',
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

      });
  }

}