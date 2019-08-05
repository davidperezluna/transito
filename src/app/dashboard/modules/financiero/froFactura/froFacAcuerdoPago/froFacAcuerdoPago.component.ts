import { Component, OnInit } from '@angular/core';
import { FroAcuerdoPagoService } from '../../../../../services/froAcuerdoPago.service';
import { FroFacturaService } from '../../../../../services/froFactura.service';
import { LoginService } from '../../../../../services/login.service';
import { FroFacAcuerdoPago } from './froFacAcuerdoPago.modelo';
import swal from 'sweetalert2';
declare var $: any;
import { environment } from 'environments/environment'

@Component({
    selector: 'app-index',
    templateUrl: './froFacAcuerdoPago.component.html'
})

export class FroFacAcuerdoPagoComponent implements OnInit {
    public errorMessage;
    public factura: FroFacAcuerdoPago;
    public valorTotal: any;
    public acuerdosPago: any = null;
    public amortizaciones: any = null;
    public acuerdoPago: any = null;
    public numeroIdentificacion: any;
    public organismosTransito: any;

    public formIndex: any;
    public formShow: any;
    public formNew: any;
    public formSearch: any;

    public table: any = null;
    public municipio: any = null;
    public fechaCreacion: any = null;
    public fechaVencimiento: any = null;
    public facturaNumero: any = null;

    public apiUrl = environment.apiUrl + 'financiero';

    public search: any = {
        'tipoFiltro': null,
        'filtro': null,
    }

    public tiposFiltro = [
        { 'value': '1', 'label': 'No. acuerdo de pago' },
        { 'value': '2', 'label': 'Identificación' },
        { 'value': '3', 'label': 'No. comparendo' },
    ];

    constructor(
        private _AcuerdoPagoService: FroAcuerdoPagoService,
        private _FacturaService: FroFacturaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        this.onInitForms();
        
        this.formSearch = true;
    }

    onInitForms(){
        this.formIndex = false;
        this.formShow = false;
        this.formNew = false;
        this.formSearch = false;
    }

    onSearch() {
        swal({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        this.onInitForms();
        
        this.formSearch = true;

        let token = this._LoginService.getToken();

        this._AcuerdoPagoService.searchByFiltros(this.search, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.acuerdosPago = response.data;
                    this.formIndex = true;

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                } else {
                    this.acuerdosPago = null;
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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

    onShow(acuerdoPago) {
        swal({
            title: 'Cargando información!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        this.onInitForms();
        
        this.formSearch = true;

        let token = this._LoginService.getToken();

        this._AcuerdoPagoService.show(acuerdoPago, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.amortizaciones = response.data.amortizaciones;
                    this.acuerdoPago = response.data.acuerdoPago;
                    this.formShow = true;

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                } else {
                    this.amortizaciones = null;
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
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

    onInitTable() {
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

    onCancelar() {
        this.formNew = false;
        this.formIndex = false;
        this.formShow = false;
        this.formSearch = true;
        this.ngOnInit();
    }

    onEnviar(idAmortizacion) {
        this.factura = new FroFacAcuerdoPago(null, null, null, null, null);

        let token = this._LoginService.getToken();
        //Tipo de recaudo acuerdo de pago
        this.factura.idTipoRecaudo = 3;
        this.factura.idAmortizacion = idAmortizacion;

        this._FacturaService.registerByAmortizacion(this.factura, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.onShow(this.acuerdoPago);

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
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
}