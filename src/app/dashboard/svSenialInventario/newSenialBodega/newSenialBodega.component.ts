import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'; 
import { SvCfgSenialEstadoService } from '../../../services/svCfgSenialEstado.service';
import { SvCfgSenialColorService } from '../../../services/svCfgSenialColor.service';
import { CfgSvUnidadMedidaService } from '../../../services/cfgSvUnidadMedida.service';
import { SvSenialInventarioService } from '../../../services/svSenialInventario.service';
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
    @Input() tipoSenialSelected: any = null;
    public errorMessage;
    public id;
    public logo: any;
    public file: any = new FormData();
    public senial: SvSenialBodega;

    public estados: any;
    public estadoSelected: any;

    public colores: any;
    public colorSelected: any;

    public medidas: any;
    public medidaSelected: any;

    constructor(
        private _EstadoService: SvCfgSenialEstadoService,
        private _ColorService: SvCfgSenialColorService,
        private _UnidadMedidaService: CfgSvUnidadMedidaService,
        private _SenialInventarioService: SvSenialInventarioService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.senial = new SvSenialBodega(null, null, null, null, null, null, null, null, null, null);

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

        this._ColorService.select().subscribe(
            response => {
                this.colores = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this._UnidadMedidaService.select().subscribe(
            response => {
                this.medidas = response;
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

    onFileChange(event) {       
        if (event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];
            this.file.append('file', fileSelected);
        }
    }

    onLogoChange(event) {
        if (event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];
            this.file.append('logo', fileSelected);
        }
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.senial.idEstado = this.estadoSelected;
        this.senial.idColor = this.colorSelected;
        this.senial.idUnidadNedida = this.medidaSelected;
        this.senial.idTipoSenial = this.tipoSenialSelected;

        this._SenialInventarioService.registerSenialBodega(this.file, this.senial, token).subscribe(
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