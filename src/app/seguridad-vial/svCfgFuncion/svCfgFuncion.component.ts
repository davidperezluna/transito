import { Component, OnInit } from '@angular/core';
import { SvCfgFuncionService } from '../../services/svCfgFuncion.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgFuncion } from './svCfgFuncion.modelo';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgFuncion.component.html'
})
export class SvCfgFuncionComponent implements OnInit {
    public errorMessage;
    public table: any;
    public funciones;
    public respuesta;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public funcion = SvCfgFuncion;

    constructor(
        private _SvCfgFuncionService: SvCfgFuncionService,
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
        });
        this._SvCfgFuncionService.index().subscribe(
            response => {
                this.funciones = response.data;
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
                let token = this._loginService.getToken();

                this._SvCfgFuncionService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
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
    onEdit(funcion: any) {
        this.funcion = funcion;
        this.formEdit = true;
        this.formIndex = false;
    }
}
