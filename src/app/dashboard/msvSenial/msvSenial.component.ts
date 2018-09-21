/// <reference types="@types/googlemaps" />
import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { MsvSenialService } from '../../services/msvSenial.service';
import { LoginService } from '../../services/login.service';

 import { environment } from 'environments/environment';
 import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
 import { CfgBodegaService } from '../../services/cfgBodega.service';
 import { MunicipioService } from '../../services/municipio.service';
 import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';
 //import { MsvInventarioSenialService } from '../../services/msvInventarioSenial.service'

 import { MsvSenial } from './msvSenial.modelo';

///////////////////////
import { } from "googlemaps";
declare var google: any;
///////////////////////

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvSenial.component.html'
})

export class MsvSenialComponent implements OnInit {

  ///////////////////////
  @ViewChild('map') mapRef: ElementRef;
  private map: google.maps.Map;
  private geocoder: google.maps.Geocoder;
  private scriptLoadingPromise: Promise<void>;
  ///////////////////////
  private idInv: any;
  private dateInv: any;

  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  //public id;
  public respuesta;
  public msvSeniales;
  public formNew = false;
  public formIndex = true;

    public formSearch = true;

  public table: any = null;

    public tiposDestino: any;
    public destino: any;
    public senal: any;
    public msvSenial: MsvSenial;
    public destinoSelected: any;
    public tipoDestinoSelected: any;
    public tipoSenalSelected: any;
    public senalSelected: any;
    public senales: any;
    private build : any;
    public file: any;

    public senalesPorAsignar: any;
    public senalesPorInventario: any;

    public resumen = {};     public datos = {
        'destinoId' : null,
        'tipoDestinoId' : null,
        'tipoSenalId' : null
    }

    public datInv = {
        'idInv' : null,
        'dateInv' : null,
        'typeSen' : null
    }

  constructor(
      private _msvSenialService: MsvSenialService,
      private _loginService: LoginService,

       private _cfgTipoDestinoService : CfgTipoDestinoService,
       private _cfgBodegaService : CfgBodegaService,
       private _municipioService : MunicipioService,
       private _cfgTipoSenialService : CfgTipoSenialService,
       //private _msvInventarioSenialService: MsvInventarioSenialService,

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
    this.msvSenial = new MsvSenial(null, null, null, null);

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

      this._cfgTipoDestinoService.select().subscribe(
              response => {
              this.tiposDestino = response;
          },
              error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
          }
      );

      this._cfgTipoSenialService.select().subscribe(
              response => {
              this.senal = response;
          },
              error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
          }
      );

    this._msvSenialService.index().subscribe(
            response => {
          if (response) {

            console.log(response);
            this.msvSeniales = response.data;
            let timeoutId = setTimeout(() => {
              this.iniciarTabla();
            }, 100);
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

    onCloseGeo() {
        document.getElementById("geo")['style']['visibility'] = "hidden";
        document.getElementById("address")['style']['visibility'] = "hidden";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
    }

    obtieneDestino(value) {

        switch (value) {
            case 1:

                this._cfgBodegaService.select().subscribe(
                        response => {
                        this.destino = response;
                    },
                        error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

                break;
            case 2:

                this._municipioService.getMunicipioSelect().subscribe(
                        response => {
                        this.destino = response;
                    },
                        error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                );

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

        let token = this._loginService.getToken();
        this._msvSenialService.searchByParametros(this.datos,token).subscribe(
                response => {
                this.respuesta = response;
                if(this.respuesta.status == 'success'){
                    this.senales = response.data;
                    //this.iniciarTabla();

                    /*swal({
                        title: 'Perfecto',
                        text: "¡Señales encontradas!",
                        type: 'info',
                        showCloseButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> OK!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i>',
                        cancelButtonAriaLabel: 'Thumbs down',
                    });*/alert('Perfecto Señales encontradas!');
                }else{
                    /*swal({
                        title: 'Alerta',
                        text: "Alerta ¡No existen señal(es) o aún no se ha(n) agregado a un inventario, por favor registrela:(Dirijase a: RF- Seguridad Vial:Inventario Señales) " +
                              "o agreguela a un inventario aquí y vuelva hacer una búsqueda!",
                        type: 'warning',
                        showCancelButton: true,
                        focusConfirm: true,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Registrar',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                            '<i class="fa fa-thumbs-down"></i> Cancelar',
                        cancelButtonAriaLabel: 'Thumbs down',
                    }).then((result) => {
                        if (result.value) {
                            //this.formNew = true;
                            //this.formAdd = true;
                            document.getElementById("formAdd")['style']['visibility'] = "visible";
                            this.formSearch = false;
                            this.onAdd();
                        }
                    });*/
                    alert('Alerta ¡No existen señal(es) o aún no se ha(n) agregado a un inventario, por favor registrela:(Dirijase a: RF- Seguridad Vial:Inventario Señales) o agreguela a un inventario aquí y vuelva hacer una búsqueda!');
                    this.onAdd();
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

    //////////////////////////////////
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

                document.getElementById("lat")['value'] = event.latLng.lat();
                document.getElementById("lng")['value'] = event.latLng.lng();

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

    onGeo(address) {
        document.getElementById('address')['value'] = address;
        document.getElementById("geo")['style']['visibility'] = "visible";
        document.getElementById("searchAddress")['style']['visibility'] = "hidden";
        document.getElementById("map")['style']['pointer-events'] = "none";
        document.getElementById("address")['style']['visibility'] = "visible";
        document.getElementById("address").setAttribute('readonly', 'readonly');
        this.onSearchGeo();
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

                    document.getElementById("lat")['value'] = event.latLng.lat();
                    document.getElementById("lng")['value'] = event.latLng.lng();

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
                alert('La bÃºsqueda no tuvo Ã©xito.');
            }
        });

    }
    //////////////////////////////////

    getInventario(idInv, dateInv){
        document.getElementById("inventario")['style']['display'] = "inline";
        this.idInv = idInv;
        this.dateInv   = dateInv;
    }

    searchInventario(type){

        this.searchBySenial(type);

    }

    onExportInv(){

        var radios = document.getElementsByName('senal');
        var senial = 0;

        for (var i in radios){
            for(var item in radios[i]){
                if(typeof radios[i]['checked'] !== 'undefined') {
                    if (radios[i]['checked']) {
                        senial = radios[i]['value'];
                    }
                }
            }
        }

        if(senial == 0) {
            alert('Seleccione el Tipo de señal a buscar!')
        } else
        {
            this.datInv.idInv = this.idInv;
            this.datInv.dateInv = this.dateInv;
            this.datInv.typeSen = senial;

            this._msvSenialService.exportInv(this.datInv);
        }

    }

    searchBySenial(typeSen) {

        this.datInv.idInv = this.idInv;
        this.datInv.dateInv = this.dateInv;
        this.datInv.typeSen = typeSen;

        let token = this._loginService.getToken();
        this._msvSenialService.searchBySenial(this.datInv, token).subscribe(
                response => {

                this.senalesPorInventario = response;

            },
                error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        setTimeout(function(){
            var src = document.getElementsByName("src");
            var logo = document.getElementsByName("logo");

            for (var i in src){
                for(var item in src[i]){
                    logo[i].setAttribute('src', environment.apiUrl + '../logos/' + src[i]['value']);
                }
            }

            var setColor = document.getElementsByName("setColor");
            var getColor = document.getElementsByName("getColor");

            for (var i in getColor){
                for(var item in getColor[i]){
                    setColor[i]['style']['background-color'] = getColor[i]['value'];
                    setColor[i]['style']['background-image'] = '';
                }
            }

            var loc = document.getElementsByName("loc");
            var file = document.getElementsByName("archivo");

            for (var i in loc){
                for(var item in loc[i]){
                    if(loc[i]['value'] != ''){
                        file[i].setAttribute('target', '_blank');
                        file[i].setAttribute('href', environment.apiUrl + '../docs/' + loc[i]['value']);
                        file[i]['innerHTML'] = '<i class="fa fa-file" aria-hidden="true"></i>';
                    }else{
                        file[i].removeAttribute('href');
                        file[i].removeAttribute('target');
                        file[i]['style']['cursor'] = 'text';
                        file[i]['innerHTML'] = 'No disponible.';
                    }
                }
            }

        }, 2500);
    }

  onAdd(){

      this._msvSenialService.searchByFull().subscribe(
              response => {

              this.senalesPorAsignar = response;

                  document.getElementById("formAdd")['style']['visibility'] = "visible";

          },
              error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                  alert('Error en la petición');
              }
          }
      );

      setTimeout(function(){
          var src = document.getElementsByName("src");
          var logo = document.getElementsByName("logo");

          for (var i in src){
              for(var item in src[i]){
                  logo[i].setAttribute('src', environment.apiUrl + '../logos/' + src[i]['value']);
              }
          }

          var setColor = document.getElementsByName("setColor");
          var getColor = document.getElementsByName("getColor");

          for (var i in getColor){
              for(var item in getColor[i]){
                  setColor[i]['style']['background-color'] = getColor[i]['value'];
                  setColor[i]['style']['background-image'] = '';
              }
          }

          /*var loc = document.getElementsByName("loc");
          var file = document.getElementsByName("archivo");

          for (var i in loc){
              for(var item in loc[i]){
                  if(loc[i]['value'] != ''){
                      file[i].setAttribute('target', '_blank');
                      file[i].setAttribute('href', environment.apiUrl + '../docs/' + loc[i]['value']);
                      file[i]['innerHTML'] = '<i class="fa fa-file" aria-hidden="true"></i>';
                  }else{
                      file[i].removeAttribute('href');
                      file[i].removeAttribute('target');
                      file[i]['style']['cursor'] = 'text';
                      file[i]['innerHTML'] = 'No disponible.';
                  }
              }
          }*/

      }, 2500);

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
        this._msvSenialService.export();
    }

    onSend() {
        let token = this._loginService.getToken();

        this.msvSenial.destinoId = this.destinoSelected;
        this.msvSenial.tipoDestinoId = this.tipoDestinoSelected;
        this.msvSenial.tipoSenalId = this.tipoSenalSelected;

        for (var i in this.build) {
            this.senalSelected += this.build[i] + ',';
        }

        this.msvSenial.inventarioSenialId = this.senalSelected.slice(0, -1);

        var valid = "";

        if (this.msvSenial.tipoSenalId == 0) {
            valid += "Debe seleccionar un tipo de señal.\n";
        }
        if (this.msvSenial.destinoId == 0 || this.msvSenial.tipoDestinoId == 0) {
            valid += "Debe seleccionar un lugar de destino.\n";
        }
        if (typeof this.msvSenial.inventarioSenialId == 'undefined') {
            valid += "Debe seleccionar la señal(es) que desea agregar al inventario.";
        }
        if(this.file == null){
            valid += "Debe agregar algún comprobate o nota en formato pdf.\n";
        }

    if(valid != ""){
            /*swal({
                title: 'Advertencia',
                text: valid,
                type: 'error',
                confirmButtonText: 'Aceptar'
            });*/
            alert(valid);
    }else {

        /*swal({
            title: 'Alerta',
            text: "¿Está seguro que desea asignar esta señal(es) a este destino?",
            type: 'warning',
            showCancelButton: true,
            focusConfirm: true,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Registrar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Cancelar',
            cancelButtonAriaLabel: 'Thumbs down',
        }).then((result) => {*/

        var r = confirm("¿Está seguro que desea asignar esta señal(es) a este destino?");
        if (r == true) {

            ////if (result.value) {

            //if(this.funcionario.activo == 'true'){
            this._msvSenialService.register(this.file, this.msvSenial, token).subscribe(
                    response => {

                    this.respuesta = response;
                    //this.formConfirm = false;
                    //this.formPdf = true;

                    if (this.respuesta.status == 'success') {
                        this.ready.emit(true);
                        /*swal({
                            title: 'Perfecto!',
                            text: 'Registro exitoso!',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });*/
                        alert('Perfecto!\nRegistro exitoso!');
                        this.onAdd();
                    } else {
                        /*swal({
                            title: 'Error!',
                            text: 'La señal ya se encuentra registrada',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        })*/
                        alert('Error!\nLa seÃ±al ya se encuentra registrada');
                    }
                        error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                });
        }

        ////});
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

}

//Replace this by anything without an ID_KEY
const getScriptSrc = (callbackName) => {
    return `https://maps.googleapis.com/maps/api/js?key=AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4&callback=${callbackName}`;
}