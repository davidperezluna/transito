import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgTipoVehiculoService } from '../../../../services/vhloCfgTipoVehiculo.service';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgTipoVehiculo } from './vhloCfgTipoVehiculo.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloCfgTipoVehiculo.component.html'
})
export class VhloCfgTipoVehiculoComponent implements OnInit {
    public errorMessage;
    public id;
    public estados;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any;
    public tipo: VhloCfgTipoVehiculo;


    constructor(
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading();
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        })
        this._TipoVehiculoService.index().subscribe(
            response => {
                this.estados = response.data;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
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
    iniciarTabla() {
        $('#dataTables-example').DataTable({
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
        this.table = $('#dataTables-example').DataTable();
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy(); }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }
    deleteTipoVehiculo(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminará este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();
                this._TipoVehiculoService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: 'Registro eliminado correctamente.',
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
        })
    }

    onEdit(tipo: any) {
        this.tipo = tipo;
        this.formEdit = true;
        this.formIndex = false;
    }
    deleteTipo(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminará este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();
                this._TipoVehiculoService.delete(token, id).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: 'Registro eliminado correctamente.',
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        });
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
