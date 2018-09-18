import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvSenialInventarioService } from '../../services/msvSenialInventario.service';
import { MsvSenialUbicacionService } from '../../services/msvSenialUbicacion.service';
import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
import { CfgBodegaService } from '../../services/cfgBodega.service';
import { MunicipioService } from '../../services/municipio.service';
import { CfgSvSenialTipoService } from '../../services/cfgSvSenialTipo.service';
import { LoginService } from '../../services/login.service';


import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './msvSenialInventario.component.html'
})

export class MsvSenialInventarioComponent implements OnInit {
    public errorMessage;
    public respuesta;
    public formNewSenialBodega = false;
    public formNewSenialMunicipio = false;
    public formIndex = false;
    public formSearch = true;
    public table: any = null;
    
    public tiposDestino: any;
    public tipoDestinoSelected: any;
    
    public municipios: any = null;
    public municipioSelected: any;

    public tiposSenial: any;
    public tipoSenialSelected: any;

    public inventariosBodega: any = null;
    public inventariosMunicipio: any = null;

    
    constructor(
        private _loginService: LoginService,
        private _SenialInventarioService: MsvSenialInventarioService,
        private _SenialUbicacionService : MsvSenialUbicacionService,
        private _TipoDestinoService : CfgTipoDestinoService,
        private _BodegaService : CfgBodegaService,
        private _MunicipioService : MunicipioService,
        private _TipoSenialService: CfgSvSenialTipoService,
    ) { }

    ngOnInit() {
        this._TipoDestinoService.select().subscribe(
                response => {
                this.tiposDestino = response;
            },
                error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

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
            this.formNewSenialBodega = false;
            this.formNewSenialMunicipio = false;
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

        if (this.tipoDestinoSelected == 1) {
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
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
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

    onNewSenialBodega() {
        this.formNewSenialBodega = true;
        this.formNewSenialMunicipio = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }
    
    onNewSenialMunicipio() {
        this.formNewSenialMunicipio = true;
        this.formNewSenialBodega = false;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }
}