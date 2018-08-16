import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvSenialService } from '../../../services/msvSenial.service';
import { LoginService } from '../../../services/login.service';
//import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';
import { MsvSenial } from '../msvSenial.modelo';
declare var $: any;

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public id;
    public respuesta;
    public MsvSenial;
    public formNew = false;
    public formN = false;
    public formEdit = false;
    public comparendoForm = false;
    public formIndex = true;
    public table: any = null;
    public msvSenial: MsvSenial;
    public sedesOperativas: any;
    public sedeOperativaSelected: any;
    public sedeOperativaSuccess = false;
    public validado = false;
    public sedeOperativaReady = false;
    public msvSenialReady = false;
    public sedeOperativa: any;

    constructor(
        private _msvSenialService: MsvSenialService,
        private _loginService: LoginService,
        //private _sedeOperativaService: SedeOperativaService,
    ) { }

    ngOnInit() {
        /*this.msvSenial = new MsvSenial(null, null, null, null, null, null);
        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading()
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        })

        this._sedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
                this.sedeOperativaSuccess = false;
                this.formN = true;
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
    iniciarTabla() {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onCancelar() {
        this.ready.emit(true);
    }


    onNew() {
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

        ini = this.msvSenial.rangoini;
        fin = this.msvSenial.rangofin;
        total = (fin - ini);

        if (total < 0) {
            total = 0;
        }
        this.msvSenial.total = total;
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
    /*deleteMsvSenial(id: any) {

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
                this._msvSenialService.deleteMsvSenial(token, id).subscribe(
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

    editMsvSenial(msvSenial: any) {
        this.msvSenial = msvSenial;
        this.formEdit = true;
        this.formIndex = false;
    }


    onEnviar() {
        let token = this._loginService.getToken();
        this.msvSenial.rangoini = this.msvSenial.rangoini;
        this.msvSenial.rangofin = this.msvSenial.rangofin;
        this.msvSenial.total = this.msvSenial.total;
        this.msvSenial.fechaAsignacion = this.msvSenial.fechaAsignacion;
        this.msvSenial.nResolucion = this.msvSenial.nResolucion;
        this.msvSenial.sedeOperativaId = this.sedeOperativaSelected;
        this._msvSenialService.register(this.msvSenial, token).subscribe(
            response => {
                //console.log(response);
                this.respuesta = response;
                console.log(this.respuesta);
                if (this.respuesta.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'El registro se ha agregado con exito',
                        type: 'success',
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
    }*/


    /*changedSedeOperativa(e) {

        this.validado = false;
        if (e) {
            let token = this._loginService.getToken();
            this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
                response => {
                    this.sedeOperativa = response;
                    this.sedeOperativaReady = true;
                    //          this.msvSenial.rangoini = this.sedeOperativa.data.
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

            this._msvSenialService.showMsvSenialPorSedeOperativa(token, e).subscribe(
                response => {
                    this.sedeOperativaSuccess = true;
                    if (response.status == "success") {

                        this.msvSenial = response.data;

                        this.msvSenialReady = true;
                        this.msvSenial.fechaAsignacion = this.msvSenial.fechaAsignacion;

                        //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
                        console.log(this.msvSenial);
                    }
                    else if (response.status == "vacio") {
                        this.msvSenial = new MsvSenial(0, 0, 0, "", "", 0);
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

}