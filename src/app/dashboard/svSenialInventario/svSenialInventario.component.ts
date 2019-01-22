import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvSenialInventarioService } from '../../services/svSenialInventario.service';
import { CfgBodegaService } from '../../services/cfgBodega.service';
import { MunicipioService } from '../../services/municipio.service';
import { SvCfgSenialTipoService } from '../../services/svCfgSenialTipo.service';
import { LoginService } from '../../services/login.service';


import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './svSenialInventario.component.html'
})

export class SvSenialInventarioComponent implements OnInit {
    public errorMessage;
    public formLocationSenial = false;
    public formRecord = false;
    public formNewBodega = false;
    public formNewMunicipio = false;
    public formIndex = false;
    public formSearch = true;
    public table: any = null;
    
    public municipios: any = null;

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
        private _loginService: LoginService,
        private _SenialInventarioService: SvSenialInventarioService,
        private _BodegaService : CfgBodegaService,
        private _MunicipioService : MunicipioService,
        private _TipoSenialService: SvCfgSenialTipoService,
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
            this.formLocationSenial = false;
            this.ngOnInit();
        }
    }

    getDestino(value) {
        switch (value) {
            case 'BODEGA':
                this.municipios = null;

                break;
            case 'MUNICIPIO':
                this._MunicipioService.getMunicipioPorDepartamentoSelect(21).subscribe(
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

    onSearch(){
        swal({
            title: 'Buscando registros!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

        this.formIndex = true;
        this.formLocationSenial = false;
        this.formRecord = false;
        this.formNewBodega = false;
        this.formNewMunicipio = false;
        
        let token = this._loginService.getToken();

        if (this.datos.tipoDestino == 'BODEGA') {
            this.datos.idMunicipio = null;
        }

        this._SenialInventarioService.searchCantidadBySenialAndTipoDestino(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.seniales = response.data;

                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
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

    iniciarTabla() {
        if (this.table) {
            this.table.destroy();
        }
        
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            },
        });
    }

    onLocation(inventario) {
        this.inventario = inventario;
        this.formLocationSenial = true;
        this.formRecord = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    onRecord(senial) {
        this.senial = senial;
        this.formRecord = true;
        this.formLocationSenial = false;
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