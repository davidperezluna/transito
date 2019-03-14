import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvTalonarioService } from '../../../services/msvTalonario.service';
import { LoginService } from '../../../services/login.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import swal from 'sweetalert2';
import { MsvTalonario } from '../msvTalonario.modelo';
declare var $: any;

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public id;
    public msvTalonarios;
    public formNew = false;
    public formN = false;
    public formEdit = false;
    public comparendoForm = false;
    public formIndex = true;
    public table: any = null;
    public msvTalonario: MsvTalonario;
    public organismosTransito: any;
    public organismoTransitoSelected: any;
    public organismoTransitoSuccess = false;
    public validado = false;
    public organismoTransitoReady = false;
    public msvTalonarioReady = false;
    public organismoTransito: any;

    constructor(
        private _msvTalonarioService: MsvTalonarioService,
        private _loginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
    ) { }

    ngOnInit() {
        this.msvTalonario = new MsvTalonario(null, null, null, null, null, null);

        swal({
            title: 'Cargando datos!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
                this.organismoTransitoSuccess = false;
                this.formN = true;
                swal.close();
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
        let ini, fin, rangos;
        ini = this.msvTalonario.rangoini;
        fin = this.msvTalonario.rangofin;

        if (fin > ini) {
            rangos = (fin - ini) + 1;

            if (rangos < 0) {
                rangos = 0;
            }
            this.msvTalonario.total = rangos;
        } else {
            swal({
                title: 'Alerta!',
                text: 'El número de inicio no puede ser superior o igual al número de finalización',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
            this.msvTalonario.total = null;
        }
    }

    onEnviar() {
        swal({
            title: 'Generando consecutivos',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

        this.msvTalonario.idOrganismoTransito = this.organismoTransitoSelected;
        
        this._msvTalonarioService.register(this.msvTalonario, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'El registro se ha agregado con exito',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    swal.close();
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }

            });
    }

    changedOrganismoTransito(e) {

        this.validado = false;
        if (e) {
            let token = this._loginService.getToken();
            this._OrganismoTransitoService.show(token, e).subscribe(
                response => {
                    this.organismoTransito = response;
                    this.organismoTransitoReady = true;
                    //          this.msvTalonario.rangoini = this.sedeOperativa.data.
                    //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );

            this._msvTalonarioService.showMsvTalonarioPorOrganismoTransito(token, e).subscribe(
                response => {
                    this.organismoTransitoSuccess = true;
                    if (response.status == "success") {

                        this.msvTalonario = response.data;

                        this.msvTalonarioReady = true;
                        this.msvTalonario.fechaAsignacion = this.msvTalonario.fechaAsignacion;

                        //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                        console.log(this.msvTalonario);
                    }
                    else if (response.status == "vacio") {
                        this.msvTalonario = new MsvTalonario(0, 0, 0, "", "", 0);
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
        }
    }

}