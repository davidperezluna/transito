import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

@Component({
    selector: 'appRnrs-cambio-servicio',
    templateUrl: './newRnrs.cambioServicio.html'
})
export class NewRnrsCambioServicioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public servicios: any;
    public tramiteFacturaSelected: any;
    public servicioSelected: any;
    
    public datos = {
        'idFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idServicio': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _ServicioService: VhloCfgServicioService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.vehiculo.servicioId = 4;

        this._ServicioService.select().subscribe(
            response => {
                this.servicios = response;
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
    
   
    enviarTramite(){
        
        let token = this._loginService.getToken();

        this._ServicioService.show(token, this.servicioSelected).subscribe(
            servicioResponse => {
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnrs-cambioservicio';
                this.datos.idServicio = this.servicioSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['servicio'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'servicio anterior': this.vehiculo.servicio.nombre,
                                'nuevo servicio': servicioResponse.data.nombre,
                            };
                            this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                        }
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    });
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}