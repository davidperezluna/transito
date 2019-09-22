import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { CvCdoComparendoService } from 'app/services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-cvcdocomparendo-export',
    templateUrl: './export.component.html'
})

export class CvCdoComparendoExportComponent implements OnInit, AfterViewInit {
    public errorMessage;

    public docsUrl = environment.docsUrl;
    public organismosTransito;

    public archivo: any = null;

    public tiposReporte = [
        { value: '1', label: 'COMPARENDOS' },
        { value: '2', label: 'RESOLUCIONES' },
        { value: '3', label: 'RECAUDOS' },
    ];

    public datos = {
        'tipoReporte': null,
        'idOrganismoTransito': null,
        'fechaInicial': null,
        'fechaFinal': null,
    }

    constructor(
        private _CvCdoComparendoService : CvCdoComparendoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
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

    ngAfterViewInit() {
        swal.close();
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        let identity = this._LoginService.getIdentity();

        if (this.datos.tipoReporte) {
            this._CvCdoComparendoService.createFile(this.datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.archivo = response.data;

                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        });
                    }
                    /* if (response.type) {
                      var fileURL = URL.createObjectURL(response);
                      window.open(fileURL);
                    } else {
                      swal({
                        title: 'Error!',
                        text: 'No existen registros para la generación del archivo plano en el rango de las fechas estipuladas.',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                      });
                      error => {
                        this.errorMessage = <any>error;
          
                        if (this.errorMessage != null) {
                          console.log(this.errorMessage);
                          alert("Error en la petición");
                        }
                      }
                    } */
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );
        } else {

        }
    }
}
