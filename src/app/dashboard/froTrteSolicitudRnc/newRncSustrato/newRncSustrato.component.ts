import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { ImoInsumoService } from '../../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { log } from 'util';

@Component({
    selector: 'appRnc-sustrato',
    templateUrl: './newRncSustrato.html'
})

export class NewRncSustratoComponent implements OnInit {
    @Output() onReadyInsumo = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() solicitante: any = null;
    public errorMessage;

    public realizado: any = false;
    public funcionario: any = null;
    public ciudadano: any = null;
    public insumo: any = null;
    public identificacion: any = null;
    public numero: any = null;
    
    public datos = {
        'entregada': false,
        'licenciaConduccion': null,
        'descripcion': null,
        'idInsumo': null,
        'idCiudadano': null,
    }
    
    constructor(
        private _InsumoService: ImoInsumoService,
        private _CiudadanoService: UserCiudadanoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { } 

    ngOnInit() { 
        let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
            if (response.status == 'success') {
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
            'idModulo': 1,
            'idOrganismoTransito': this.funcionario.organismoTransito.id
        }

        this._InsumoService.searchByNumeroAndModulo(datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.insumo = response.data;
                    this.datos.idInsumo = response.data.id;

                    swal.close();
                }else{
                    this.insumo = null;
                    this.datos.idInsumo = null;

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
            'identificacion': this.identificacion,
            'idTipoIdentificacion': 1,
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
   
    onEnviar(){
        this.realizado = true;
        
        this.onReadyInsumo.emit(this.datos);
    }
}