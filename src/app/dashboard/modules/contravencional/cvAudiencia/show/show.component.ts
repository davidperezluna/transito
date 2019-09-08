import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvAudienciaService } from '../../../../../services/cvAudiencia.service';
import { CvAuCfgTipoService } from '../../../../../services/cvAuCfgTipo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show-cvaudiencia',
    templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() audiencia: any = null;
    public errorMessage;
 
    public tipos: any = null;

    public datos = {
        'cuerpo': null,
        'id': null,
    }

    constructor(
        private _AudienciaService: CvAudienciaService,
        private _TipoService: CvAuCfgTipoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando plantilla!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._TipoService.show({ 'id': this.audiencia.tipo.id, 'idComparendo': this.audiencia.comparendo.id }, token).subscribe(
            response => {
                if (response.code == 200) {
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

                    swal.close();
                }else{
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    });
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

    ngOnChange() {
        // this will be called each time userInput changes
        this.ngOnInit();
    }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        swal({
        title: 'Guardando registros!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
            swal.showLoading()
        }
        });

        let token = this._LoginService.getToken();

        this.datos.id = this.audiencia.id;
        this.datos.cuerpo = $('#summernote').summernote('code');

        this._AudienciaService.updateCuerpo(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(false);

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }else{
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