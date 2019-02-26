import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Vehiculo } from '../../../../vehiculo/vehiculo.modelo';
import { LoginService } from '../../../../../services/login.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../../services/vhloCfgCombustible.service';
import { VehiculoService } from '../../../../../services/vehiculo.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { CfgPaisService } from "../../../../../services/cfgPais.service";
import { MsvRegistroIpatService } from "../../../../../services/msvRegistroIpat.service";
import swal from 'sweetalert2';
@Component({
    selector: 'app-new-vehiculo',
    templateUrl: './newVehiculo.component.html'
})
export class NewVehiculoComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public vehiculo: Vehiculo;
    public vhl = false;
    public municipios: any;
    public errorMessage: any;
    public habilitar: any;
    public lineas: any;
    public clases: any;
    public carrocerias: any;
    public servicios: any;
    public colores: any;
    public marcas: any;
    public paises: any;
    public combustibles: any;
    public municipioSelected: any;
    public lineaSelected: any;
    public claseSelected: any;
    public paisSelected: any;
    public carroceriaSelected: any;
    public servicioSelected: any;
    public colorSelected: any;
    public marcaSelected: any;
    public sedeOperativaSelected: any;
    public combustibleSelected: any;
    public respuesta: any;
    public organismosTransito: any;

    constructor(
        private _CfgMunicipioService: CfgMunicipioService,
        private _MarcaService: VhloCfgMarcaService,
        private _LineaService: VhloCfgLineaService,
        private _ClaseService: VhloCfgClaseService,
        private _CarroceriaService: VhloCfgCarroceriaService,
        private _ServicioService: VhloCfgServicioService,
        private _ColorService: VhloCfgColorService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _VehiculoService: VehiculoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _CfgPaisService: CfgPaisService,
        private _MsvRegistroIpatService: MsvRegistroIpatService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.vehiculo = new Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);


        this._MarcaService.getMarcaSelect().subscribe(
            response => {
                this.marcas = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._LineaService.select().subscribe(
            response => {
                this.lineas = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CfgMunicipioService.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
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
        this._ClaseService.getClaseSelect().subscribe(
            response => {
                this.clases = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CarroceriaService.getCarroceriaSelect().subscribe(
            response => {
                this.carrocerias = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ServicioService.getServicioSelect().subscribe(
            response => {
                this.servicios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ColorService.select().subscribe(
            response => {
                this.colores = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CombustibleService.getCombustibleSelect().subscribe(
            response => {
                this.combustibles = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CfgPaisService.select().subscribe(
            response => {
                this.paises = response;
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
        this.vehiculo.municipioId = this.municipioSelected;
        this.vehiculo.lineaId = this.lineaSelected;
        this.vehiculo.claseId = this.claseSelected;
        this.vehiculo.carroceriaId = this.carroceriaSelected;
        this.vehiculo.servicioId = this.servicioSelected;
        this.vehiculo.colorId = this.colorSelected;
        this.vehiculo.combustibleId = this.combustibleSelected;
        this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
        this.vehiculo.paisRegistro = this.paisSelected;

        let token = this._loginService.getToken();
        this._VehiculoService.register({ 'vehiculo': this.vehiculo, 'campo': 'importacion-temporal' }, token).subscribe(
            response => {
                this.respuesta = response;
                console.log(this.respuesta);
                if (this.respuesta.status == 'success') {
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
                        text: 'El vehiculo ' + this.vehiculo.placa + ' ya se encuentra registrado',
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

    onBuscarVehiculo() {
        let token = this._loginService.getToken();
        if (this.vehiculo.placa) {
            this._MsvRegistroIpatService.getBuscarVehiculo({ 'placa': this.vehiculo.placa }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.vhl = true;
                        this.paisSelected = [response.data.municipio.departamento.pais.id];
                        this.marcaSelected = [response.data.linea.marca.id];
                        this.lineaSelected = [response.data.linea.id];
                        this.claseSelected = [response.data.clase.id];
                        this.colorSelected = [response.data.color.id];
                        this.vehiculo.modelo = response.data.modelo;
                        this.vehiculo.motor = response.data.motor;
                        this.vehiculo.chasis = response.data.chasis;
                        this.vehiculo.serie = response.data.serie;
                        this.vehiculo.vin = response.data.vin;
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