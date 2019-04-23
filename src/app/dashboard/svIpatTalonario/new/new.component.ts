import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvIpatTalonario } from '../svIpatTalonario.modelo';
import { SvIpatTalonarioService } from '../../../services/svIpatTalonario.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public talonario: SvIpatTalonario;
    public errorMessage;

    public formNew = false;
    public formEdit = false;
    public formIndex = true;

    public table: any = null;

    public organismosTransito: any;
    public organismoTransito: any;

    constructor(
        private _TalonarioService: SvIpatTalonarioService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.talonario = new SvIpatTalonario(null, null, null, null, null, null);

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
        let inicial, final, rangos;
        inicial = this.talonario.rangoInicial;
        final = this.talonario.rangoFinal;

        if (final > inicial) {
            rangos = (final - inicial) + 1;

            if (rangos < 0) {
                rangos = 0;
            }
            this.talonario.total = rangos;
        } else {
            swal({
                title: 'Alerta!',
                text: 'El número de inicio no puede ser superior o igual al número de finalización',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });

            this.talonario.total = null;
        }
    }

    onChangedOrganismoTransito(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._OrganismoTransitoService.show({ 'id': e }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.organismoTransito = response.data;
                        this.talonario.idOrganismoTransito = this.organismoTransito.id;

                        this._TalonarioService.searchOneByOrganismoTransito({ 'idOrganismoTransito': e }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.talonario = response.data;
                                }else{
                                    this.talonario.rangoInicial = 0;
                                    this.talonario.rangoFinal = 0;
                                    this.talonario.total = 0;
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
                    }else{
                        this.organismoTransito = null;
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

    onEnviar() {
        swal({
            title: 'Generando consecutivos',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();
        
        this._TalonarioService.register(this.talonario, token).subscribe(
            response => {
                if (response.code == 200) {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    
                    this.ready.emit(true);
                }else{
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
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

            }
        );
    }
}