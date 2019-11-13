import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCaracterizacion } from '../svCaracterizacion.modelo';
import { SvCaracterizacionService } from '../../../../../services/svCaracterizacion.service';
import { CfgMunicipioService } from "../../../../../services/cfgMunicipio.service";
import { UserLcCfgCategoriaService } from "../../../../../services/userLcCfgCategoria.service";
import { UserCfgGeneroService } from "../../../../../services/userCfgGenero.service";
import { UserCfgGrupoSanguineoService } from "../../../../../services/userCfgGrupoSanguineo.service";
import { VhloCfgTipoVehiculoService } from 'app/services/vhloCfgTipoVehiculo.service';
import { VhloCfgLineaService } from 'app/services/vhloCfgLinea.service';
import { VhloCfgMarcaService } from 'app/services/vhloCfgMarca.service';
import { VhloCfgColorService } from 'app/services/vhloCfgColor.service';

import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcaracterizacion',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public msvCaracterizacion: SvCaracterizacion;
    public errorMessage;

    public date: any;
    public municipios: any;
    public categoriasLicenciaConduccion: any;
    public generos: any;
    public gruposSanguineos: any;
    public tiposVehiculo: any;
    public lineas: any;
    public marcas: any;
    public colores: any;

    public mostrarOtroFactorRiesgo = false;
    public mostrarOtraCausaRiesgo = false;

    public empresaEncontrada = false;
    public empresa: any;
    public representante: any;
    public edad: any;
    public cont = 0;

    public arrayFactoresRiesgo = [
        { value: 'ESTADO INFRAESTRUCTURA', label: 'ESTADO INFRAESTRUCTURA'},
        { value: 'ORGANIZACIÓN TRABAJO', label: 'ORGANIZACIÓN TRABAJO'},
        { value: 'PROPIA CONDUCCIÓN', label: 'PROPIA CONDUCCIÓN'},
        { value: 'OTRO', label: 'OTRO'},
    ];

    public arrayCausasRiesgo = [
        { value: 'INTENSIDAD DE TRÁFICO', label: 'INTENSIDAD DE TRÁFICO' },
        { value: 'CONDICIÓN CLIMATOLÓGICA', label: 'CONDICIÓN CLIMATOLÓGICA' },
        { value: 'TIPO VEHÍCULO', label: 'TIPO VEHÍCULO' },
        { value: 'ORGANIZACIÓN DE TRABAJO', label: 'ORGANIZACIÓN DE TRABAJO' },
        { value: 'PROPIA CONDUCCIÓN', label: 'PROPIA CONDUCCIÓN' },
        { value: 'ESTADO', label: 'ESTADO' },
        { value: 'OTRO CONDUCTOR', label: 'OTRO CONDUCTOR' },
        { value: 'ESTADO INFRAESTRUCTURA', label: 'ESTADO INFRAESTRUCTURA' },
        { value: 'FALTA INFORMACIÓN', label: 'FALTA INFORMACIÓN' },
        { value: 'OTRA', label: 'OTRA' },
    ];

    public arrayEquipoPrevencion = [
        { value: 'GATO', label: 'GATO' },
        { value: 'UNA CRUCETA', label: 'UNA CRUCETA' },
        { value: 'SEÑALES DE CARRETERA', label: 'SEÑALES DE CARRETERA' },
        { value: 'BOTIQUIN', label: 'BOTIQUIN' },
        { value: 'EXTINTOR', label: 'EXTINTOR' },
        { value: 'TACOS', label: 'TACOS' },
        { value: 'HERRAMIENTAS', label: 'HERRAMIENTAS' },
        { value: 'LLANTA DE REPUESTO', label: 'LLANTA DE REPUESTO' },
        { value: 'LINTERNA', label: 'LINTERNA' },
        { value: 'CHALECO REFLECTIVO', label: 'CHALECO REFLECTIVO' }
    ];

    public arrayNivelesEducativos = [
        { value: 'BACHILLER', label: 'BACHILLER' },
        { value: 'TÉCNICO', label: 'TÉCNICO' },
        { value: 'PROFESIONAL', label: 'PROFESIONAL' },
    ];

    public datos = {
        'id': null,
        'fechaServicio': null,
        'actividadRealizada': null,
        'problemasPresentados': null,
        'nombreRepuestoCambiado': null,
        'responsableMantenimiento': null,
        'precio': null
    }   

    constructor(
        private _MsvCaracterizacionService: SvCaracterizacionService,
        private _LoginService: LoginService,
        private _MunicipioService: CfgMunicipioService,
        private _CfgLicenciaConduccionCategoriaService: UserLcCfgCategoriaService,
        private _GeneroService: UserCfgGeneroService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _LineaService: VhloCfgLineaService,
        private _MarcaService: VhloCfgMarcaService,
        private _ColorService: VhloCfgColorService,
        private _GrupoSanguineoService: UserCfgGrupoSanguineoService,

    ) { }

    ngOnInit() {
        this.msvCaracterizacion = new SvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, [], null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.date = new Date;
        var datePiper = new DatePipe(this.date);
        this.msvCaracterizacion.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        this._MunicipioService.select().subscribe(
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
        this._CfgLicenciaConduccionCategoriaService.select().subscribe(
            response => {
                this.categoriasLicenciaConduccion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._GeneroService.select().subscribe(
            response => {
                this.generos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._GrupoSanguineoService.select().subscribe(
            response => {
                this.gruposSanguineos = response;
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
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._MarcaService.select().subscribe(
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
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this._MsvCaracterizacionService.register(this.msvCaracterizacion, token).subscribe(
            response => {
                if (response.code == 200) {
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

            });
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._MsvCaracterizacionService.getBuscarEmpresa({ 'nit': this.msvCaracterizacion.nit }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaEncontrada = true;
                    this.empresa = response.data;
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

    onAddMantenimiento() {
        this.cont ++;
        this.datos.id = this.cont;

        //Agrega el trámite seleccionado al arreglo
        this.onCreateArray();
    }

    onCreateArray() {

        this.msvCaracterizacion.arrayRelacionMantenimiento.push(
            {
                'id': this.cont,
                'fechaServicio': this.datos.fechaServicio,
                'actividadRealizada': this.datos.actividadRealizada,
                'problemasPresentados': this.datos.problemasPresentados,
                'nombreRepuestoCambiado': this.datos.nombreRepuestoCambiado,
                'responsableMantenimiento': this.datos.responsableMantenimiento,
                'precio': this.datos.precio
            }
        );

        this.datos.fechaServicio = '';
        this.datos.actividadRealizada = '';
        this.datos.problemasPresentados = '';
        this.datos.nombreRepuestoCambiado = '';
        this.datos.responsableMantenimiento = '';
        this.datos.precio = '';
    }

    onDeleteMantenimiento(mantenimiento) {
        this.cont--;
        this.msvCaracterizacion.arrayRelacionMantenimiento = this.msvCaracterizacion.arrayRelacionMantenimiento.filter(h => h !== mantenimiento);
    }

    onChangedMarca(e) {
        if (e) {
            
            let token = this._LoginService.getToken()
            this._LineaService.selectByMarca({'idMarca': e}, token).subscribe(
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
        }
    }
    
    onChangedFactorRiesgo(e) {
        if (e) {
            if (e.includes('OTRO')) {
                this.mostrarOtroFactorRiesgo = true;
            } else {
                this.mostrarOtroFactorRiesgo = false;
            }
        }
    }
    
    onChangedCausaRiesgo(e) {
        if (e) {
            if (e.includes('OTRA')) {
                this.mostrarOtraCausaRiesgo = true;
            } else {
                this.mostrarOtraCausaRiesgo = false;
            }
        }
    }

}
