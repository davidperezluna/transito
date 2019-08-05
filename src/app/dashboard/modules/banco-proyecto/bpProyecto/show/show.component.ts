import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpProyectoService } from '../../../../../services/bpProyecto.service';
import { BpCuentaService } from '../../../../../services/bpCuenta.service';
import { BpActividadService } from '../../../../../services/bpActividad.service';
import { BpCfgTipoInsumoService } from '../../../../../services/bpCfgTipoInsumo.service';
import { BpInsumoService } from '../../../../../services/bpInsumo.service';
import { LoginService } from '../../../../../services/login.service';
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

    public insumos: any = null;
    public actividades: any = null;
    public tiposInsumo: any = null;
    public table: any = null; 
    
    public formIndexCuenta: any;
    public formIndexActividad: any;
    public formIndexInsumo: any;

    public formNewCuenta:any;
    public formNewActividad:any;
    public formNewInsumo:any;
    
    public cuenta: any = null;
    public actividad: any = null;
    public insumo: any = null;

    public datosCuenta = {
        'numero': null,
        'nombre': null,
        'costoTotal': 0,
        'idProyecto': null,
    };
    
    public datosActividad = {
        'nombre': null,
        'costoTotal': 0,
        'idCuenta': null,
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
        private _CuentaService: BpCuentaService,
        private _ActividadService: BpActividadService,
        private _TipoInsumoService: BpCfgTipoInsumoService,
        private _InsumoService: BpInsumoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        
    }

    onCancelar() {
        this.ready.emit(true);
    }

    /* ================== CUENTA ========================== */

    

    

    /* ================== ACTIVIDAD ========================== */
    onSearchActividades(cuenta: any){
        this.formIndexCuenta = false;
        this.formIndexActividad = true;
        this.formIndexInsumo = false;
        this.formNewCuenta = false;
        this.formNewActividad = false;
        this.formNewInsumo = false;

        swal({
            title: 'Buscando actividades registradas!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._CuentaService.show({ 'id': cuenta.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.cuenta = response.data;

                    this._CuentaService.searchActividades({ 'idCuenta': cuenta.id }, token).subscribe(
                        response => {
                            if (response.code = 200) {
                                this.actividades = response.data;
            
                                let timeoutId = setTimeout(() => {
                                    this.onInitTableActividades();
                                }, 100);
            
                                swal.close();
                            } else {
                                swal({
                                    title: 'Atención!',
                                    text: response.message,
                                    type: 'warning',
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

    onNewActividad() {
        this.formIndexCuenta = false;
        this.formIndexActividad = false;
        this.formIndexInsumo = false;
        this.formNewCuenta = false;
        this.formNewActividad = true;
        this.formNewInsumo = false;
    }

    onCancelarActividad() {
        this.formIndexCuenta = true;
        this.formIndexActividad = false;
        this.formIndexInsumo = false;
        this.formNewCuenta = false;
        this.formNewActividad = false;
        this.formNewInsumo = false;
    }

    onRegisterActividad() {
        let token = this._LoginService.getToken();
        
        this.datosActividad.idCuenta = this.cuenta.id;

        this._ActividadService.register(this.datosActividad, token).subscribe(
            response => {
                if (response.code = 200) {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.onSearchActividades(response.data.cuenta);
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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
                let token = this._LoginService.getToken();

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

    onInitTableActividades() {       
        this.table = $('#dataTables-actividades').DataTable({
            destroy: true,
            responsive: true,
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
    /* ================== INSUMO ========================== */
    onSearchInsumo(actividad: any) {
        this.formNewCuenta = false;
        this.formNewActividad = false;
        this.formNewInsumo = false;
        this.formIndexCuenta = false;
        this.formIndexActividad = false;
        this.formIndexInsumo = true;

        swal({
            title: 'Buscando insumos registrados!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._ActividadService.show({ 'id': actividad.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.actividad = response.data;                  

                    this._ActividadService.searchInsumos({ 'idActividad': actividad.id }, token).subscribe(
                        response => {
                            if (response.code = 200) {
                                this.insumos = response.data;
            
                                let timeoutId = setTimeout(() => {
                                    this.onInitTableInsumos();
                                }, 100);
            
                                swal.close();
                            } else {
                                swal({
                                    title: 'Atencion!',
                                    text: response.message,
                                    type: 'warning',
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

    onInitTableInsumos() {       
        this.table = $('#dataTables-insumos').DataTable({
            destroy: true,
            responsive: true,
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
        let token = this._LoginService.getToken();

        this.datosInsumo.idActividad = this.actividad.id;

        this._InsumoService.register(this.datosInsumo, token).subscribe(
            response => {
                if (response.code = 200) {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.onSearchInsumo(response.data.actividad);
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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
                let token = this._LoginService.getToken();

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