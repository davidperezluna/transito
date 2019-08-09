import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpCdp } from '../bpCdp.modelo';
import { BpCdpService } from '../../../../../services/bpCdp.service';
import { BpProyectoService } from '../../../../../services/bpProyecto.service';
import { BpActividadService } from '../../../../../services/bpActividad.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-request-cdp',
  templateUrl: './request.component.html'
})

export class RequestComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public cdp: BpCdp;
    public errorMessage;
    
    public numeroProyecto: any;
    public proyecto: any;
    public actividades: any;
    public solicitudes: any;
    public formIndex: any;
    public formSearch: any;
    public table: any;

    public datos = {
        'idActividad': null
    };

    public search = {
        'tipoFiltro': null,
        'filtro': null
    }

constructor(
  private _CdpService: BpCdpService,
  private _ProyectoService: BpProyectoService,
  private _ActividadService: BpActividadService,
  private _loginService: LoginService,
  ){}

    ngOnInit() {
        this.cdp = new BpCdp(null, null, null, null, null, null);

        this.numeroProyecto = null;
        this.proyecto = null;
        this.actividades = null;
        this.formIndex = true;
        this.formSearch = false;

        this._CdpService.index().subscribe(
            response => {
                this.solicitudes = response.data;
                let timeoutId = setTimeout(() => {
                    this.onInitTable();
                }, 100);

                swal.close();
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
        $('#dataTables-example').DataTable({
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
        this.table = $('#dataTables-example').DataTable();
    }

    onNew() {
        this.formSearch = true;
        this.formIndex = false;
        this.table.destroy();
    }

    searchProyecto() {
        swal({
            title: 'Buscando proyecto!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

        this.search.tipoFiltro = 1;
        this.search.filtro = this.numeroProyecto;

        this._ProyectoService.searchByFilter(this.search, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.proyecto = response.data;

                    this._ActividadService.select({ 'idProyecto': this.proyecto.id }, token).subscribe(
                        response => {
                                this.actividades = response;
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }

                        }
                    );

                    swal.close();
                }else{
                    swal({
                        title: 'Sin actividades!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });

                    this.proyecto = null;
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
        this.ready.emit(true);
    }
    
    onEnviar(){
        let token = this._loginService.getToken();
        
        this._CdpService.request(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
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