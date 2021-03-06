import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ImoInsumoService } from '../../../../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-insumo',
    templateUrl: './newInsumo.component.html'
})

export class NewInsumoComponent implements OnInit {
    @Output() onReadyInsumo = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() solicitante: any = null;
    @Input() idModulo: any = null;
    @Input() idTramite: any = null;
    public errorMessage;

    public realizado: any = false;
    public funcionario: any = null;
    public ciudadano: any = null;
    public insumo: any = null;
    public identificacion: any = null;
    public numero: any = null;

    public datos = {
        'entregada': false,
        'licenciaTransito': null,
        'descripcion': null,
        'idInsumo': null,
        'idCiudadano': null,
    }
    
    constructor(
        private _InsumoService: ImoInsumoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _LoginService: LoginService,
    ) { } 

    ngOnInit() {
        this.ciudadano = this.solicitante;
        console.log(this.ciudadano);
        
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.funcionario = response.data; 
                    
                    swal.close();
                } else {
                    this.funcionario = null;

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

    onSearchSustrato(){
        swal({
            title: 'Buscando sustrato!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'numero': this.numero,
            'idModulo': this.idModulo,
            'idOrganismoTransito': this.funcionario.organismoTransito.id
        }

        this._InsumoService.searchByNumeroAndModulo(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.insumo = response.data;
                    this.datos.idInsumo = response.data.id;

                    swal.close();
                }else{
                    this.insumo = null;
                    this.datos.idInsumo = null;

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
        );
    }

    onSearchCiudadano(){
        let token = this._LoginService.getToken();

        let datos = {
            'idTipoIdentificacion' : 1,
			'identificacion' : this.identificacion,
        };

        this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if(response.code == 200){
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.datos.idCiudadano = this.ciudadano.id;
                    }else{
                        this.ciudadano = null;
                        this.datos.idCiudadano = null;
                    }
                }else{
                    this.ciudadano = null;

                    swal({
                        title: 'Error!',
                        text: 'Su usuario no tiene autorización para realizar facturación!',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
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
   
    onEnviar(){       
        this.realizado = true;
        
        this.onReadyInsumo.emit(this.datos);
    }
}