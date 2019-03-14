import { Component , OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { CiudadanoVehiculoService } from '../../../../services/ciudadanoVehiculo.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { Router } from "@angular/router";
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';



import swal from 'sweetalert2';


@Component({
    selector: 'appRna-cambio-acreedor-prendario-propietario',
    templateUrl: './newRna.CambioAcreedorPrendarioPropietario.html'
})
export class NewRnaTramiteCambioAcreedorPrendarioPropietarioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public colores: any;
    public tramiteFacturaSelected: any;
    public tipoPropiedadSelected:any;
    public ciudadano:any;
    public apoderadoSelected:any;
    public empresa:any;
    public empresaSelected:any;
    public identificacion:any;
    public identificacionApoderado:any;
    public ciudadanoEncontrado=1;
    public apoderadoEncontrado=1;
    public empresaEncontrada=1;
    public nit:any;
    public tipoIdentificacionSelected=null;
    public listaPropietariosCiudadanos=false;
    public listaPropietariosEmpresas=false;
    public ciudadanoNew = false;
    public propietario = true;
    public propietarioPresente = false;
    public ciudadanoSelected:any;
    public apoderado = 'false';
    public tipoPropiedades= [
        {'value':1,'label':"Leasing"},
        {'value':2,'label':"Propio"}
    ];
    public tipoIdentificaciones= [ ];
    public resumen = {};     public datos = {
        'propietariosEmpresas': [],
        'propietariosCiudadanos': [],
        'solidario': false,
        'vehiculo': null,
        'sustrato': null,
        'numeroLicencia': null,
        'tramiteFormulario': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
        private router: Router,
        private _EmpresaService: UserEmpresaService,
    ) { }

    ngOnInit() {

        this._TipoIdentificacionService.select().subscribe(
            response => {
              this.tipoIdentificaciones = response;
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
    
    enviarTramite(){
        this.datos.vehiculo = this.vehiculo.placa;
        this.datos.numeroLicencia = this.tramiteFactura.numeroLicenciaTrancito;
        let token = this._loginService.getToken(); 
        this._CiudadanoVehiculoService.register(token,this.datos,this.tipoPropiedadSelected).subscribe(
            response => {
                 this.datos.idTramiteFactura = this.tramiteFactura.id;
                this.datos.tramiteFormulario = 'rna-modificacion-acreedor-prendario-propietario';
                this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }
    
    onKeyCiudadano(){
        let token = this._loginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.identificacion,
        };
        this._UserCiudadanoService.searchByIdentificacion(identificacion, token).subscribe(
            response => {
                response = response; 
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
        }); 
    }

    onKeyApoderado(){
        let token = this._loginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.identificacionApoderado,
        };
        this._UserCiudadanoService.searchByIdentificacion(token,identificacion).subscribe(
            response => {
                response = response; 
                if(response.status == 'success'){
                    this.apoderadoSelected = response.data;
                    this.apoderadoEncontrado= 2;
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
        }); 
    }

    onKeyEmpresa(){
        let token = this._loginService.getToken();
        let nit = {
			'nit' : this.nit,
        };
        this._EmpresaService.showByNit(token, nit).subscribe(
            response => {
                response = response; 
                if(response.status == 'success'){
                    this.empresa = response.data;
                    this.empresaEncontrada= 2;
            }else{
                this.empresaEncontrada=3;
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
        console.log(this.datos.propietariosCiudadanos);
        this.ciudadanoEncontrado=1;
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
        this.empresaEncontrada=1;
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
        this.ciudadanoEncontrado = 1;
        this.empresaEncontrada = 1;
    }

    btnCancelarCiudadano(){
        this.ciudadanoEncontrado = 1
    }
    
    btnCancelarEmpresa(){
        this.empresaEncontrada = 1
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
          this.onKeyCiudadano();
        }else{
           this.ciudadanoNew = false; 
        }
    }
    
    agregarApoderadoCiudadano(ciudadano:any){
        this.apoderado = 'ciudadano';
        this.ciudadanoSelected = this.datos.propietariosCiudadanos.filter(h => h == ciudadano);
    }

    agregarApoderadoEmpresa(empresa:any){
        this.apoderado = 'empresa';
        this.empresaSelected = this.datos.propietariosEmpresas.filter(h => h == empresa);
    }
    onCancelarApoderado(){
        this.apoderado = 'false'
        this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
    }


}