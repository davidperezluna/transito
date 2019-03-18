import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-placa',
    templateUrl: './newRna.cambioPlaca.html'
})
export class NewRnaCambioPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public tipoCambioList: string[];
    public tipoCambioSelected: any;
    public resumen = {};     
    public datos = {
        'tipoCambio': null,
        'numeroRunt': null,
        'nuevaPlaca': null,
        'documentacion': null,
        'sustrato': null,
        'campos': null,
        'tramiteFormulario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.tipoCambioList = ['Antiguo', 'Clasico', 'Normal'];
    }
    
    onEnviar() {
        let token = this._loginService.getToken();

        this.datos.tipoCambio = this.tipoCambioSelected;
         this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-cambioplaca';
        this.datos.campos = ['placa'];
        this.datos.idVehiculo = this.vehiculo.id;

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = 'Placa anterior '+ this.vehiculo.placa.numero +'<br/>Placa nueva' + this.datos.nuevaPlaca;

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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
        this.cancelarTramite.emit(true);
    }

}