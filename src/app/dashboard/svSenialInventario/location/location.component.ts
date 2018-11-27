/// <reference types="@types/googlemaps" />
import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core'; 
import { SvSenialInventarioService } from '../../../services/svSenialInventario.service';
import { SvSenialUbicacionService } from '../../../services/svSenialUbicacion.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';
declare var $: any;
import { } from "googlemaps";
declare var google: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() inventario: any = null;
    @Input() tipoDestino: any = null;

    @ViewChild('map') mapRef: ElementRef;
    private map: google.maps.Map;
    private geocoder: google.maps.Geocoder;
    private scriptLoadingPromise: Promise<void>;

    public uploadUrl = environment.uploadUrl;
    public inventarios: any = null;

    public errorMessage;
    public formIndex = true;
    public table: any = null;

    constructor(
        private _SenialInventarioService: SvSenialInventarioService,
        private _SenialUbicacionService: SvSenialUbicacionService,
        private _loginService: LoginService
    ) { 
        //Loading script
        this.loadScriptLoadingPromise();
        //Loading other components
        this.onReady().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    }

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
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onGeo(latitud, longitud) {
        latitud = parseInt(latitud);
        longitud = parseInt(longitud);
        
        this.initMap(this.mapRef.nativeElement, {
            center: { lat: latitud, lng: longitud },
            zoom: 14,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });

        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("map")['style']['pointer-events'] = "auto";

        var marker = new google.maps.Marker({
            position: { lat: latitud, lng: longitud },
            map: this.map,
            animation: google.maps.Animation.BOUNCE,
            draggable: false
        });        
    }

    onReady(): Promise<void> {
        return this.scriptLoadingPromise;
    }

    loadScriptLoadingPromise() {
        const script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName: string = 'initMap';
        script.src = getScriptSrc(callbackName);
        this.scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>window)[callbackName] = () => { resolve(); };

            script.onerror = (error: Event) => { reject(error); };
        });
        window.document.body.appendChild(script);
    }

   initMap(mapHtmlElement: HTMLElement, options: google.maps.MapOptions): Promise<google.maps.Map> {
        return this.onReady().then(() => {
            this.map = new google.maps.Map(mapHtmlElement, options);

            /*var marker = new google.maps.Marker({
                position: { lat: 4.624335, lng: -74.063644 },
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                draggable: true
            });

            //Obtiene las coordenadas cuando se realiza clic sobre el mapa
            google.maps.event.addListener(this.map, 'click', function (event) {
                var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                marker.setPosition({ lat: 4.624335, lng: -74.063644 });               
            });*/

            return this.map
        });
    }
}

//Replace this by anything without an ID_KEY
const getScriptSrc = (callbackName) => {
    return `https://maps.googleapis.com/maps/api/js?key=AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4&callback=${callbackName}`;
}