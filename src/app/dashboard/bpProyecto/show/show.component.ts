import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BpProyectoService } from '../../../services/bpProyecto.service';
import { BpActividadService } from '../../../services/bpActividad.service';
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
    public table: any = null; 

    public formIndex: any;
    public formNew:any;

    public datos = {
        'nombre': null,
        'unidadMedida': null,
        'cantidad': null,
        'costoUnitario': null,
        'costoTotal': null,
        'idProyecto': null,
    };

    constructor(
        private _ProyectoService: BpProyectoService,
        private _ActividadService: BpActividadService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.formIndex = true;
        this.formNew = false;

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
        if (this.table) {
            this.table.destroy();
        }
        
        this.table = $('#dataTables-example').DataTable({
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

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onCalcularTotal() {
        let cantidad, valor;
        cantidad = this.datos.cantidad;
        valor = this.datos.costoUnitario;

        if (cantidad == 0 || valor == 0) {
            swal({
                title: 'Alerta!',
                text: 'La cantidad y/o el valor unitario no pueden estar en 0',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.datos.costoTotal = 0;
        } else {
            this.datos.costoTotal = cantidad * valor;
        }
    }

    onRegister() {
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
}