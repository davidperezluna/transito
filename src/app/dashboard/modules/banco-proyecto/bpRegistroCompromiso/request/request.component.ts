import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpRegistroCompromisoService } from '../../../../../services/bpRegistroCompromiso.service';
import { BpCdpService } from '../../../../../services/bpCdp.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-request-registrocompromiso',
    templateUrl: './request.component.html'
})

export class RequestCompromisoComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;

    public apiUrl = environment.apiUrl;
    
    public numero: any;
    public cdp: any = null;
    public ciudadano: any = null;
    public empresa: any = null;
    public solicitudes: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any = null;
    public identificacion: any;

    public formIndex: any;
    public formSearch: any;
    public formNew: any;

    public table: any;

    public datos = {
        'fecha': null,
        'valor': null,
        'concepto': null,
        'cuentaNumero': null,
        'cuentaTipo': null,
        'bancoNombre': null,
        'idCdp': null,
        'idCiudadano': null,
        'idEmpresa': null,
    };

    public tiposCuenta = [
        { 'value': 'AHORROS', 'label': 'AHORROS' },
        { 'value': 'CORRIENTE', 'label': 'CORRIENTE' },
    ];

    constructor(
        private _CdpService: BpCdpService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _RegistroCompromisoService: BpRegistroCompromisoService,
        private _LoginService: LoginService,
    ){}

    ngOnInit() {
        this.onInitForms();

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        this._RegistroCompromisoService.index().subscribe(
            response => {
                this.solicitudes = response.data;
                let timeoutId = setTimeout(() => {
                    this.onInitTable();
                    swal.close();
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

        this._TipoIdentificacionService.select().subscribe(
            response => {
                this.tiposIdentificacion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this.formIndex = true;
    }

    onInitForms(){
        this.formIndex = false;
        this.formSearch = false;
        this.formNew = false;
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
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

    onNew() {
        this.onInitForms();
        this.formSearch = true;
    }

    searchCdp() {
        swal({
            title: 'Buscando proyecto!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._CdpService.searchByNumero({ 'numero': this.numero }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.formNew = true;
                    this.cdp = response.data;

                    swal.close();
                }else{
                    swal({
                        title: 'Atención!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });

                    this.formNew = false;
                    this.cdp = null;
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

    onCancelar(){
        this.ngOnInit();
    }

    onSearchCiudadano() {
        swal({
            title: 'Buscando beneficiario!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        if (!this.identificacion) {
            swal({
                title: 'Error!',
                text: 'El número de identificación no puede estar vacia.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            let token = this._LoginService.getToken();

            let datos = {
                'idTipoIdentificacion': this.tipoIdentificacionSelected,
                'identificacion': this.identificacion,
            }

            this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        if (response.data.ciudadano) {
                            this.ciudadano = response.data.ciudadano;
                            this.datos.idCiudadano = this.ciudadano.id;
                            this.empresa = null;
                            this.datos.idEmpresa = this.empresa;
                            
                            swal({
                                title: 'Perfecto!',
                                text: response.message,
                                type: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                        } else if (response.data.empresa) {
                            this.empresa = response.data.empresa;
                            this.ciudadano = null;

                            swal({
                                title: 'Error!',
                                text: response.message,
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    } else {
                        this.ciudadano = null;
                        this.datos.idCiudadano = this.ciudadano;
                        this.empresa = null;
                        this.datos.idEmpresa = this.empresa;
                        
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
                            alert('Error en la petición');
                        }
                    }
                }
            );
        }
    }
    
    onEnviar(){
        let token = this._LoginService.getToken();

        this.datos.idCdp = this.cdp.id;
        
        this._RegistroCompromisoService.request(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.ngOnInit();
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
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

}