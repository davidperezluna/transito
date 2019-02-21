/// <reference types="@types/googlemaps" />
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core'; 
import { SvSenialInventarioService } from '../../../services/svSenialInventario.service';
import { SvSenialUbicacionService } from '../../../services/svSenialUbicacion.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() inventario: any = null;
    @Input() tipoDestino: any = null;

    public uploadUrl = environment.uploadUrl;
    public inventarios: any = null;

    public errorMessage;
    public formIndex = true;
    public formRecord = false;
    public formGeo = false;
    public table: any = null;

    constructor(
        private _SenialInventarioService: SvSenialInventarioService,
        private _SenialUbicacionService: SvSenialUbicacionService,
        private _loginService: LoginService
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando registros!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

        let token = this._loginService.getToken();

        this._SenialInventarioService.searchByDestino({ 'inventario': this.inventario, 'tipoDestino': this.tipoDestino }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.inventarios = response.data;

                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
                    }, 100);

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    swal.close();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                    this.inventarios = null;
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

    iniciarTabla() {
        if (this.table) {
            this.table.destroy();
        }

        this.table = $('#dataTables-example').DataTable({
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
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onGeo(inventario) {
        //this.formRecord = false;
        //this.formGeo = true;

        console.log(inventario.geolocalizacion);

        /*geolocalizacion.forEach((element: any, key: any) => {
            console.log(element);
            
            this.markers.push(
                {
                    lat: element.lat,
                    lng: element.lng,
                },
            )
        });*/
    }
}