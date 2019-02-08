import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Vehiculo } from '../../../../vehiculo/vehiculo.modelo';
import { DepartamentoService } from "../../../../../services/departamento.service";
import { LoginService } from '../../../../../services/login.service';
import { MunicipioService } from '../../../../../services/municipio.service';
import { LineaService } from '../../../../../services/linea.service';
import { ClaseService } from '../../../../../services/clase.service';
import { CarroceriaService } from '../../../../../services/carroceria.service';
import { ServicioService } from '../../../../../services/servicio.service';
import { ColorService } from '../../../../../services/color.service';
import { CombustibleService } from '../../../../../services/combustible.service';
import { VehiculoService } from '../../../../../services/vehiculo.service';
import { SedeOperativaService } from '../../../../../services/sedeOperativa.service';
import { MarcaService } from '../../../../../services/marca.service';
import { PaisService } from "../../../../../services/pais.service";
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
    public sedesOperativas: any;

    constructor(
        private _departamentoService: DepartamentoService,
        private _loginService: LoginService,
        private _MunicipioService: MunicipioService,
        private _MarcaService: MarcaService,
        private _LineaService: LineaService,
        private _ClaseService: ClaseService,
        private _CarroceriaService: CarroceriaService,
        private _ServicioService: ServicioService,
        private _ColorService: ColorService,
        private _CombustibleService: CombustibleService,
        private _VehiculoService: VehiculoService,
        private _SedeOperativaService: SedeOperativaService,
        private _PaisService: PaisService,
        private _MsvRegistroIpatService: MsvRegistroIpatService,
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
        this._MunicipioService.getMunicipioSelect().subscribe(
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
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
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
        this._PaisService.select().subscribe(
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
        this._VehiculoService.register({'vehiculo': this.vehiculo, 'campo': 'importacion-temporal'}, token).subscribe(
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