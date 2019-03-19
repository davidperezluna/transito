import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCapacitacion } from '../svCapacitacion.modelo';
import { SvCapacitacionService } from '../../../services/svCapacitacion.service';
import { LoginService } from '../../../services/login.service';

import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';

import swal from 'sweetalert2';
import { SvCfgFuncionService } from '../../../services/svCfgFuncion.service';
import { SvCfgFuncionCriterioService } from '../../../services/svCfgFuncionCriterio.service';
import { SvCfgTemaCapacitacionService } from '../../../services/svCfgTemaCapacitacion.service';
import { SvCfgClaseActorViaService } from '../../../services/svCfgClaseActorVia.service';

import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() ciudadano: any = null;
    @Input() empresa: any = null;
    @Input() capacitacionInput: any = null;
    public capacitacion: SvCapacitacion;
    public errorMessage;
    public capacitaciones: any;
    
    public file: any = null;
    public fileSelected: File = null;

    public date: any;
    public fecha: any;

    public municipios: any;
    public funciones: any;
    public funcionesCriterios: any;
    public temasCapacitaciones: any;
    public clasesActoresVia: any;

    public municipioSelected: any;
    public funcionSelected: any;
    public funcionCriterioSelected: any;
    public temaCapacitacionSelected: any;
    public claseActorViaSelected: any;

    constructor(
        private _CapacitacionService: SvCapacitacionService,
        private _loginService: LoginService,
        private _MunicipioService: CfgMunicipioService,
        private _FuncionService: SvCfgFuncionService,
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _TemaCapacitacionService: SvCfgTemaCapacitacionService,
        private _SvCfgClaseActorViaService: SvCfgClaseActorViaService,

    ) { }

    ngOnInit() {
        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'yyyy-MM-dd HH:mm:ss a');

        this.capacitacion = new SvCapacitacion(null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, null, null, null, null, null);
        
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
        this._FuncionService.getFuncionSelect().subscribe(
            response => {
                this.funciones = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._TemaCapacitacionService.getTemaCapacitacionSelect().subscribe(
            response => {
                this.temasCapacitaciones = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        
        this._SvCfgClaseActorViaService.getClaseActorViaSelect().subscribe(
            response => {
                this.clasesActoresVia = response;
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
        let token = this._loginService.getToken();
        this.capacitacion.municipio = this.municipioSelected;
        this.capacitacion.fechaHoraRegistro = this.fecha;
        this.capacitacion.funcion = this.funcionSelected;
        this.capacitacion.funcionCriterio = this.funcionCriterioSelected;
        this.capacitacion.claseActorVial = this.claseActorViaSelected;
        this.capacitacion.temaCapacitacion = this.temaCapacitacionSelected;

        if (this.capacitacionInput.idTipoIdentificacion == 1) {
            this.capacitacion.identificacion = this.ciudadano.identificacion;
        } else if (this.capacitacionInput.idTipoIdentificacion == 4) {
            this.capacitacion.nit = this.empresa.nit;
        }
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
                this._CapacitacionService.register(this.file, this.capacitacion, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            this.ready.emit(true);
                            swal({
                                title: 'Perfecto!',
                                text: response.message,
                                type: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        } else {
                            swal({
                                title: 'Error!',
                                text: response.message,
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                            });
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

    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.fileSelected = event.target.files[0];

            if (this.capacitacion.documento != null) {
                this.file = new FormData();
                this.file.append('file', this.fileSelected);
            }
        }
    }

    obtenerFuncionCriterioPorFuncion(e) {
        if (e) {
            let token = this._loginService.getToken();

            swal({
                title: 'Cargando Clases de Actividades!',
                text: 'Solo tardará unos segundos, por favor espere.',
                timer: 1000,
                onOpen: () => {
                    swal.showLoading();
                }
            }).then((result) => {
                if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.timer
                ) {
                }
            });
            this._FuncionCriterioService.getFuncionCriterioPorFuncionSelect({ 'idFuncionCriterio': e }, token).subscribe(
                response => {
                    this.funcionesCriterios = response;
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
}


