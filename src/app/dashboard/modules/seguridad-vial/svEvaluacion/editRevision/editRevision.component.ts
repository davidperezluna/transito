import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SvRevisionService } from '../../../../../services/svRevision.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { SvEvaluacionService } from "../../../../../services/svEvaluacion.service";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-revision-svevaluacion',
    templateUrl: './editRevision.component.html',
    providers: [DatePipe]
})
export class EditRevisionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() msvRevision: any = null;
    @Input() miEmpresa: any = null;
    public errorMessage;
    public contratistas: any;
    public contratistaSelected: any;
    public formReady = false;
    public aval;

    constructor(
        private _RevisionService: SvRevisionService,
        private _PnalFuncionarioService: PnalFuncionarioService,
        private _MsvEvaluacionService: SvEvaluacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        console.log(this.msvRevision);
        let token = this._LoginService.getToken();

        var datePiper = new DatePipe('en-US');
        var date = new Date();

        if (this.msvRevision.fechaRecepcion) {
            date.setTime(this.msvRevision.fechaRecepcion.timestamp * 1000);

            this.msvRevision.fechaRecepcion = datePiper.transform(
                date, 'yyyy-MM-dd'
            );
        }
        
        if (this.msvRevision.fechaRevision) {
            date.setTime(this.msvRevision.fechaRevision.timestamp * 1000);

            this.msvRevision.fechaRevision = datePiper.transform(
                date, 'yyyy-MM-dd'
            );
        }

        if (this.msvRevision.fechaDevolucion) {
            date.setTime(this.msvRevision.fechaDevolucion.timestamp * 1000);

            this.msvRevision.fechaDevolucion = datePiper.transform(
                date, 'yyyy-MM-dd'
            );
        }

        if(this.msvRevision.fechaOtorgamiento) {
            date.setTime(this.msvRevision.fechaOtorgamiento.timestamp * 1000);

            this.msvRevision.fechaOtorgamiento = datePiper.transform(
                date, 'yyyy-MM-dd'
            );
        }
        
        this._MsvEvaluacionService.findAvalByEvaluacion(this.msvRevision, token).subscribe(
            response => {
                this.aval = response.data.aval;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
        
        this._PnalFuncionarioService.selectContratistas().subscribe(
            response => {
                this.contratistas = response;
                setTimeout(() => {
                    this.contratistaSelected = [this.msvRevision.funcionario.id];
                });
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
    }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._LoginService.getToken();
        this.msvRevision.funcionarioId = this.contratistaSelected;
        this.msvRevision.empresaId = this.miEmpresa.id;
        this._RevisionService.edit(this.msvRevision, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'El registro se ha modificado con éxito.',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición.");
                    }
                }

            });
    }

}