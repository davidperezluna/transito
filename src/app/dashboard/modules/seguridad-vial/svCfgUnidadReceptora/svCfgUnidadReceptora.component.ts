import { Component, OnInit } from '@angular/core';
import { SvCfgUnidadReceptoraService } from '../../../../services/svCfgUnidadReceptora.service';
import { LoginService } from '../../../../services/login.service';
import { SvCfgUnidadReceptora } from './svCfgUnidadReceptora.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgUnidadReceptora.component.html'
})
export class SvCfgUnidadReceptoraComponent implements OnInit {
    public errorMessage;
    public id;
    public respuesta;
    public unidadesReceptoras;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any;
    public unidadReceptora: SvCfgUnidadReceptora;

    constructor(
        private _UnidadReceptoraService: SvCfgUnidadReceptoraService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading()
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        })
        this._UnidadReceptoraService.index().subscribe(
            response => {
                this.unidadesReceptoras = response.data;
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
        this.table = $('#dataTables-example').DataTable();
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        this.table.destroy();
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
                this._UnidadReceptoraService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: 'Registro eliminado correctamente.',
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
        })
    }

    onEdit(unidadReceptora: any) {
        this.unidadReceptora = unidadReceptora;
        this.formEdit = true;
        this.formIndex = false;
    }
}