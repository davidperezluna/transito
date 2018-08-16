import { Component, OnInit, Output, EventEmitter /**/, ElementRef, ViewChild /**/ } from '@angular/core';
// import { MsvInventarioSenialService } from '../../services/msvInventarioSenial.service';
import { LoginService } from '../../services/login.service';

// import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
// import { CfgBodegaService } from '../../services/cfgBodega.service';
// import { MunicipioService } from '../../services/municipio.service';
// import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';
//import { MsvSenialService } from '../../services/msvSenial.service'

import { MsvInventarioSenial } from './msvInventarioSenial.modelo';

//import { SedeOperativaService } from '../../services/sedeOperativa.service';

///////////////////////
import {} from 'googlemaps';
declare var google: any;
///////////////////////

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './msvInventarioSenial.component.html'
})

export class MsvInventarioSenialComponent implements OnInit {

    ///////////////////////
    @ViewChild('map') mapRef: ElementRef;
    private map: google.maps.Map;
    private geocoder: google.maps.Geocoder;
    private scriptLoadingPromise: Promise<void>;
    ///////////////////////

    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    //public id;
    public respuesta;
    public msvInventarioSenials;
    public formNew = false;
    //public formN = false;
    //public formEdit = false;
    //public comparendoForm = false;
    public formIndex = true;//false;

    public formSearch = true;
    public formAdd = true;//false;

    public table: any = null;

    public tiposDestino: any;
    public destino: any;
    public senal: any;
    public msvInventarioSenial: MsvInventarioSenial;

    public destinoSelected: any;
    public tipoDestinoSelected: any;
    public tipoSenalSelected: any;

    public fechaSelected: any;
    public unidadSelected: any;
    public colorSelected: any;
    public latitudSelected: any;
    public longitudSelected: any;
    public direccionSelected: any;
    public codigoSelected: any;
    public nombreSelected: any;
    public valorSelected: any;
    public estadoSelected: any;
    public cantidadSelected: any;

    public senalSelected: any;
    public senales: any;
    private build : any;
    public file: any;
    public senalesPorAsignar: any;
    public datos = {
        'fecha'     : null,
        'unidad'    : null,
        'color'     : null,
        'latitud'   : null,
        'longitud'  : null,
        'direccion' : null,
        'codigo'    : null,
        'nombre'    : null,
        'valor'     : null,
        'estado'    : null,
        'cantidad'  : null,

        'destinoId' : null,
        'tipoDestinoId' : null,
        'tipoSenalId' : null
    }

    private address: any;

    //public sedesOperativas: any;
    //public sedeOperativaSelected: any;
    //public sedeOperativaSuccess = false;
    //public validado = false;
    //public sedeOperativaReady = false;
    //public msvInventarioSenialReady = false;
    //public sedeOperativa: any;

    constructor(
        // private _msvInventarioSenialService: MsvInventarioSenialService,
        // private _loginService: LoginService,

        // private _cfgTipoDestinoService : CfgTipoDestinoService,
        // private _cfgBodegaService : CfgBodegaService,
        // private _municipioService : MunicipioService,
        // private _cfgTipoSenialService : CfgTipoSenialService,
        //private _msvSenialService: MsvSenialService,

        //private _sedeOperativaService: SedeOperativaService,
        /////////////////////////////////

        //////////////////////////////////
    ) { this.senalSelected = ""; this.build = {};

        /////////////////////////////////
        //Loading script
        this.loadScriptLoadingPromise();
        //Loading other components
        this.onReady().then(() => {
            this.geocoder = new google.maps.Geocoder();
        });
        /////////////////////////////
    }

    ngOnInit() {
        this.msvInventarioSenial = new MsvInventarioSenial(null, null, null, null, null, null, null, null, null);

        this.initMap(this.mapRef.nativeElement, {
            center: {lat: 4.624335, lng: -74.063644},
            zoom: 16,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });

        /*swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading()
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
            ) {
            }
        });*/

        // this._cfgTipoDestinoService.select().subscribe(
        //         response => {
        //         this.tiposDestino = response;
        //     },
        //         error => {
        //         this.errorMessage = <any>error;

        //         if(this.errorMessage != null){
        //             console.log(this.errorMessage);
        //             alert('Error en la petición');
        //         }
        //     }
        // );

        // this._cfgTipoSenialService.select().subscribe(
        //         response => {
        //         this.senal = response;
        //     },
        //         error => {
        //         this.errorMessage = <any>error;

        //         if(this.errorMessage != null){
        //             console.log(this.errorMessage);
        //             alert('Error en la petición');
        //         }
        //     }
        // );

        /*this._sedeOperativaService.getSedeOperativaSelect().subscribe(
         response => {
         this.sedesOperativas = response;
         this.sedeOperativaSuccess = false;
         this.formN = true;
         },
         error => {
         this.errorMessage = <any>error;

         if (this.errorMessage != null) {
         console.log(this.errorMessage);
         alert("Error en la petición");
         }
         }
         );*/
        // this._msvInventarioSenialService.getMsvInventarioSenial().subscribe(
        //         response => {
        //         if (response) {

        //             console.log(response);
        //             this.msvInventarioSenials = response.data;
        //             let timeoutId = setTimeout(() => {
        //                 //this.iniciarTabla();
        //             }, 100);
        //         }
        //     },
        //         error => {
        //         this.errorMessage = <any>error;

        //         if (this.errorMessage != null) {
        //             console.log(this.errorMessage);
        //             alert("Error en la petición");
        //         }
        //     }
        // );
    }


    ///////////////////////////////////
    onReady(): Promise<void> {
        return this.scriptLoadingPromise;
    }

    initMap(mapHtmlElement: HTMLElement, options: google.maps.MapOptions): Promise<google.maps.Map> {
        return this.onReady().then(() => {
            this.map = new google.maps.Map(mapHtmlElement, options);

            var marker = new google.maps.Marker({
                position: {lat: 4.624335, lng: -74.063644},
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                draggable: true
            });


                google.maps.event.addListener(this.map, 'click', function (event) {

                        var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                        marker.setPosition(newLatLng);
                        this.msvInventarioSenial.latitud   = event.latLng.lat();
                        this.msvInventarioSenial.longitud  = event.latLng.lng();

                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'latLng': event.latLng
                        }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    document.getElementById("address")['value'] = results[0].formatted_address;
                                    document.getElementsByName("direccion")[0]['value'] = results[0].formatted_address;
                                }
                            }
                        });

                });


            return this.map;

        });
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

    //////////////////////////////////

    onGeo() {
        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
        document.getElementById("map")['style']['pointer-events'] = "none";
        document.getElementById("address")['style']['visibility'] = "visible";
        document.getElementById("address").setAttribute('readonly', 'readonly');
    }

    onSearchGeo() {

        var map = new google.maps.Map(this.mapRef.nativeElement, {
            center: {lat: 4.624335, lng: -74.063644},
            zoom: 16,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            rotateControl: true,
            scaleControl: true,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
        });
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('address')['value'];
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    animation: google.maps.Animation.BOUNCE,
                    draggable: true
                });

                google.maps.event.addListener(map, 'click', function(event){

                    var newLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                    marker.setPosition(newLatLng);
                    this.msvInventarioSenial.latitud   = event.latLng.lat();
                    this.msvInventarioSenial.longitud  = event.latLng.lng();

                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'latLng': event.latLng
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                document.getElementById("address")['value'] = results[0].formatted_address;
                                document.getElementsByName("direccion")[0]['value'] = results[0].formatted_address;
                            }
                        }
                    });

                });
            } else {
                alert('La búsqueda no tuvo éxito.');
            }
        });

    }

    onCloseGeo() {
        document.getElementById("geo")['style']['visibility'] = "hidden";
        document.getElementById("address")['style']['visibility'] = "hidden";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
    }

    onAddress() {
        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("address")['style']['visibility'] = "visible";
        document.getElementById("searchAddress")['style']['visibility'] = "visible";
        document.getElementById("map")['style']['pointer-events'] = "auto";
        document.getElementById("address").removeAttribute('readonly');

    }

    obtieneDestino(value) {

        switch (value) {
            case 1:

                // this._cfgBodegaService.select().subscribe(
                //         response => {
                //         this.destino = response;
                //     },
                //         error => {
                //         this.errorMessage = <any>error;

                //         if (this.errorMessage != null) {
                //             console.log(this.errorMessage);
                //             alert('Error en la petición');
                //         }
                //     }
                // );

                break;
            case 2:

                // this._municipioService.getMunicipioSelect().subscribe(
                //         response => {
                //         this.destino = response;
                //     },
                //         error => {
                //         this.errorMessage = <any>error;

                //         if (this.errorMessage != null) {
                //             console.log(this.errorMessage);
                //             alert('Error en la petición');
                //         }
                //     }
                // );

                break;
        }

    }

    search(){
        var radios = document.getElementsByName('tipoDestino');

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        this.tipoDestinoSelected = radios[i]['value'];
                    }
                }
            }
        }

        var radios = document.getElementsByName('senal');

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        this.tipoSenalSelected = radios[i]['value'];
                    }
                }
            }
        }

        this.datos.destinoId = this.destinoSelected;
        this.datos.tipoDestinoId = this.tipoDestinoSelected;
        this.datos.tipoSenalId = this.tipoSenalSelected;

        // let token = this._loginService.getToken();
    //     this._msvInventarioSenialService.searchByParametros(this.datos,token).subscribe(
    //             response => {
    //             this.respuesta = response;
    //             if(this.respuesta.status == 'success'){ console.log(response.data);
    //                 this.senales = response.data;
    //                 //this.iniciarTabla();
    //                 this.formSearch = true;//false;
    //                 this.formIndex = true;

    //                 swal({
    //                     title: 'Perfecto',
    //                     text: "¡Señales encontradas!",
    //                     type: 'info',
    //                     showCloseButton: true,
    //                     focusConfirm: false,
    //                     confirmButtonText:
    //                         '<i class="fa fa-thumbs-up"></i> OK!',
    //                     confirmButtonAriaLabel: 'Thumbs up, great!',
    //                     cancelButtonText:
    //                         '<i class="fa fa-thumbs-down"></i>',
    //                     cancelButtonAriaLabel: 'Thumbs down',
    //                 });
    //             }else{
    //                 swal({
    //                     title: 'Alerta',
    //                     text: "¡No existen señales, por favor registrela y vuelva hacer una búsqueda!",
    //                     type: 'warning',
    //                     showCancelButton: true,
    //                     focusConfirm: true,
    //                     confirmButtonText:
    //                         '<i class="fa fa-thumbs-up"></i> Registrar',
    //                     confirmButtonAriaLabel: 'Thumbs up, great!',
    //                     cancelButtonText:
    //                         '<i class="fa fa-thumbs-down"></i> Cancelar',
    //                     cancelButtonAriaLabel: 'Thumbs down',
    //                 }).then((result) => {
    //                     if (result.value) {
    //                         this.formNew = true;
    //                         this.formSearch = false;
    //                     }
    //                 });
    //             }
    //                 error => {
    //                 this.errorMessage = <any>error;
    //                 if(this.errorMessage != null){
    //                     console.log(this.errorMessage);
    //                     alert("Error en la petición");
    //                 }
    //             }

    //         });
    // }

    // onAdd(){

    //     this._msvInventarioSenialService.searchByFull().subscribe(
    //             response => {
    //             if(response!=""){
    //                 var checkboxParent = document.getElementsByName('_senalParent_')[0];

    //                 console.log(response);}
    //             this.senalesPorAsignar = response;
    //             this.formAdd = true;
    //             this.formIndex = true;//false;
    //         },
    //             error => {
    //             this.errorMessage = <any>error;

    //             if (this.errorMessage != null) {
    //                 console.log(this.errorMessage);
    //                 alert('Error en la petición');
    //             }
    //         }
    //     );

    }

    checkAll(e){

        var checkboxParent = document.getElementsByName('_senalParent_')[0]['checked'];
        var checkboxes = document.getElementsByName('_senal_');

        for (var i in checkboxes){
            for(var item in checkboxes[i]){
                if(typeof checkboxes[i]['checked'] !== 'undefined') {
                    if (!checkboxes[i]['checked']) {
                        checkboxes[i]['checked'] = true;
                        this.build[checkboxes[i]['value']] = checkboxes[i]['value'];
                    } else {
                        checkboxes[i]['checked'] = false;
                        delete this.build[checkboxes[i]['value']];
                    }
                    if (checkboxParent){
                        checkboxes[i]['checked'] = true;
                        this.build[checkboxes[i]['value']] = checkboxes[i]['value'];
                    } else {
                        checkboxes[i]['checked'] = false;
                        delete this.build[checkboxes[i]['value']];
                    }
                }
            }
        }

    }

    check(e){

        if(e.target.checked){
            this.build[e.target.value] = e.target.value;
        } else {
            delete this.build[e.target.value];
        }

    }

    onFileChange(event) {
        if(event.target.files.length > 0) {
            const fileSelected: File = event.target.files[0];

            this.file = new FormData();
            this.file.append('file', fileSelected);
        }
    }

    onExport(){
        // this._msvInventarioSenialService.export();
    }

    onSend() {
        // let token = this._loginService.getToken();

        this.msvInventarioSenial.fecha     = this.fechaSelected;
        this.msvInventarioSenial.unidad    = this.unidadSelected;
        this.msvInventarioSenial.color     = this.colorSelected;
        this.msvInventarioSenial.direccion = this.direccionSelected;
        this.msvInventarioSenial.codigo    = this.codigoSelected;
        this.msvInventarioSenial.nombre    = this.nombreSelected;
        this.msvInventarioSenial.valor     = this.valorSelected;
        this.msvInventarioSenial.estado    = this.estadoSelected;
        this.msvInventarioSenial.cantidad  = this.cantidadSelected;

        //for (var i in this.build) {
        //  this.senalSelected += this.build[i] + ',';
        //}

        //this.msvInventarioSenial.inventarioSenialId = this.senalSelected.slice(0, -1);

        var valid = "";

        if (this.msvInventarioSenial.fecha == "") {
            valid += "Debe seleccionar una fecha.\n";
        }
        if (this.msvInventarioSenial.unidad == "" ) {
            valid += "Debe ingresar una unidad.\n";
        }
        if (this.msvInventarioSenial.color == "" ) {
            valid += "Debe ingresar un color.\n";
        }
        if (this.msvInventarioSenial.direccion == "" ) {
            valid += "Debe seleccionar una dirección.\n";
        }
        if (this.msvInventarioSenial.codigo == "" ) {
            valid += "Debe ingresar un código.\n";
        }
        if (this.msvInventarioSenial.nombre == "" ) {
            valid += "Debe ingresar un nombre.\n";
        }
        if (this.msvInventarioSenial.valor == 0 ) {
            valid += "Debe ingresar un valor.\n";
        }
        if (this.msvInventarioSenial.estado == "" ) {
            valid += "Debe ingresar un estado.\n";
        }
        if (this.msvInventarioSenial.cantidad == 0 ) {
            valid += "Debe ingresar una cantidad.\n";
        }
        if(this.file == null){
            valid += "Debe seleccionar un logo.\n";
        }
        //if (this.msvInventarioSenial.inventarioSenialId == "") {
        //  valid += "Debe seleccionar la señal(es) que desea agregar al inventario.";
        //}

        if(valid != ""){
            swal({
                title: 'Advertencia',
                text: valid,
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else {

            //if(this.funcionario.activo == 'true'){
            // this._msvInventarioSenialService.register(this.file, this.msvInventarioSenial, token).subscribe(
            //         response => {

            //         this.respuesta = response;
            //         //this.formConfirm = false;
            //         //this.formPdf = true;

            //         if (this.respuesta.status == 'success') {
            //             this.ready.emit(true);
            //             swal({
            //                 title: 'Perfecto!',
            //                 text: 'Registro exitoso!',
            //                 type: 'success',
            //                 confirmButtonText: 'Aceptar'
            //             });
            //             this.onAdd();
            //         } else {
            //             swal({
            //                 title: 'Error!',
            //                 text: 'La señal ya se encuentra registrada',
            //                 type: 'error',
            //                 confirmButtonText: 'Aceptar'
            //             })
            //         }
            //             error => {
            //             this.errorMessage = <any>error;
            //             if (this.errorMessage != null) {
            //                 console.log(this.errorMessage);
            //                 alert("Error en la petición");
            //             }
            //         }
            //     });
            //}else{
            //  this.formConfirm = true;
            //this.formPdf = false;
            //}
        }
        this.senalSelected = "";
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
            },
        });
        this.table = $('#dataTables-example').DataTable();
    }
    /*onNew() {
     this.formNew = true;
     this.formN = false;
     this.formIndex = false;
     if (this.table) {
     this.table.destroy();
     }
     }*/


    /*myFunc() {
     console.log("asd");
     }*/

    /*calcularTotal() {
     let ini, fin, total;
     ini = 0;
     fin = 0;
     total = 0;
     ini = this.msvInventarioSenial.rangoini;
     fin = this.msvInventarioSenial.rangofin;
     total = (fin-ini)+1;
     console.log(total);
     if (total<0) {
     total=0;

     }
     this.msvInventarioSenial.total = total;

     }*/

    /*ready(isCreado: any) {
     if (isCreado) {
     this.formNew = false;
     this.formN = false;
     this.formEdit = false;
     this.formIndex = true;
     this.ngOnInit();
     }
     }*/
    /*deleteMsvInventarioSenial(id: any) {

     swal({
     title: '¿Estás seguro?',
     text: "¡Se eliminara este registro!",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#15d4be',
     cancelButtonColor: '#ff6262',
     confirmButtonText: 'Confirmar',
     cancelButtonText: 'Cancelar'
     }).then((result) => {
     if (result.value) {
     let token = this._loginService.getToken();
     this._msvInventarioSenialService.deleteMsvInventarioSenial(token, id).subscribe(
     response => {
     swal({
     title: 'Eliminado!',
     text: 'Registro eliminado correctamente.',
     type: 'success',
     confirmButtonColor: '#15d4be',
     })
     this.table.destroy();
     this.respuesta = response;
     this.ngOnInit();
     },
     error => {
     this.errorMessage = <any>error;

     if (this.errorMessage != null) {
     console.log(this.errorMessage);
     alert("Error en la petición");
     }
     }
     );


     }
     })
     }

     editMsvInventarioSenial(msvInventarioSenial: any) {
     console.log(msvInventarioSenial);

     this.msvInventarioSenial = msvInventarioSenial;

     this.formEdit = true;
     this.formIndex = false;
     }*/


    /* onEnviar() {
     let token = this._loginService.getToken();
     this.msvInventarioSenial.rangoini = this.msvInventarioSenial.rangoini;
     this.msvInventarioSenial.rangofin = this.msvInventarioSenial.rangofin;
     this.msvInventarioSenial.total = this.msvInventarioSenial.total;
     this.msvInventarioSenial.fechaAsignacion = this.msvInventarioSenial.fechaAsignacion;
     this.msvInventarioSenial.nResolucion = this.msvInventarioSenial.nResolucion;
     this.msvInventarioSenial.sedeOperativaId = this.sedeOperativaSelected;
     this._msvInventarioSenialService.register(this.msvInventarioSenial, token).subscribe(
     response => {
     //console.log(response);
     this.respuesta = response;
     console.log(this.respuesta);
     if (this.respuesta.status == 'success') {
     this.ready.emit(true);
     swal({
     title: 'Perfecto!',
     text: 'El registro se ha agregado con exito',
     type: 'success',
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

     });
     }*/


    /*changedSedeOperativa(e) {

     this.validado = false;
     if (e) {
     let token = this._loginService.getToken();
     this._sedeOperativaService.showSedeOperativa(token, e).subscribe(
     response => {
     this.sedeOperativa = response;
     this.sedeOperativaReady = true;
     //          this.msvInventarioSenial.rangoini = this.sedeOperativa.data.
     //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
     console.log(this.sedeOperativa);
     },
     error => {
     this.errorMessage = <any>error;

     if (this.errorMessage != null) {
     console.log(this.errorMessage);
     alert("Error en la petición");
     }
     }
     );

     this._msvInventarioSenialService.showMsvInventarioSenialPorSedeOperativa(token, e).subscribe(
     response => {
     this.sedeOperativaSuccess = true;
     if (response.status=="success") {

     this.msvInventarioSenial = response.data;

     this.msvInventarioSenialReady = true;
     this.msvInventarioSenial.fechaAsignacion = this.msvInventarioSenial.fechaAsignacion;

     //this.comparendo.numeroOrden = this.sedeOperativa.data.codigoDivipo;
     console.log(this.msvInventarioSenial);
     }
     else if (response.status=="vacio") {
     this.msvInventarioSenial = new MsvInventarioSenial(0,0,0,"","",0);
     }
     },
     error => {
     this.errorMessage = <any>error;

     if (this.errorMessage != null) {
     console.log(this.errorMessage);
     alert("Error en la petición");
     }
     }
     );
     }
     }*/

}

//Replace this by anything without an ID_KEY
const getScriptSrc = (callbackName) => {
    return `https://maps.googleapis.com/maps/api/js?key=AIzaSyCtuWhMCvnxqo7FZiK6N5gdkrZQF5j_5Wo&callback=${callbackName}`;
}