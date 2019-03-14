import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

@Component({
    selector: 'appRna-cambio-color',
    templateUrl: './newRna.cambioColor.html'
})
export class NewRnaCambioColorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    public colores: any;
    public tramitesFactura: any = null;
    public tramiteFacturaSelected: any;
    public colorSelected: any;
    public tramiteRealizado: any;
    public datos = {
        'idTramiteFactura': null,
        'campos': null,
        'idVehiculo': null,
        'idColor': null,
        'tramiteFormulario': null,
    };

    constructor(
        private _ColorService: VhloCfgColorService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _TramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
    ) { }
  
    ngOnInit() {
        this._TramiteFacturaService.getTramitesByFacturaSelect(this.tramiteFactura.id).subscribe(
            response => {
                this.tramitesFactura = response;
                this.tramitesFactura.forEach(tramiteFactura => {
                    if (tramiteFactura.realizado == 1) {
                        if (tramiteFactura.tramitePrecio.tramite.id == 3) {
                            this.tramiteRealizado = tramiteFactura;
                            console.log(this.tramiteRealizado);
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
            }
        );

        //consultar tramite solicitud con tramiterealizado.id
        let token = this._loginService.getToken();
        if (this.tramiteRealizado) {
            this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token,this.tramiteRealizado.id).subscribe(
                response => {
                    this.datos = response.data.datos
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

        this._ColorService.select().subscribe(
            response => {
                this.colores = response;
                setTimeout(() => {
                    this.colorSelected = [this.vehiculo.color.id]
                });
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
    
   
    enviarTramite() {
        let token = this._loginService.getToken();

        this._ColorService.show(token, this.colorSelected).subscribe(
            colorResponse => {
                 this.datos.idTramiteFactura = this.tramiteFactura.id;
                this.datos.tramiteFormulario = 'rna-cambiocolor';
                this.datos.idColor = this.colorSelected;
                this.datos.idVehiculo = this.vehiculo.id;
                this.datos.campos = ['color'];

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = {
                                'Anterior': this.vehiculo.color.nombre,
                                'Nuevo': colorResponse.data.nombre,
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