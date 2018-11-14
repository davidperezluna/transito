import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvTalonarioService } from '../../../services/msvTalonario.service';
import { LoginService } from '../../../services/login.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
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
    public sedesOperativas: any;
    public sedeOperativaSelected: any;
    public sedeOperativaSuccess = false;
    public validado = false;
    public sedeOperativaReady = false;
    public msvTalonarioReady = false;
    public sedeOperativa: any;

    constructor(
        private _msvTalonarioService: MsvTalonarioService,
        private _loginService: LoginService,
        private _sedeOperativaService: SedeOperativaService,
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

        this._sedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
                this.sedeOperativaSuccess = false;
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

        this.msvTalonario.sedeOperativaId = this.sedeOperativaSelected;
        
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


    changedSedeOperativa(e) {

        this.validado = false;
        if (e) {
            let token = this._loginService.getToken();
            this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
                response => {
                    this.sedeOperativa = response;
                    this.sedeOperativaReady = true;
                    //          this.msvTalonario.rangoini = this.sedeOperativa.data.
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

            this._msvTalonarioService.showMsvTalonarioPorSedeOperativa(token, e).subscribe(
                response => {
                    this.sedeOperativaSuccess = true;
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