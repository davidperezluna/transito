import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgPlacaService } from '../../../services/vhloCfgPlaca.service';
import { VhloCfgTipoVehiculoService } from '../../../services/vhloCfgTipoVehiculo.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
  @Output() ready = new EventEmitter<any>();
  @Input() cfgPlaca: any = null;
  public errorMessage;
  public tiposVehiculo: any;
  public tipoVehiculoSelected: any;
  public organismosTransito: any;
  public organismoTransitoSelected: any;

  constructor(
    private _CfgPlacaService: VhloCfgPlacaService,
    private _TipoVehiculoService: VhloCfgTipoVehiculoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _LoginService: LoginService,
  ) {
    //   this.tipoIdentificacion = [
    //     {value: 'CC', label: 'Cédula de ciudadanía'},
    //     {value: 'TE', label: 'Tarjeta de extranjería'},
    //     {value: 'CE', label: 'Cédula de extranjería'},
    //     {value: 'P', label: 'Pasaporte'},
    // ];
  }

  ngOnInit() {
    this._TipoVehiculoService.select().subscribe(
      response => {
        this.tiposVehiculo = response;

        setTimeout(() => {
          this.tipoVehiculoSelected = [this.cfgPlaca.tipoVehiculo.id];
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

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;

        setTimeout(() => {
          this.organismoTransitoSelected = [this.cfgPlaca.organismoTransito.id];
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


  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._LoginService.getToken();

    this.cfgPlaca.claseId = this.tipoVehiculoSelected;
    this.cfgPlaca.sedeOperativaId = this.organismoTransitoSelected;

    this._CfgPlacaService.edit(this.cfgPlaca, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
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

}