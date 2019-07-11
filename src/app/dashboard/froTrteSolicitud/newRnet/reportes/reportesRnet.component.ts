import { Component, OnInit } from '@angular/core';
import { FroTrteSolicitudReporteService } from '../../../../services/froTrteSolicitudReporte.service';
import { CfgModuloService } from "../../../../services/cfgModulo.service";
import { CfgOrganismoTransitoService } from "../../../../services/cfgOrganismoTransito.service";
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-reportes-rnet',
    templateUrl: './reportesRnet.component.html'
})

export class ReportesRnetComponent implements OnInit {
    public errorMessage;

    public tramitesSolicitud: any = null;
    public propietariosActuales: any = null;
    public tramites: any = null;
    public medidasCautelares: any = null;
    public cancelacionesMatricula: any = null;
    public prendas: any = null;
    public radicadosCuenta: any = null;

    public formSearch: any;

    public tableVehiculos: any;
    public tablePropietariosActuales: any;
    public tableTramites: any;
    public tableMedidaCautelar: any;
    public tableCancelacionMatricula: any;
    public tablePrendas: any;
    public tableRadicadoCuenta: any;

    public tipoReporteSelected;
    public tiposReporte = [
        { value: '1', label: 'VEHICULOS ACTIVOS POR EMPRESA DE TRANSP.' },
        { value: '2', label: 'RANGOS' },
        { value: '3', label: 'TRAMITES' },
        { value: '4', label: 'MEDIDA CAUTELAR' },
        { value: '5', label: 'CANCELACIÓN MATRICULA' },
        { value: '6', label: 'PRENDAS' },
        { value: '7', label: 'RADICADOS DE CUENTA' },
    ];

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
        this.onInitForms();
    }

    onInitForms() {
        this.formSearch = true;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formSearch = true;
        }
    }

    onEnviar() {
    }
}