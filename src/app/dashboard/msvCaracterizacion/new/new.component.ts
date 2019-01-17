import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvCaracterizacion } from '../msvCaracterizacion.modelo';
import { MsvCaracterizacionService } from '../../../services/msvCaracterizacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public msvCaracterizacion: MsvCaracterizacion;
    public errorMessage;

    public ctzn: any;
    public nit: any;

    public empresaEncontrada = false;
    public empresa: any;

    constructor(
        private _MsvCaracterizacionService: MsvCaracterizacionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.msvCaracterizacion = new MsvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        swal({
            title: '¿La empresa solicita asistencia técnica?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
            }).then((result) => {
            if (result.value) {
                this.ctzn = true;
            } else if (result.dismiss === swal.DismissReason.cancel) {
                this.ctzn = false;
            }
            });
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._MsvCaracterizacionService.register(this.msvCaracterizacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
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

            });
    }

    onBuscarEmpresa() {
        let token = this._loginService.getToken();
        this._MsvCaracterizacionService.getBuscarEmpresa({ 'nit': this.nit }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.empresaEncontrada = true;
                    this.empresa = response.data[0];
                    console.log(this.empresa);
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
    }

    onExport(){
        alert("asdasd");
    }
}
