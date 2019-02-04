import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpProyectoService } from '../../../services/bpProyecto.service';
import { BpActividadService } from '../../../services/bpActividad.service';
import { BpCfgTipoInsumoService } from '../../../services/bpCfgTipoInsumo.service';
import { BpInsumoService } from '../../../services/bpInsumo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() proyecto: any = null;
    public errorMessage;
    public actividades: any = null;
    public actividad: any = null;
    public insumos: any = null;
    public tiposInsumo: any = null;
    public table: any = null; 

    public formIndexActividad: any;
    public formIndexInsumo: any;
    public formNewActividad:any;
    public formNewInsumo:any;

    public datos = {
        'nombre': null,
        'costoTotal': 0,
        'idProyecto': null,
    };

    public datosInsumo = {
        'nombre': null,
        'unidadMedida': null,
        'cantidad': null,
        'valorUnitario': null,
        'valorTotal': null,
        'idActividad': null,
        'idTipoInsumo': null,
    };

    constructor(
        private _ProyectoService: BpProyectoService,
        private _ActividadService: BpActividadService,
        private _TipoInsumoService: BpCfgTipoInsumoService,
        private _InsumoService: BpInsumoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.formIndexActividad = true;
        this.formNewActividad = false;
        this.formNewInsumo = false;

        swal({
            title: 'Buscando actividades!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

        this._ProyectoService.searchActividades({ 'idProyecto': this.proyecto.id }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.actividades = response.data;

                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
                    }, 100);

                    swal.close();
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

    iniciarTabla() {       
        this.table = $('#dataTables-example').DataTable({
            destroy: true,
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
    }

    onCancelar() {
        this.ready.emit(true);
    }

    /* ================== ACTIVIDAD ========================== */
    onNewActividad() {
        this.formNewActividad = true;
        this.formNewInsumo = false;
        this.formIndexActividad = false;
    }

    onCancelarActividad() {
        this.formNewActividad = false;
        this.formNewInsumo = false;
        this.formIndexActividad = true;
    }

    onCalcularTotalActividad() {
        
    }

    onRegisterActividad() {
        let token = this._loginService.getToken();
        
        this.datos.idProyecto = this.proyecto.id;

        this._ActividadService.register(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.ngOnInit();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }

                this.ready.emit(true);
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

    onDeleteActividad(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();

                this._ActividadService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.table.destroy();

                        this.ngOnInit();
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
        });
    }


    /* ================== INSUMO ========================== */
    onIndexInsumo(actividad: any) {
        this.actividad = actividad;
        this.formNewInsumo = false;
        this.formNewActividad = false;
        this.formIndexActividad = false;
        this.formIndexInsumo = true;

        swal({
            title: 'Buscando insumos!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

        this._ActividadService.searchInsumos({ 'idActividad': this.actividad.id }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.insumos = response.data;

                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
                    }, 100);

                    swal.close();
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

    onNewInsumo(actividad: any) {
        this.actividad = actividad;
        this.formNewInsumo = true;
        this.formNewActividad = false;
        this.formIndexActividad = false;
        this.formIndexInsumo = false;

        this._TipoInsumoService.select().subscribe(
            response => {
                this.tiposInsumo = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
    }

    onCancelarInsumo() {
        this.formNewActividad = false;
        this.formNewInsumo = false;
        this.formIndexActividad = true;
    }

    onCalcularTotalInsumo() {
        let cantidad, valor;
        cantidad = this.datosInsumo.cantidad;
        valor = this.datosInsumo.valorUnitario;

        if (cantidad == 0 || valor == 0) {
            swal({
                title: 'Alerta!',
                text: 'La cantidad y/o el valor unitario no pueden estar en 0',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.datosInsumo.valorTotal = 0;
        } else {
            this.datosInsumo.valorTotal = cantidad * valor;
        }
    }

    onRegisterInsumo() {
        let token = this._loginService.getToken();

        this.datosInsumo.idActividad = this.actividad.id;

        this._InsumoService.register(this.datosInsumo, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.ngOnInit();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }

                this.ready.emit(true);
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

    onDeleteInsumo(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();

                this._InsumoService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.table.destroy();

                        this.ngOnInit();
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
        });
    }
}