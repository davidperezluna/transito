import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpCdp } from '../bpCdp.modelo';
import { BpCdpService } from '../../../../../services/bpCdp.service';
import { BpProyectoService } from '../../../../../services/bpProyecto.service';
import { BpActividadService } from '../../../../../services/bpActividad.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-request-cdp',
  templateUrl: './request.component.html'
})

export class RequestCdpComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public cdp: BpCdp;
    public errorMessage;

    public apiUrl = environment.apiUrl;
    
    public numeroProyecto: any;
    public proyecto: any = null;
    public actividades: any;
    public solicitudes: any;

    public formIndex: any;
    public formSearch: any;
    public formNew: any;

    public table: any;

    public datos = {
        'fecha': null,
        'valor': null,
        'concepto': null,
        'idActividad': null
    };

constructor(
  private _CdpService: BpCdpService,
  private _ProyectoService: BpProyectoService,
  private _ActividadService: BpActividadService,
  private _loginService: LoginService,
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

        this.cdp = new BpCdp(null, null, null, null, null, null);

        this._CdpService.index().subscribe(
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

    searchProyecto() {
        swal({
            title: 'Buscando proyecto!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

        this._ProyectoService.searchByNumero({ 'numero': this.numeroProyecto }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.proyecto = response.data;

                    this._ActividadService.select({ 'idProyecto': this.proyecto.id }, token).subscribe(
                        response => {
                            this.formNew = true;
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
        this.ngOnInit();
    }
    
    onEnviar(){
        let token = this._loginService.getToken();
        
        this._CdpService.request(this.datos, token).subscribe(
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