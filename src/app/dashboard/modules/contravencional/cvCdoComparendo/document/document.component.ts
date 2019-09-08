import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgAdmFormatoService } from '../../../../../services/cfgAdmFormato.service';
import { CvCdoTrazabilidadService } from '../../../../../services/cvCdoTrazabilidad.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-document-cvcdocomparendo',
    templateUrl: './document.component.html'
})

export class DocumentComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() trazabilidad: any = null;
    public errorMessage;
    public formatos: any = null;
    public datos = {
        'numero': null,
        'cuerpo': null,
        'idFormato': null,
        'id': this.trazabilidad.id,
    }

    constructor(
        private _LoginService: LoginService,
        private _FormatoService: CfgAdmFormatoService,
        private _TrazabilidadService: CvCdoTrazabilidadService,
    ) { }

    ngOnInit() {
        console.log(this.trazabilidad);
        
        $('#summernote').summernote({
            placeholder: 'Diligencie el cuerpo del acto admisnitrativo',
            tabsize: 2,
            height: 500
        });

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
    

    onChangedFormato(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._FormatoService.show({ 'id':e, 'idComparendo':this.trazabilidad.comparendo.id }, token).subscribe(
                response => {
                    $('#summernote').summernote('code', response.data.cuerpo);
                    this.datos.idFormato = response.data.id;
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

        this._TrazabilidadService.updateDocumento(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
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
            }
        );
    }
}