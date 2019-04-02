import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MsvRevisionService } from '../../../services/msvRevision.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { MsvEvaluacionService } from "../../../services/msvEvaluacion.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-revision',
    templateUrl: './editRevision.component.html'
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
        private _RevisionService: MsvRevisionService,
        private _PnalFuncionarioService: PnalFuncionarioService,
        private _MsvEvaluacionService: MsvEvaluacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        let token = this._LoginService.getToken();
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
                if (response.status == 'success') {
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