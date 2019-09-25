import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { CvCdoCfgEstadoService } from '../../../../../services/cvCdoCfgEstado.service';
import { CfgOrganismoTransitoService } from "../../../../../services/cfgOrganismoTransito.service";
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Utils } from 'ng2-bootstrap';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './export.component.html',
    providers: [DatePipe]
})

export class ExportInventarioComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any = null;

    public agentes;
    public agenteSelected;
    public tipoComparendos;
    public sedes;
    public sedeSelected;

    public nombreSedeOperativa;
    public comparendos: any;

    public date: any;
    public fecha: any;

    public resumen = {}; 
    
    public datos = {
        'fechaDesde': null,
        'fechaHasta': null,
        'agenteId': null,
        'sedeOperativaId': null,
    };

    constructor(
        private _loginService: LoginService,
        private _PnalFuncionarioService: PnalFuncionarioService,
        private _CvCdoCfgEstadoService: CvCdoCfgEstadoService,
        private _ComparendoService: CvCdoComparendoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
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

        this._PnalFuncionarioService.selectAgentes().subscribe(
            response => {
                this.agentes = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.sedes = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._CvCdoCfgEstadoService.select().subscribe(
            response => {
                this.tipoComparendos = response;
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
        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        $('#dataTables-example').DataTable({
            title:"asdddddd",
            messageTop: "xczxczcxzc",
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: 'Excel',
                    title: 'Reporte Comparendos ' + this.nombreSedeOperativa,
                    filename: 'Acta_Entrega_Comparendos' + this.fecha,
                },
                {   
                    title: 'Reporte Comparendos ' + this.nombreSedeOperativa,
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    filename: 'Acta_Entrega_ComparendosPDF_' + this.fecha,
                }
            ],
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

    onEnviar(){
        let token = this._loginService.getToken();

        this.datos.agenteId = this.agenteSelected;
        this.datos.sedeOperativaId = this.sedeSelected;

        this._ComparendoService.searchByAgente(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.comparendos = [response.data];
                    this.nombreSedeOperativa = response.nombreSedeOperativa;
                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
                    }, 100);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
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