import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroFacTransferencia } from '../froFacTransferencia.modelo';
import { FroFacTransferenciaService } from '../../../../../services/froFacTransferencia.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-frofactransferencia',
    templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    
    public froRecaudo: FroFacTransferencia;

    public numFactura: any;
    public disabled: boolean = true;
    public organismosTransito: any;
    public froFactura: any;
    public sedeOperativaSelected: any;

    constructor(
        private _FroFacTransferenciaService: FroFacTransferenciaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.froRecaudo = new FroFacTransferencia(null, null, null,null,null,null,null,null,null);
     }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        this.froRecaudo.IdSedeOperativa = this.sedeOperativaSelected;
        this.froRecaudo.IdFroFactura = this.froFactura.id;

        this._FroFacTransferenciaService.register(this.froRecaudo, token).subscribe(
            response => {
                if (response.code == 200) {
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
            }
        );
    }
}
