import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../../services/login.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';


@Component({
    selector: 'app-matricula-inicial',
    templateUrl: './new.matriculaInicial.html',
})
export class NewMatricualaInicialComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud:any = null;
    public tipoIdentificacionSelected: any = null;
    
    public ciudadano:any = null;
    public apoderado:any = null;
    public propietarioSelected: any;
    public apoderadoSelected:any;
    public empresa:any = null;
    
    public tiposIdentificacion: any;
    public identificacion:any;
    public identificacionApoderado:any;
    public nit:any;
    
    public formApoderado = false;
    public formCiudadano = false;

    public tiposPropiedad = [
        { 'value': 1, 'label': 'Leasing' },
        { 'value': 2, 'label': 'Propio' },
    ];

    public tipoPropiedadSelected:any;
    
    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'propietarios': [],
        'solidario': false,
        'cantidadPlacas': null,
        'tipoPropiedad': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _PropietarioService: VhloPropietarioService,
        private _VhloVehiculoService: VhloVehiculoService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _EmpresaService: UserEmpresaService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                    return tramiteRealizado[key];
                });
                
                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else{
            this._TipoIdentificacionService.select().subscribe(
                response => {
                    this.tiposIdentificacion = response;
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
                        this.empresa = null;

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

    onSearchEmpresa(){
        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.nit,
            'idTipoIdentificacion': 4,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.empresa) {
                        this.empresa = response.data.empresa;
                        this.ciudadano = null;
                    }else{
                        this.empresa = null;
                    }

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    this.empresa = null;

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

    goEmpresa(){
        this.router.navigate(['/dashboard/empresa']);
    }

    onAddCiudadano(){
        this.datos.propietarios.push(
            {
                'id':this.ciudadano.id,
                'identificacion':this.ciudadano.identificacion,
                'nombre':this.ciudadano.primerNombre +" "+ this.ciudadano.segundoNombre,
                'permiso': this.datos.solidario,
                'tipo': 'Ciudadano',
                'idApoderado':null,
                'apoderadoIdentificacion':null,
                'apoderado.Nombre':null,
            }   
        );

        swal({
            title: 'Perfecto!',
            text: 'Ciudadano agregado con éxito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
        });

        this.ciudadano = null;
    }

    onAddEmpresa(){
        this.datos.propietarios.push(
            {
                'id':this.empresa.id,
                'identificacion':this.empresa.nit,
                'nombre':this.empresa.nombre,
                'permiso':this.datos.solidario,
                'tipo': 'Empresa',
                'idApoderado':null,
                'apoderadoIdentificacion':null,
                'apoderado.Nombre':null,
            }
        );

        swal({
            title: 'Perfecto!',
            text: 'Empresa agregada con éxito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
        });

        this.empresa = null;
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
                text: 'El registro seleccionado ya se encuentra agregado como propietario.',
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

        this.formApoderado = false;

        swal({
            title: 'Perfecto!',
            text: 'Apoderado agregado con éxito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    onCancelarApoderado(){
        this.apoderado = null;
        this.formApoderado = false;
    }

    onEnviar() {
        this.datos.campos = ['matriculaInicial'];
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.tipoPropiedad = this.tipoPropiedadSelected;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        let resumen = "<b>No. factura: " + this.tramiteFactura.factura.numero;

        this.realizado = true;

        this.onReadyTramite.emit(
            {
                'documentacion':this.datos.documentacion, 
                'observacion':this.datos.observacion, 
                'foraneas':this.datos, 
                'resumen':resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );

        /*this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {

                this._PropietarioService.register(this.datos, token).subscribe(
                    response => {
                        
                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );
              }else{
                swal({
                  title: 'Error!',
                  text: response.message,
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
        );*/
    }
}