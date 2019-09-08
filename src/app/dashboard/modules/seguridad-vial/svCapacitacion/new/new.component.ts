import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCapacitacion } from '../svCapacitacion.modelo';

import { SvCapacitacionService } from '../../../../../services/svCapacitacion.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { SvCfgFuncionService } from '../../../../../services/svCfgFuncion.service';
import { SvCfgFuncionCriterioService } from '../../../../../services/svCfgFuncionCriterio.service';
import { SvCfgTemaCapacitacionService } from '../../../../../services/svCfgTemaCapacitacion.service';
import { SvCfgClaseActorViaService } from '../../../../../services/svCfgClaseActorVia.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { UserCfgGrupoEtnicoService } from '../../../../../services/userCfgGrupoEtnico.service';

import { LoginService } from '../../../../../services/login.service';

import { environment } from 'environments/environment';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new-svcapacitacion',
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
    public docsUrl = environment.docsUrl + 'capacitaciones';
    public capacitaciones: any;

    public file: any = null;
    public fileSelected: File = null;

    public date: any;
    public fecha: any;

    public txt: any[] = null;
    public valido = true;

    public municipios: any;
    public funciones: any;
    public funcionesCriterios: any;
    public temasCapacitaciones: any;
    public clasesActoresVia: any;
    public generos: any;
    public tiposIdentificacion: any;
    public gruposEtnicos: any;

    public municipioSelected: any;
    public funcionSelected: any;
    public funcionCriterioSelected: any;
    public temaCapacitacionSelected: any;
    public claseActorViaSelected: any;
    public generoSelected: any;
    public tipoIdentificacionSelected: any;
    public grupoEtnicoSelected: any;
    public discapacidadSelected: any;
    public victimaSelected: any;
    public comunidadSelected: any;

    public capacitados = [];
    public table: any = null;
    public capacitadosEncontrados = false;

    public discapacidades = [
        { value: '3', label: 'NO REGISTRA' }, 
        { value: '1', label: 'SI' }, 
        { value: '0', label: 'NO' }, 
    ];

    public victimas = [
        { value: '3', label: 'NO REGISTRA' }, 
        { value: '1', label: 'SI' }, 
        { value: '0', label: 'NO' }, 
    ];

    public comunidades = [
        { value: '3', label: 'NO REGISTRA' }, 
        { value: '1', label: 'SI' }, 
        { value: '0', label: 'NO' }, 
    ];

    constructor(
        private _CapacitacionService: SvCapacitacionService,
        private _LoginService: LoginService,
        private _MunicipioService: CfgMunicipioService,
        private _FuncionService: SvCfgFuncionService,
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _TemaCapacitacionService: SvCfgTemaCapacitacionService,
        private _SvCfgClaseActorViaService: SvCfgClaseActorViaService,
        private _GeneroService: UserCfgGeneroService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _GrupoEtnicoService: UserCfgGrupoEtnicoService,

    ) { }

    ngOnInit() {
        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'yyyy/MM/dd HH:mm');

        this.capacitacion = new SvCapacitacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

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
        this._TipoIdentificacionService.select().subscribe(
            response => {
                this.tiposIdentificacion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._GrupoEtnicoService.select().subscribe(
            response => {
                this.gruposEtnicos = response;
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

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        this.capacitacion.municipio = this.municipioSelected;
        this.capacitacion.fechaHoraRegistro = this.fecha;
        this.capacitacion.funcion = this.funcionSelected;
        this.capacitacion.funcionCriterio = this.funcionCriterioSelected;
        this.capacitacion.claseActorVial = this.claseActorViaSelected;
        this.capacitacion.temaCapacitacion = this.temaCapacitacionSelected;
        this.capacitacion.genero = this.generoSelected;
        this.capacitacion.idTipoIdentificacion = this.tipoIdentificacionSelected;
        this.capacitacion.idGrupoEtnico = this.grupoEtnicoSelected;
        this.capacitacion.discapacidad = this.discapacidadSelected;
        this.capacitacion.victima = this.victimaSelected;
        this.capacitacion.comunidad = this.comunidadSelected;

        if (this.capacitacionInput.idTipoIdentificacion == 1) {
            this.capacitacion.identificacion = this.ciudadano.identificacion;
        } else if (this.capacitacionInput.idTipoIdentificacion == 4) {
            this.capacitacion.nit = this.empresa.nit;
        }
        this._CapacitacionService.register(this.file, this.capacitacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    
                    this.tipoIdentificacionSelected = [0];
                    this.capacitacion.numeroCedulaActorVial = '';
                    this.capacitacion.nombreActorVial = '';
                    this.capacitacion.apellidoActorVial = '';
                    this.capacitacion.fechaNacimientoActorVial = '';
                    this.capacitacion.cargoActorVial = '';
                    this.capacitacion.emailActorVial = '';
                    this.capacitacion.telefonoActorVial = '';
                    this.generoSelected = [0];
                    this.grupoEtnicoSelected = [0];
                    this.claseActorViaSelected = [0];
                    this.capacitacion.discapacidad = 0;
                    this.capacitacion.victima = 0;
                    this.capacitacion.comunidad = 0;

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

    onFileChange(event) {
        if(event){
            if (event.target.files.length > 0) {
                this.fileSelected = event.target.files[0];

                if (this.capacitacion.documento != null) {
                    this.file = new FormData();
                    this.file.append('file', this.fileSelected);
                }
            }
        }
    }

    obtenerFuncionCriterioPorFuncion(e) {
        if (e) {
            let token = this._LoginService.getToken();

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

    registrarCapacitado() {
        let dataCapacitados = {
            'número cédula': this.capacitacion.numeroCedulaActorVial,
            'nombre': this.capacitacion.nombreActorVial,
            'apellido': this.capacitacion.apellidoActorVial,
            'clase actor vial': this.claseActorViaSelected,
            'genero': this.generoSelected,
        };
        this.capacitados.push(dataCapacitados);
        console.log(this.capacitados);

        swal({
            title: 'Perfecto!',
            text: 'Persona capacitada agregada con éxito',
            type: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
 
    onFinalizar() {
        swal({
            title: 'Perfecto!',
            text: 'Capacitación terminada con éxito',
            type: 'success',
            confirmButtonText: 'Aceptar'
        });
        this.ready.emit(true);
    } 

    async onUploadFile() {
        let token = this._LoginService.getToken();
        
        const { value: files } = await swal({
            title: 'Seleccione el archivo .csv',
            input: 'file',
            inputAttributes: {
                'accept': 'txt/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (files) {
            this.txt = [];
            let reader: FileReader = new FileReader();
            reader.readAsBinaryString(files);
            reader.onload = (e) => {
                let txt: string = reader.result;
                let allTextLines = txt.split(/\r\n|\n/);
                for (let i = 0; i < allTextLines.length; i++) {
                    let data = allTextLines[i].split(';');
                    if (data.length < 2) {
                        this.valido = false;
                    } else {
                        if (data[0] != '') {
                            this.txt.push(data);
                        }
                    }
                }
            }
        }
        
        this.capacitacion.fechaHoraRegistro = this.fecha;
        this.capacitacion.municipio = this.municipioSelected;
        this.capacitacion.funcion = this.funcionSelected;
        this.capacitacion.funcionCriterio = this.funcionCriterioSelected;
        this.capacitacion.claseActorVial = this.claseActorViaSelected;
        this.capacitacion.temaCapacitacion = this.temaCapacitacionSelected;
        this.capacitacion.genero = this.generoSelected;

        if (this.capacitacionInput.idTipoIdentificacion == 1) {
            this.capacitacion.identificacion = this.ciudadano.identificacion;
        } else if (this.capacitacionInput.idTipoIdentificacion == 4) {
            this.capacitacion.nit = this.empresa.nit;
        }

        this._CapacitacionService.cargarCapacitados({"file": this.txt, "capacitacion":this.capacitacion}, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.capacitaciones = response.data;
                    console.log(this.capacitaciones);
                    this.capacitadosEncontrados = true;
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                }
            }
        );
    }
}


