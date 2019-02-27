import { Component, OnInit } from '@angular/core';
import { SvCapacitacionService } from '../../services/svCapacitacion.service';
import { UserCiudadanoService } from '../../services/userCiudadano.service';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCapacitacion.component.html'
})
export class SvCapacitacionComponent implements OnInit {
    
    public errorMessage;
    public identificacion: any;
    public ciudadano: any = null;
    public capacitaciones: any = null;
    public table: any; 
    public formNew = false;
    public formEdit = false;
    public formIndex = true;

    constructor(
        private _CapacitacionService: SvCapacitacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }

    onNew() { 
        this.formNew = true;
        this.formIndex = false;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onSearch() {
        swal({
            title: 'Buscando número de cédula',
            text: 'Solo tardará unos segundos, por favor espere.',
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

        let token = this._loginService.getToken();


        this._UserCiudadanoService.searchByIdentificacion({ 'identificacion': this.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ciudadano = response.data;
                    
                    this._CapacitacionService.buscarCapacitacionByCiudadano({ 'identificacion': this.ciudadano.identificacion }, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.capacitaciones = response.data;
                                let timeoutId = setTimeout(() => {
                                    this.iniciarTabla();
                                }, 100);
                            } else {
                                swal({
                                    title: 'Alerta!',
                                    text: response.message,
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                            }
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert('Error en la petición');
                                }
                            }
                        }
                    );
                    swal.close();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
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
}