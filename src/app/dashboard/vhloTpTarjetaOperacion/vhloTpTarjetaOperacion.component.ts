import { Component, OnInit } from '@angular/core';
import { VhloTpTarjetaOperacionService } from '../../services/vhloTpTarjetaOperacion.service';
import { LoginService } from '../../services/login.service';
import { VhloTpTarjetaOperacion } from './vhloTpTarjetaOperacion.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloTpTarjetaOperacion.component.html'
})
export class VhloTpTarjetaOperacionComponent implements OnInit {
    public errorMessage;
    public table: any;

    public tarjetaOperacion: VhloTpTarjetaOperacion;

    public tarjetasOperacion;

    public formNew = false;
    public formEdit = false;
    public formIndex = true;

    constructor(
        private _VhloTpTarjetaOperacionService: VhloTpTarjetaOperacionService,
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
        this._VhloTpTarjetaOperacionService.index().subscribe(
            response => {
                this.tarjetasOperacion = response.data;
                let timeoutId = setTimeout(() => {
                    this.onInitTable();
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

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 6,
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

                this._VhloTpTarjetaOperacionService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
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
    onEdit(tarjetaOperacion: any) {
        this.tarjetaOperacion = tarjetaOperacion;
        this.formEdit = true;
        this.formIndex = false;
    }
}
