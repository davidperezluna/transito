import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLcProhibicionService } from '../../../../../services/userLcProhibicion.service';
import { LoginService } from '../../../../../services/login.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { CfgEntidadJudicialService } from '../../../../../services/cfgEntidadJudicial.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-newProhibicion',
    templateUrl: './newProhibicion.component.html'
})
export class newProhibicionComponent implements OnInit {
    @Input() licenciaConduccion: any = null;
    public errorMessage;
    public licenciasConduccion;

    public identificacion;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;

    public entidadesJudiciales: any;

    public table: any;

    public formIndex = true;


    public ciudadano:any = false;
    prohibicion = {
        'tipoNovedad':null,
        'tipoOrden':null,
        'numProceso':null,
        'fechaOrden':null,
        'fechaResolucion':null,
        'fechaPlazo':null,
        'idJuzgado':null,
        'motivo':null,
        'idCiudadano':null,
    };
    tiposNovedad = [
        {value:'SUSPENSION',label:'SUSPENSIÓN'},
        {value:'CANCELACION',label:'CANCELACIÓN'},
    ];
    motivosSuspension = [
        {value:'Por decision Judicial',label:'Por decisión Judicial'},
        {value:'Imposibilidad física o mental decretada',label:'Imposibilidad física o mental decretada'},
        {value:'EMBRIAGUEZ',label:'Embriaguez'},
        {value:'Prestar servicio público en vehículo particular',label:'Prestar servicio público en vehículo particular'},
        {value:'Reincidencia según el Artículo 124 del código nacional de tránsito y transporte',label:'Reincidencia según el Artículo 124 del código nacional de tránsito y transporte'},
    ];
    motivosCancelacion = [
        {value:'Por decision Judicial',label:'Por decisión Judicial'},
        {value:'Imposibilidad física o mental decretada',label:'Imposibilidad física o mental decretada'},
        {value:'Muerte',label:'Muerte'},
        {value:'Prestar servicio público en vehículo particular',label:'Prestar servicio público en vehículo particular'},
        {value:'Por hacer uso de la licencia de conducción estando suspendida.',label:'Por hacer uso de la licencia de conducción estando suspendida'},
        {value:'Por obtener por medios fraudulentos, la expedición de una licencia de conducción',label:'Por obtener por medios fraudulentos, la expedición de una licencia de conducción'},
    ];
    tiposOrden = [
        {value:'ORGANISMODETRANSITO',label:'ORGANISMO DE TRANSITO'},
        {value:'ORDENJUDICIAL',label:'ORDEN JUDICIAL'},
    ];

    constructor(
        private _EntidadJuducialService: CfgEntidadJudicialService,
        private _LoginService: LoginService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _UserLcProhibicionService: UserLcProhibicionService,
    ) { }

    ngOnInit() {

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

        this._EntidadJuducialService.select().subscribe( 
            response => {
                this.entidadesJudiciales = response;
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

    onSearchCiudadano() {
        let token = this._LoginService.getToken();

        this._UserCiudadanoService.searchByIdentificacion({ 'idTipoIdentificacion': this.tipoIdentificacionSelected,'identificacion': this.identificacion }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ciudadano = response.data.ciudadano;
                    console.log(this.ciudadano);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                }
        });       
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 6,
            sPaginationType: 'full_numbers',
            buttons: 'Excel',
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

    onEnviar(){
        let token = this._LoginService.getToken();
        this.prohibicion.idCiudadano = this.ciudadano.id;
        this._UserLcProhibicionService.register(this.prohibicion,token).subscribe( 
            response => {
                this.entidadesJudiciales = response;
                swal({
                    title: 'Error!',
                    text: 'Registro exitoso!',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
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
} 