import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from "@angular/router";



import swal from 'sweetalert2';


@Component({
    selector: 'appRna-matricula-inicial',
    templateUrl: './newRna.matriculaInicial.html',
})
export class NewRnaMatricualaInicialComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;
    
    public tramiteSolicitud:any = null;
    public tipoIdentificacionSelected: any = null;
    
    public ciudadano:any = null;
    public apoderado:any = null;
    public propietarioSelected: any;
    public apoderadoSelected:any;
    public empresa:any = null;
    
    public tipoIdentificaciones: any;
    public identificacion:any;
    public identificacionApoderado:any;
    public nit:any;
    
    public formApoderado = false;

    public tiposPropiedad = [
        { 'value': 1, 'label': 'Leasing' },
        { 'value': 2, 'label': 'Propio' },
    ];
    public tipoPropiedadSelected:any;
    
    public datos = {
        'propietarios': [],
        'solidario': false,
        'numeroLicenciaTransito': null,
        'tipoPropiedad': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _ColorService: VhloCfgColorService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VehiculoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _PropietarioService: VhloPropietarioService,
        private _EmpresaService: UserEmpresaService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.tramiteFactura = response.data;

                    swal.close();
                } else {
                    this.tramiteFactura = null;

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


        if (this.tramiteFactura.realizado) {
            let token = this._LoginService.getToken();

            this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.tramiteSolicitud = response.data;
                    } else {
                        this.tramiteSolicitud = null;

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
        }else{
            this._TipoIdentificacionService.select().subscribe(
                response => {
                    this.tipoIdentificaciones = response;
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
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }
    
    onSearchCiudadano(){
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacion,
            'idTipoIdentificacion': this.tipoIdentificacionSelected,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;

                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                } else {
                    this.ciudadano = null;

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

    onSearchApoderado(){
        swal({
            title: 'Buscando apoderado!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionApoderado,
            'idTipoIdentificacion': 1,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.apoderado = response.data.ciudadano;
                    }else{
                        this.apoderado = response.data.empresa;
                    }

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    this.apoderado = null;

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

    ononSearchEmpresa(){
        let token = this._LoginService.getToken();

        let nit = {
			'nit' : this.nit,
        };

        this._EmpresaService.showByNit(token,nit).subscribe(
            response => {
                if(response.status == 'success'){
                    this.empresa = response.data;
                    //this.empresaEncontrada= 2;
            }else{
                //this.empresaEncontrada=3;
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
    }

    goEmpresa(){
        this.router.navigate(['/dashboard/empresa']);
    }

    onAddCiudadano(){
        this.datos.propietarios.push(
            {
                'idPropietario':this.ciudadano.id,
                'identificacion':this.ciudadano.identificacion,
                'nombre':this.ciudadano.primerNombre +" "+ this.ciudadano.segundoNombre,
                'permiso': this.datos.solidario,
                'tipo': 'Ciudadano',
                'idApoderado':null,
                'apoderadoIdentificacion':null,
                'apoderado.Nombre':null,
            }   
        );
    }

    onAddEmpresa(){
        this.datos.propietarios.push(
            {
                'idPropietario':this.empresa.id,
                'identificacion':this.empresa.nit,
                'nombre':this.empresa.nombre,
                'permiso':this.datos.solidario,
                'tipo': 'Empresa',
                'idApoderado':null,
                'apoderadoIdentificacion':null,
                'apoderado.Nombre':null,
            }   
        );
    }

    onDeletePropietario(propietario:any): void {
        this.datos.propietarios =  this.datos.propietarios.filter(h => h !== propietario);
    }

    ready(isCreado:any){
        if(isCreado) {
            console.log(isCreado);
          this.onSearchCiudadano();
        }
    }
    
    onNewApoderado(propietario:any){
        let agregado = this.datos.propietarios.includes(propietario.identificacion, 1);

        if (agregado) {
            swal({
                title: 'Error!',
                text: 'El registro seleccionado ya se encuentra agregado como propietario.s',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else{
            this.formApoderado = true;
            this.propietarioSelected = this.datos.propietarios.filter(h => h == propietario);
            this.propietarioSelected = this.propietarioSelected[0];
        }
    }

    onAddApoderado(apoderado) {
        let posicion = this.datos.propietarios.indexOf(this.propietarioSelected);

        this.datos.propietarios[posicion].idApoderado = apoderado.id;
        this.datos.propietarios[posicion].apoderadoIdentificacion = apoderado.identificacion;
        this.datos.propietarios[posicion].apoderadoNombre = apoderado.primerNombre + " " + apoderado.primerApellido;        
    }

    onCancelarApoderado(){
        this.apoderado = null;
        this.formApoderado = false;
    }

    onEnviar() {
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tipoPropiedad = this.tipoPropiedadSelected;

        let token = this._LoginService.getToken();

        let resumen = "<b>No. factura: " + this.tramiteFactura.factura.numero;

        this._PropietarioService.register(this.datos, token).subscribe(
            response => {
                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                this.ngOnInit();
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
}