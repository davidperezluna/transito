import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvAudienciaService } from '../../../services/cvAudiencia.service';
import { CfgAdmFormatoService } from '../../../services/cfgAdmFormato.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() audiencia: any = null;
    public errorMessage;
    public formReady = false;
    public formatos: any = null;

    public datos = {
        'borrador': null,
        'idFormato': null,
        'idAudiencia': null,
    }

    constructor(
        private _AudienciaService: CvAudienciaService,
        private _FormatoService: CfgAdmFormatoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFormato = null;
        
        this._FormatoService.select().subscribe(
            response => {
                this.formatos = response;
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

    ngOnChange() {
        // this will be called each time userInput changes
        this.ngOnInit();
    }

    onCancelar() { this.ready.emit(true); }

    onChangedFormato(e) {
        if (e) {
            swal({
                title: 'Cargando plantilla!',
                text: 'Solo tardara unos segundos por favor espere.',
                onOpen: () => {
                    swal.showLoading()
                }
            });

            let token = this._LoginService.getToken();

            this._FormatoService.show({ 'id': e, 'idComparendo': this.audiencia.comparendo.id }, token).subscribe(
                response => {
                    /*$('#summernote').summernote({
                        placeholder: 'Diligencie el cuerpo del acto administrativo',
                        tabsize: 2,
                        height: 800,
                        toolbar: [
                            ['style', ['bold', 'italic', 'underline', 'clear']],
                            ['fontsize', ['fontsize']],
                            ['color', ['color']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['table', ['table']]
                        ]
                    });*/

                    $('#summernote').summernote('code', response.data.template);

                    this.datos.idFormato = response.data.formato.id;

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
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        this._AudienciaService.edit(this.audiencia, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
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

            }
        );
    }

}