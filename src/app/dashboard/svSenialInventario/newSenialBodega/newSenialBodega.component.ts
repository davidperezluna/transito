import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'; 
import { SvCfgSenialProveedorService } from '../../../services/svCfgSenialProveedor.service';
import { SvCfgSenialEstadoService } from '../../../services/svCfgSenialEstado.service';
import { SvCfgSenialService } from '../../../services/svCfgSenial.service';
import { SvSenialBodegaService } from '../../../services/svSenialBodega.service';
import { LoginService } from '../../../services/login.service';
import { SvSenialBodega } from './newSenialBodega.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new-senial-bodega',
    templateUrl: './newSenialBodega.component.html'
})
export class NewSenialBodegaComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() idTipoSenial: any = null;
    public errorMessage;
    public file: any = new FormData();
    public senialBodega: SvSenialBodega;

    public proveedores: any;
    public estados: any;
    public seniales: any;

    constructor(
        private _ProveedorService: SvCfgSenialProveedorService,
        private _EstadoService: SvCfgSenialEstadoService,
        private _SenialService: SvCfgSenialService,
        private _SenialBodegaService: SvSenialBodegaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.senialBodega = new SvSenialBodega(null, null, null, null, null, null, null, null, null);

        this._ProveedorService.select().subscribe(
            response => {
                this.proveedores = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this._EstadoService.select().subscribe(
            response => {
                this.estados = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        let token = this._LoginService.getToken();

        this._SenialService.selectByTipo({ 'idTipoSenial': this.idTipoSenial }, token).subscribe(
            response => {
                this.seniales= response;
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
    
    onCancelar() {
        this.ready.emit(true);
    }

    onCalcularTotal() {
        let cantidad, valor, total;
        cantidad = this.senialBodega.cantidad;
        valor = this.senialBodega.valor;

        if (cantidad == 0 || valor == 0) {
            swal({
                title: 'Alerta!',
                text: 'La cantidad y/o el valor unitario no pueden estar en 0',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.senialBodega.valorTotal = 0;
        } else {
            this.senialBodega.valorTotal = cantidad * valor;
        }
    }

    onFileChange(event) {       
        if (event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];
            this.file.append('file', fileSelected);
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this._SenialBodegaService.register(this.file, this.senialBodega, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
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