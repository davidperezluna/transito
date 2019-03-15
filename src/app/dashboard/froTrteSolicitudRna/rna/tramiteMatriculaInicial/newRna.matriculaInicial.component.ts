import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
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
    public tipoPropiedadSelected:any;
    public tipoIdentificacionSelected: any = null;
    
    public ciudadano:any = null;
    public apoderado:any = null;
    public ciudadanoSelected:any;
    public apoderadoSelected:any;
    public empresa:any = null;
    public empresaSelected:any;
    public nit:any;

    public identificacion:any;
    public identificacionApoderado:any;

    public listaPropietariosCiudadanos=false;
    public listaPropietariosEmpresas=false;
    
    public propietario = true;
    public propietarioPresente = false;

    public tipoPropiedades= [
        {'value':1,'label':"Leasing"},
        {'value':2,'label':"Propio"}
    ];

    public tipoIdentificaciones: any;
    
    public datos = {
        'propietariosEmpresas': [],
        'propietariosCiudadanos': [],
        'solidario': false,
        'vehiculo': null,
        'numeroLicencia': null,
        'tipoPropiedad': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _ColorService: VhloCfgColorService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _PropietarioService: VhloPropietarioService,
        private _EmpresaService: UserEmpresaService,
        private _loginService: LoginService,
        private router: Router,
    ) { }

    ngOnInit() {
        if (this.tramiteFactura.realizado) {
            let token = this._loginService.getToken();

            this._TramiteSolicitudService.showByTamiteFactura({ 'idtramiteFactura': this.tramiteFactura.id }, token).subscribe(
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
    
    onEnviar(){
      
        this.datos.vehiculo = this.vehiculo.placa;
        this.datos.numeroLicencia = this.tramiteFactura.numeroLicenciaTrancito;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tipoPropiedad = this.tipoPropiedadSelected;

        let token = this._loginService.getToken();

        let resumen = "<b>No. factura: " + this.tramiteFactura.factura.numero;
        
        this._PropietarioService.register(this.datos, token).subscribe(
            response => {
                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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
    
    onSearchCiudadano(){
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

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
        
        /*this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.ciudadano = response.data;
                    this.ciudadanoEncontrado= 2;
                    this.ciudadanoNew = false;
            }else{
                this.ciudadanoEncontrado=3;
                this.ciudadanoNew = true;
            }
            error => {
                    this.errorMessage = <any>error;
                
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
        }); */
    }

    onSearchApoderado(){
        let token = this._loginService.getToken();

        let datos = {
            'identificacion': this.identificacionApoderado,
            'idTipoIdentificacion': this.tipoIdentificacionSelected,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.apoderado = response.data.ciudadano;

                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    }
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

        /*
        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.apoderadoSelected = response.data;

                    // this.ciudadanoNew = false;
            }else{
                this.apoderadoEncontrado=3;
                // this.ciudadanoNew = true;
            }
            error => {
                    this.errorMessage = <any>error;
                
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
        }); */
    }

    ononSearchEmpresa(){
        let token = this._loginService.getToken();

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
        }); 
    }


    goEmpresa(){
        this.router.navigate(['/dashboard/empresa']);
    }

    btnNewCiudadano(){
        if (this.tipoPropiedadSelected == 2) {
            this.datos.propietariosCiudadanos.push(
                {'identificacion':this.ciudadano.identificacion,
                'nombre':this.ciudadano.primerNombre+" "+this.ciudadano.segundoNombre,
                'permisoTramite':this.datos.solidario,
                'propietarioPresente':this.propietarioPresente
                }   
            );
        }else{
            this.datos.propietariosCiudadanos.push(
                    {'identificacion':this.ciudadano.identificacion,
                    'nombre':this.ciudadano.primerNombre+" "+this.ciudadano.segundoNombre,
                    'permisoTramite':this.propietario
                }   
            );
            if (this.propietario) {
                this.propietario = false
            }
        }

        //this.ciudadanoEncontrado=1;
        this.listaPropietariosCiudadanos=true;
    }

    btnNewEmpresa(){
        if (this.tipoPropiedadSelected == 2) {
            this.datos.propietariosEmpresas.push(
                {'nit':this.empresa.nit,
                'nombre':this.empresa.nombre,
                'permisoTramite':this.datos.solidario,
                'propietarioPresente':this.propietarioPresente
                }   
            );
        }else{
            this.datos.propietariosEmpresas.push(
                    {'nit':this.empresa.nit,
                    'nombre':this.empresa.nombre,
                    'permisoTramite':this.propietario
                }   
            );
            if (this.propietario) {
                this.propietario = false
            }
        }   
        //this.empresaEncontrada=1;
        this.listaPropietariosEmpresas=true;
    }

    btnNewApoderado(){
        if (this.apoderado == 'ciudadano') {
            this.datos.propietariosCiudadanos =  this.datos.propietariosCiudadanos.filter(h => h !== this.ciudadanoSelected[0]);
            this.datos.propietariosCiudadanos.push(
                {'identificacion':this.ciudadanoSelected[0].identificacion,
                'nombre':this.ciudadanoSelected[0].nombre,
                'permisoTramite':this.ciudadanoSelected[0].permisoTramite,
                'propietarioPresente':this.ciudadanoSelected[0].propietarioPresente,
                'identificacionApoderado':this.apoderadoSelected.identificacion,
                'nombreApoderado':this.apoderadoSelected.primerNombre+" "+this.apoderadoSelected.segundoNombre,
                }   
            )
            this.apoderado = 'false'
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaPropietariosCiudadanos=true;
        }
        if (this.apoderado == 'empresa') {
            this.datos.propietariosEmpresas =  this.datos.propietariosEmpresas.filter(h => h !== this.empresaSelected[0]);
            this.datos.propietariosEmpresas.push(
                {'nit':this.empresaSelected[0].nit,
                'nombre':this.empresaSelected[0].nombre,
                'permisoTramite':this.empresaSelected[0].permisoTramite,
                'identificacionApoderado':this.apoderadoSelected.identificacion,
                'nombreApoderado':this.apoderadoSelected.primerNombre+" "+this.apoderadoSelected.segundoNombre,
                }   
            );
            this.apoderado = 'false'
            this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
            this.listaPropietariosEmpresas=true;
        }
    }

    

    changedtipoIdentificacion(e){
        //this.ciudadanoEncontrado = 1;
        //this.empresaEncontrada = 1;
    }

    btnCancelarCiudadano(){
        //this.ciudadanoEncontrado = 1
    }
    
    btnCancelarEmpresa(){
        //this.empresaEncontrada = 1
    }

    delete(ciudadano:any): void {
        this.datos.propietariosCiudadanos =  this.datos.propietariosCiudadanos.filter(h => h !== ciudadano);
        if (this.datos.propietariosCiudadanos.length === 0) {
            this.listaPropietariosCiudadanos = false;
        }
        if(ciudadano.permisoTramite){
            this.propietario = true;
        }
    }
    deleteEmpresa(empresa:any): void {
        this.datos.propietariosEmpresas =  this.datos.propietariosEmpresas.filter(h => h !== empresa);
        if (this.datos.propietariosEmpresas.length === 0) {
            this.listaPropietariosEmpresas = false;
        }
        if(empresa.permisoTramite){
            this.propietario = true;
        }
    }

    ready(isCreado:any){
        if(isCreado) {
            console.log(isCreado);
          this.onSearchCiudadano();
        }
    }
    
    agregarApoderadoCiudadano(ciudadano:any){
        this.apoderado = 'ciudadano';
        this.ciudadanoSelected = this.datos.propietariosCiudadanos.filter(h => h == ciudadano);
        console.log(this.ciudadanoSelected[0]);
    }

    agregarApoderadoEmpresa(empresa:any){
        this.apoderado = 'empresa';
        this.empresaSelected = this.datos.propietariosEmpresas.filter(h => h == empresa);
        console.log(this.empresaSelected[0]);
    }
    onCancelarApoderado(){
        this.apoderado = 'false'
        this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
        console.log(this.tipoIdentificacionSelected);
    }


}