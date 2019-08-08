import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BpProyectoService } from '../../../../../services/bpProyecto.service';
import { BpCuentaService } from '../../../../../services/bpCuenta.service';
import { BpActividadService } from '../../../../../services/bpActividad.service';
import { BpCfgTipoInsumoService } from '../../../../../services/bpCfgTipoInsumo.service';
import { BpInsumoService } from '../../../../../services/bpInsumo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() proyecto: any = null;
    public errorMessage;

    public insumos: any = null;
    public actividades: any = null;
    public tiposInsumo: any = null;
    public table: any = null; 
    
    public formIndexCuenta: any;
    public formIndexActividad: any;
    public formIndexInsumo: any;

    public formNewCuenta:any;
    public formNewActividad:any;
    public formNewInsumo:any;
    
    public cuenta: any = null;
    public actividad: any = null;
    public insumo: any = null;

    public datosCuenta = {
        'numero': null,
        'nombre': null,
        'costoTotal': 0,
        'idProyecto': null,
    };
    
    public datosActividad = {
        'nombre': null,
        'costoTotal': 0,
        'idCuenta': null,
    };

    public datosInsumo = {
        'nombre': null,
        'unidadMedida': null,
        'cantidad': null,
        'valorUnitario': null,
        'valorTotal': null,
        'idActividad': null,
        'idTipoInsumo': null,
    };

    constructor(
        private _ProyectoService: BpProyectoService,
        private _CuentaService: BpCuentaService,
        private _ActividadService: BpActividadService,
        private _TipoInsumoService: BpCfgTipoInsumoService,
        private _InsumoService: BpInsumoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        
    }

    onCancelar() {
        this.ready.emit(true);
    }
}