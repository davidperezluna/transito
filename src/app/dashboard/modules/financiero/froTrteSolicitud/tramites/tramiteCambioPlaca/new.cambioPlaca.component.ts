import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-placa',
    templateUrl: './new.cambioPlaca.html'
})
export class NewCambioPlacaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    @Input() vehiculo: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public tipoCambioList: string[];
    public tipoCambioSelected: any;

    public clasificaciones = [
        { 'value': 'NORMAL', 'label': 'NORMAL' },
        { 'value': 'CLÁSICA', 'label': 'CLÁSICA' },
        { 'value': 'ANTIGUA', 'label': 'ANTIGUA' },
    ];

    public datos = {
        'documentacion': true,
        'observacion': null,
        'tipoCambio': null,
        'nuevaPlaca': null,
        'cantidad': null,
        'sustrato': null,
        'campos': null,
        'clasificacion': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                    return tramiteRealizado[key];
                });
                
                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else{
            this.tipoCambioList = ['Antiguo', 'Clasico', 'Normal'];
        }
    }
    
    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.campos = ['placa'];
        this.datos.tipoCambio = this.tipoCambioSelected;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "No. factura:" + this.tramiteFactura.factura.numero +
                    ', Placa anterior:'+ this.vehiculo.placa.numero +
                    ', Placa nueva:' + this.datos.nuevaPlaca +
                    ', Cantidad:' + this.datos.cantidad;

        this.realizado = true;

        this.onReadyTramite.emit(
            {
                'documentacion':this.datos.documentacion, 
                'observacion':this.datos.observacion, 
                'foraneas':this.datos, 
                'resumen':resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );
    }
}