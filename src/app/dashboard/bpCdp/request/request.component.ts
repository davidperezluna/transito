import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BpCdp } from '../bpCdp.modelo';
import { BpCdpService } from '../../../services/bpCdp.service';
import { BpProyectoService } from '../../../services/bpProyecto.service';
import { BpActividadService } from '../../../services/bpActividad.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public cdp: BpCdp;
    public errorMessage;
    public numeroProyecto: any;
    public proyecto: any;
    public actividades: any;
    public formSearch: any;
    public formNew: any;

    public datos = {
        'idActividad': null
    };

constructor(
  private _CdpService: BpCdpService,
  private _ProyectoService: BpProyectoService,
  private _ActividadService: BpActividadService,
  private _loginService: LoginService,
  ){}

    ngOnInit() {
        this.cdp = new BpCdp(null, null);

        this.numeroProyecto = null;
        this.proyecto = null;
        this.actividades = null;
        this.formSearch = true;
        this.formNew = false;
    }

    searchProyecto() {
        swal({
            title: 'Buscando proyecto!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._loginService.getToken();

        this._ProyectoService.searchByNumero({ 'numero': this.numeroProyecto}, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.proyecto = response.data;

                    this._ActividadService.select({ 'idProyecto': this.proyecto.id }, token).subscribe(
                        response => {
                                this.actividades = response;
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }

                                this.actividades = null;
                            }

                        }
                    );

                    swal.close();
                }else{
                    swal({
                        title: 'Sin propietarios!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });

                    this.proyecto = null;
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

    onCancelar(){
        this.ready.emit(true);
    }
    
    onEnviar(){
        let token = this._loginService.getToken();
        
        this._CdpService.request(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.ngOnInit();
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
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