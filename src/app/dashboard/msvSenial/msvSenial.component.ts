import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvSenialService } from '../../services/msvSenial.service';
import { LoginService } from '../../services/login.service';

 import { environment } from 'environments/environment';
 import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
 import { CfgBodegaService } from '../../services/cfgBodega.service';
 import { MunicipioService } from '../../services/municipio.service';
 import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';
 //import { MsvInventarioSenialService } from '../../services/msvInventarioSenial.service'

 import { MsvSenial } from './msvSenial.modelo';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvSenial.component.html'
})

export class MsvSenialComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage;
  //public id;
  public respuesta;
  public msvSenials;
  public formNew = false;
  public formIndex = false;

    public formSearch = true;
    public formAdd = false;

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
    public datos = {
        'destinoId' : null,
        'tipoDestinoId' : null,
        'tipoSenalId' : null
    }

  constructor(
      private _msvSenialService: MsvSenialService,
      private _loginService: LoginService,

       private _cfgTipoDestinoService : CfgTipoDestinoService,
       private _cfgBodegaService : CfgBodegaService,
       private _municipioService : MunicipioService,
       private _cfgTipoSenialService : CfgTipoSenialService,
       //private _msvInventarioSenialService: MsvInventarioSenialService,

  ) { this.senalSelected = ""; this.build = {}; }

  ngOnInit() {
    this.msvSenial = new MsvSenial(null, null, null, null);

    swal({
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
    });

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

    this._msvSenialService.getMsvSenial().subscribe(
            response => {
          if (response) {

            console.log(response);
            this.msvSenials = response.data;
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
                    this.formSearch = false;
                    this.formIndex = true;

                    swal({
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
                    });
                }else{
                    swal({
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
                            this.formSearch = false;
                            this.formAdd = true;
                            this.onAdd();
                        }
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

    getInventario(){
        document.getElementById("formInventario")['style']['visibility'] = "visible";
        this.formSearch = false;
    }

    searchInventario(){
        document.getElementById("dataTables-inventario")['style']['visibility'] = "visible";
        this.onAdd();
    }

  onAdd(){

      this._msvSenialService.searchByFull().subscribe(
              response => {
                  if(response!=""){
                      var checkboxParent = document.getElementsByName('_senalParent_')[0];
                  }
              this.senalesPorAsignar = response;
              this.formAdd = true;
              this.formIndex = false;
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
            swal({
                title: 'Advertencia',
                text: valid,
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
    }else {

        swal({
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
        }).then((result) => {


            if (result.value) {

            //if(this.funcionario.activo == 'true'){
            this._msvSenialService.register(this.file, this.msvSenial, token).subscribe(
                    response => {

                    this.respuesta = response;
                    //this.formConfirm = false;
                    //this.formPdf = true;

                    if (this.respuesta.status == 'success') {
                        this.ready.emit(true);
                        swal({
                            title: 'Perfecto!',
                            text: 'Registro exitoso!',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                        this.onAdd();
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'La señal ya se encuentra registrada',
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
                });
        }

        });
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