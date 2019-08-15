import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { VhloTpConvenioService } from "../../../../../services/vhloTpConvenio.service";
import { UserEmpresaService } from '../../../../../services/userEmpresa.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-vhlotpconvenio',
    templateUrl: './edit.component.html',
    providers: [DatePipe]
})

export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() convenio: any = null;
    @Input() arrayEmpresasTransporte: any = null;
    public empresasTransportePublico: any;
    public errorMessage;
    public formReady = false;

    
    constructor(
        private _VhloTpConvenioService: VhloTpConvenioService,
        private _EmpresaService: UserEmpresaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.convenio);
        
        var datePiper = new DatePipe(this.convenio.fechaConvenio);
        this.convenio.fechaConvenio = datePiper.transform(this.convenio.fechaConvenio.timestamp, 'yyyy-MM-dd');
        console.log(this.convenio.fechaConvenio);
        
        var datePiper2 = new DatePipe(this.convenio.fechaActaInicio.timestamp);
        this.convenio.fechaActaInicio = datePiper2.transform(this.convenio.fechaActaInicio.timestamp, 'yyyy-MM-dd');
        
        var datePiper3 = new DatePipe(this.convenio.fechaActaFin.timestamp);
        this.convenio.fechaActaFin = datePiper3.transform(this.convenio.fechaActaFin.timestamp, 'yyyy-MM-dd');
        
        this.empresasTransportePublico = this.arrayEmpresasTransporte;
    
    }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._LoginService.getToken();

        this._VhloTpConvenioService.edit(this.convenio, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            });
    }
}