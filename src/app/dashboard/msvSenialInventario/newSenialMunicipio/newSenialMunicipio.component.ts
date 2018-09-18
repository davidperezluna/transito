import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'; 
import { MsvSenialInventarioService } from '../../../services/msvSenialInventario.service';
import { MsvSenialService } from '../../../services/msvSenial.service';
import { CfgSvConectorService } from '../../../services/cfgSvConector.service';
import { MunicipioService } from '../../../services/municipio.service';
import { LoginService } from '../../../services/login.service';
import { MsvSenialMunicipio } from './newSenialMunicipio.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new-senial-municipio',
    templateUrl: './newSenialMunicipio.component.html'
})
export class NewSenialMunicipioComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tipoSenialSelected: any = null;
    @Input() municipioSelected: any = null;
    public errorMessage;
    public id;
    public municipio: any = null;

    public seniales: any;
    public senialSelected: any;

    public conectores: any;
    public conectorSelected: any;

    public formEdit = false;
    public formIndex = true;
    public senialMunicipio: MsvSenialMunicipio;

    constructor(
        private _MsvSenialInventarioService: MsvSenialInventarioService,
        private _MsvSenialService: MsvSenialService,
        private _ConectorService: CfgSvConectorService,
        private _MunicipioService: MunicipioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.tipoSenialSelected);
        
        this.senialMunicipio = new MsvSenialMunicipio(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

        let token = this._LoginService.getToken();

        this._MunicipioService.showMunicipio(token, this.municipioSelected).subscribe(
            response => {
                this.municipio = response.data;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        
        this._MsvSenialService.selectByTipoSenial({'idTipoSenial': this.tipoSenialSelected}, token).subscribe(
            response => {
                this.seniales = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this._ConectorService.select().subscribe(
            response => {
                this.conectores = response;
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


    onEnviar() {
        let token = this._loginService.getToken();
        this.MsvSenialInventario.rangoini = this.MsvSenialInventario.rangoini;
        this.MsvSenialInventario.rangofin = this.MsvSenialInventario.rangofin;
        this.MsvSenialInventario.total = this.MsvSenialInventario.total;
        this.MsvSenialInventario.fechaAsignacion = this.MsvSenialInventario.fechaAsignacion;
        this.MsvSenialInventario.nResolucion = this.MsvSenialInventario.nResolucion;
        this.MsvSenialInventario.sedeOperativaId = this.sedeOperativaSelected;
        this._MsvSenialInventarioService.register(this.MsvSenialInventario, token).subscribe(
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
}