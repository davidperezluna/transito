import { Component, OnInit } from '@angular/core';
import { SvCapacitacionService } from '../../services/svCapacitacion.service';
import { UserCiudadanoService } from '../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../services/userCfgTipoIdentificacion.service';
import { SvCapacitacion } from './svCapacitacion.modelo';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svCapacitacion.component.html'
})
export class SvCapacitacionComponent implements OnInit {
    
    public capacitacion: SvCapacitacion;

    public errorMessage;
    public identificacion: any;
    public idTipoIdentificacion: any;
    
    public ciudadano:any = false;
    public empresa:any = false;

    public capacitaciones: any = null;
    public tiposIdentificacion: any;
    public table: any; 
    public formNew = false;
    public formEdit = false;
    public formIndex = true;

    constructor(
        private _CapacitacionService: SvCapacitacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { 
        this.capacitacion = new SvCapacitacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

        this._TipoIdentificacionService.select().subscribe(
            response => {
                this.tiposIdentificacion = response;
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
            this.onSearch();
        }
    }

    onSearch() {
        if (this.table) {
            this.table.destroy();
        }
        swal({
            title: 'Buscando registro',
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


        this._UserCiudadanoService.searchByIdentificacion({ 'nit': this.capacitacion.nit, 'identificacion': this.capacitacion.identificacion, 'idTipoIdentificacion': this.capacitacion.idTipoIdentificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.empresa = false;
                    }
                    if (response.data.empresa) {
                        this.empresa = response.data.empresa;
                        this.ciudadano = false;
                    }
                    
                    if (this.ciudadano) {
                        this._CapacitacionService.buscarCapacitacionByCiudadano({ 'idTipoIdentificacion': this.capacitacion.idTipoIdentificacion, 'identificacion': this.ciudadano.identificacion }, token).subscribe(
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
                        } else if (this.empresa) {
                        this._CapacitacionService.buscarCapacitacionByCiudadano({ 'idTipoIdentificacion': this.capacitacion.idTipoIdentificacion, 'nit': this.empresa.nit }, token).subscribe(
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
                    }
                } else {
                    this.ciudadano = false;
                    this.empresa = false;
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

    edit(capacitacion: any) {
        this.capacitacion = capacitacion;
        this.formEdit = true;
        this.formIndex = false;
    }
}