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
    public formNewBodega = false;
    public formNewMunicipio = false;
    public formIndex = false;
    public formSearch = true;
    public table: any = null;
    
    public destinoSelected: any;
    
    public municipios: any = null;
    public municipioSelected: any;

    public tiposSenial: any;
    public tipoSenialSelected: any;

    public inventariosBodega: any = null;
    public inventariosMunicipio: any = null;
    public inventario: any;

    public destinos = [
        { value: 'BODEGA', label: 'BODEGA' },
        { value: 'MUNICIPIO', label: 'MUNICIPIO' },
    ];

    
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
            this.formLocationSenial = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    getDestino(value) {
        switch (value) {
            case 1:
                this.municipios = null;
                    
                break;
            case 2:
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
        this.formIndex = true;
        
        let token = this._loginService.getToken();

        if (this.destinoSelected == 'BODEGA') {
            this._SenialInventarioService.searchByTipoSenialInBodega({'idTipoSenial': this.tipoSenialSelected}, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.inventariosBodega = response.data;
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    }else {
                        swal({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'warning',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }
            );
        }else{
            this._SenialInventarioService.searchByTipoSenialInMunicipio({ 'idTipoSenial': this.tipoSenialSelected, 'idMunicipio': this.municipioSelected }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.inventariosMunicipio = response.data;
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
                        swal({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'warning',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }
            );
        }
    }

    iniciarTabla() {
        $('#dataTables-example').DataTable({
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
        this.table = $('#dataTables-example').DataTable();
    }

    onLocation(inventario) {
        this.inventario = inventario;
        this.formLocationSenial = true;
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