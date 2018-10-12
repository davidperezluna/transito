import { Component, OnInit } from '@angular/core';
import { SvCfgClaseChoqueService } from '../../services/svCfgClaseChoque.service';
import { LoginService } from '../../services/login.service';
import { SvCfgClaseChoque } from './svCfgClaseChoque.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCfgClaseChoque.component.html'
})
export class SvCfgClaseChoqueComponent implements OnInit {
    public errorMessage;
    public table: any;
    public clasesChoque;
    public respuesta;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public claseChoque: SvCfgClaseChoque;

    constructor(
        private _ClaseChoqueService: SvCfgClaseChoqueService,
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
        this._ClaseChoqueService.index().subscribe(
            response => {
                this.clasesChoque = response.data;
                console.log(this.clasesChoque);
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

                this._ClaseChoqueService.delete({ 'id': id }, token).subscribe(
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
    editClaseChoque(claseChoque: any) {
        this.claseChoque = claseChoque;
        this.formEdit = true;
        this.formIndex = false;
    }
}
