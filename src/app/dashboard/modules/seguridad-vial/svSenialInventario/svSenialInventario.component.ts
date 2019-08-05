import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvSenialInventarioService } from '../../../../services/svSenialInventario.service';
import { SvSenialBodegaService } from '../../../../services/svSenialBodega.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { SvCfgSenialTipoService } from '../../../../services/svCfgSenialTipo.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svSenialInventario.component.html'
})

export class SvSenialInventarioComponent implements OnInit {
    public errorMessage;
    public formRecord = false;
    public formNewBodega = false;
    public formNewMunicipio = false;
    public formIndex = false;
    public formSearch = true;
    public table: any = null;
    
    public municipios: any = null;
    public municipio: any = null;

    public tiposSenial: any;

    public fechaInicial: any = null;
    public fechaFinal: any = null;

    public inventarios: any = null;
    public seniales: any = null;

    public inventario: any;
    public senial: any;

    public destinos = [
        { value: 'BODEGA', label: 'BODEGA' },
        { value: 'MUNICIPIO', label: 'MUNICIPIO' },
    ];

    public datos = {
        'idTipoSenial': null,
        'idMunicipio': null,
        'tipoDestino': null,
    };
    
    constructor(
        private _SenialInventarioService: SvSenialInventarioService,
        private _BodegaService : SvSenialBodegaService,
        private _MunicipioService : CfgMunicipioService,
        private _TipoSenialService: SvCfgSenialTipoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this._TipoSenialService.select().subscribe(
                response => {
                    this.tiposSenial = response;
                },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formIndex = false;
            this.formNewBodega = false;
            this.formNewMunicipio = false;
            this.ngOnInit();
        }
    }

    getDestino(value) {
        let token = this._LoginService.getToken();
        switch (value) {
            case 'BODEGA':
                this.municipios = null;

                break;
            case 'MUNICIPIO':
                this._MunicipioService.selectByDepartamento({'idDepartamento':21}, token).subscribe(
                    response => {
                        this.municipios = response;
                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                break;
        }
    }

    onChangedMunicipio(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._MunicipioService.show({ 'id': e }, token).subscribe(
                response => {
                    this.datos.idMunicipio = response.data.id;                    
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
        }
    }

    onSearch(){
        swal({
            title: 'Buscando registros!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

        this.formIndex = true;
        this.formRecord = false;
        this.formNewBodega = false;
        this.formNewMunicipio = false;
        
        let token = this._LoginService.getToken();

        if (this.datos.tipoDestino == 'BODEGA') {
            this.datos.idMunicipio = null;
        }

        this._SenialInventarioService.searchCantidadBySenialAndTipoDestino(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.seniales = response.data;

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                    
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    swal.close();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });

                    this.seniales = null;
                }
            }
        );
    }

    onInitTable() {
        if (this.table) {
            this.table.empty();
            this.table.destroy();
        }
        
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            },
        });
    }

    onLocation(inventario) {
        this.inventario = inventario;
        this.formRecord = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    onRecord(senial, datos) {
        this.senial = senial;
        this.datos = datos;
        
        this.formRecord = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    onNewSenialMunicipio() {
        this.formNewMunicipio = true;
        this.formNewBodega = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    onNewSenialBodega() {
        this.formNewBodega = true;
        this.formNewMunicipio = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }
}