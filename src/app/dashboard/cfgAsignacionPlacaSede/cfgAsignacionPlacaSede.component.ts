import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CfgAsignacionPlacaSedeService } from '../../services/cfgAsignacionPlacaSede.service';
import { LoginService } from '../../services/login.service';
import { CfgAsignacionPlacaSede } from './cfgAsignacionPlacaSede.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './cfgAsignacionPlacaSede.component.html'
})
export class CfgAsignacionPlacaSedeComponent implements OnInit {
    public errorMessage;
    public id;
    public respuesta;
    public asignaciones;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any;
    public asignacion: CfgAsignacionPlacaSede;

    constructor(
        private _AsignacionService: CfgAsignacionPlacaSedeService,
        private _LoginService: LoginService,
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
        });

        this._AsignacionService.index().subscribe(
            response => {
                this.asignaciones = response.data;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);
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
        this.table = $('#dataTables-example').DataTable({
            retrieve: true
        });
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onDelete(id: any) {
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
                let token = this._LoginService.getToken();
                this._AsignacionService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: 'Registro eliminado correctamente.',
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        });
                        this.table.destroy();
                        this.respuesta = response;
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
    editAsignacion(asignacion: any) {
        this.asignacion = asignacion;
        this.formEdit = true;
        this.formIndex = false;
    }
}
