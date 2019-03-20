import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { SustratoService } from '../../../services/sustrato.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';


import swal from 'sweetalert2';
import { log } from 'util';

@Component({
    selector: 'appRnc-sustrato',
    templateUrl: './newRncSustrato.html'
})
export class NewRncSustratoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() solicitante: any = null;
    public errorMessage;

    public respuesta;
    public sustrato: any = null;
    public sustratos: any;
    public sustratoSelected: any;
    public usuario:any;
    public estadoImpresion=true;
    public tarjetaEntregada=true;
    public ciudadanoNew = false;
    public ciudadanoEncontrado=1;
    
    public datos = {
        'solicitante': null,
        'identificacion': null,
        'licenciaConduccion': null,
        'entregada': null,
        'sustrato': null,
        'solicitanteId': null,
        'vehiculoId': null,
        'idFactura': null,
    }
    
    constructor(
        private _SustratoService: SustratoService,
        private _CiudadanoService: UserCiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
        private _LoginService: LoginService,
    ) { } 

    ngOnInit() {
        
    }

    onSearchCiudadano() {
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.datos.identificacion,
            'idTipoIdentificacion': 1,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.usuario = this.respuesta.data;
                        this.datos.solicitante = this.usuario.primerNombre + ' ' + this.usuario.primerApellido
                        this.datos.solicitanteId = this.usuario.ciudadano.id
                        this.ciudadanoEncontrado = 2;
                        this.ciudadanoNew = false;

                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                } else {
                    this.ciudadanoEncontrado = 3;
                    this.ciudadanoNew = true;

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
                        alert('Error en la petición');
                    }
                }
            }
        );
    }
   
    enviarTramite(){
        let token = this._LoginService.getToken();
        
        this.datos.entregada = this.tarjetaEntregada;
        this.datos.idFactura = this.factura.id;

        // if (this.sustrato.impresion) {
        //    this.sustrato.estado = 'Utilizado' 
        // }else{
        //    this.sustrato.estado = 'Dañado'    
        // }

        // console.log(this.identificacion);

        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos,token).subscribe(
            response => {
                this.respuesta = response;
                if(this.respuesta.status == 'success'){
                  swal({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con exito',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                  })
                }
                error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            }
        );
        
        this._SustratoService.editEstado(this.sustrato,token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onSearchSustrato(){
        swal({
            title: 'Buscando sustrato!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        this._SustratoService.showNombreSustrato(token,this.datos.sustrato).subscribe(
            response => {
                if (response.status == 'success') {
                    this.sustrato = response.data;

                    swal.close();
                }else{
                    this.sustrato = null;

                    swal({
                        title: 'Error!',
                        text: 'Sustrato no encontrado.',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
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

    ready(){
        this.ciudadanoEncontrado === 3;
    }

}