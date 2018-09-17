import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'; 
import { CfgSvSenialEstadoService } from '../../../services/cfgSvSenialEstado.service';
import { CfgSvSenialColorService } from '../../../services/cfgSvSenialColor.service';
import { CfgSvUnidadMedidaService } from '../../../services/cfgSvUnidadMedida.service';
import { MsvSenialInventarioService } from '../../../services/msvSenialInventario.service';
import { LoginService } from '../../../services/login.service';
import { MsvSenialBodega } from './newSenialBodega.modelo';
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
    public senial: MsvSenialBodega;

    public estados: any;
    public estadoSelected: any;

    public colores: any;
    public colorSelected: any;

    public medidas: any;
    public medidaSelected: any;

    constructor(
        private _EstadoService: CfgSvSenialEstadoService,
        private _ColorService: CfgSvSenialColorService,
        private _UnidadMedidaService: CfgSvUnidadMedidaService,
        private _SenialInventarioService: MsvSenialInventarioService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.senial = new MsvSenialBodega(null, null, null, null, null, null, null, null, null, null);

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

   /* onNew() {
        this.formNew = false;
        this.formN = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    myFunc() {
        console.log("asd");
    }

    onCalcularTotal() {
        let ini, fin, total;

        ini = this.MsvSenialInventario.rangoini;
        fin = this.MsvSenialInventario.rangofin;
        total = (fin - ini);

        if (total < 0) {
            total = 0;
        }
        this.MsvSenialInventario.total = total;
    }*/

    /*ready(isCreado: any) {
      if (isCreado) {
        this.formNew = false;
        this.formN = false;
        this.formEdit = false;
        this.formIndex = false;
        this.ngOnInit();
      }
    }*/
    /*deleteMsvInventarioSenial(id: any) {

        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();
                this._MsvSenialInventarioService.deleteMsvInventarioSenial(token, id).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: 'Registro eliminado correctamente.',
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        })
                        this.table.destroy();
                        this.respuesta = response;
                        this.ngOnInit();
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
        })
    }

    editMsvInventarioSenial(MsvSenialInventario: any) {
        this.MsvSenialInventario = MsvSenialInventario;
        this.formEdit = true;
        this.formIndex = false;
    }


    */


    /*changedSedeOperativa(e) {

        this.validado = false;
        if (e) {
            let token = this._loginService.getToken();
            this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
                response => {
                    this.sedeOperativa = response;
                    this.sedeOperativaReady = true;
                    //          this.MsvSenialInventario.rangoini = this.sedeOperativa.data.
                    //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                    console.log(this.sedeOperativa);
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );

            this._MsvSenialInventarioService.showMsvInventarioSenialPorSedeOperativa(token, e).subscribe(
                response => {
                    this.sedeOperativaSuccess = true;
                    if (response.status == "success") {

                        this.MsvSenialInventario = response.data;

                        this.MsvSenialInventarioReady = true;
                        this.MsvSenialInventario.fechaAsignacion = this.MsvSenialInventario.fechaAsignacion;

                        //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                        console.log(this.MsvSenialInventario);
                    }
                    else if (response.status == "vacio") {
                        this.MsvSenialInventario = new MsvInventarioSenial(0, 0, 0, "", "", 0);
                    }
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );
        }*/

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

            });
    }
}