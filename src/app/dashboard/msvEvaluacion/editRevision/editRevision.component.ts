import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MsvRevisionService } from '../../../services/msvRevision.service';
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-revision',
    templateUrl: './editRevision.component.html'
})
export class EditRevisionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() msvRevision: any = null;
    public errorMessage;
    public contratistas: any;
    public contratistaSelected: any;
    public formReady = false;

    constructor(
        private _RevisionService: MsvRevisionService,
        private _MsvPersonalFuncionarioService: MpersonalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        this._MsvPersonalFuncionarioService.selectContratistas().subscribe(
            response => {
                this.contratistas = response;
                setTimeout(() => {
                    this.contratistaSelected = [this.msvRevision.funcionarioId];
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
        this._RevisionService.editRevision(this.msvRevision, token).subscribe(
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